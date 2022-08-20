package controllers

import (
	"backend/config"
	"backend/models"
	"backend/utils"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
)

func RegisterController(c echo.Context) error {
	db := config.GetConnection()

	data := &models.User{}
	if err := c.Bind(&data); err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Bind data Error!", http.StatusInternalServerError))
	}
	err := utils.ValidateUser(data)
	if err != nil {
		return c.JSON(http.StatusBadRequest, utils.ResponseError("Missing fields or data not valid!", http.StatusInternalServerError))
	}

	r := &models.User{}
	rows := db.Where("email = ?", data.Email).First(r)
	if rows.RowsAffected != 0 || r.Email == data.Email {
		log.Println(err)
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Email Already Exists", http.StatusInternalServerError))
	}

	//hashing password
	hash, err := bcrypt.GenerateFromPassword([]byte(data.Password), 5)
	if err != nil {
		return c.JSON(http.StatusBadRequest, utils.ResponseError("Error While Hashing Password!", http.StatusInternalServerError))
	}

	data.Password = string(hash)

	err = db.Create(data).Error
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Register Failed!", http.StatusInternalServerError))
	}

	return c.JSON(http.StatusOK, utils.ResponseSuccess("Success", nil))
}

func LoginController(c echo.Context) error {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	db := config.GetConnection()

	data := &models.UserBodyLogin{}
	if err := c.Bind(&data); err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Bind data Error!", http.StatusInternalServerError))
	}
	result := &models.User{}
	err = db.Where("email = ?", data.Email).First(&result).Error
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Email Not Found, Please Register First!", http.StatusInternalServerError))
	}
	err = bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(data.Password))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Wrong Password!", http.StatusInternalServerError))
	}

	result.Token = utils.JwtGenerator(result.Id, result.Name, result.Email, os.Getenv("JWT_TOKEN"))
	return c.JSON(http.StatusOK, utils.ResponseSuccess("Success", result.Token))
}

type Token struct {
	Token string `json:"token"`
}

func UserProfileController(c echo.Context) error {
	user, status := utils.ExtractClaims(c)
	if !status {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Token invalid!", http.StatusInternalServerError))
	}
	profileData := models.UserProfileData{}
	profileData.Email = user.Email
	profileData.Id = user.Id
	profileData.Exp = user.ExpiresAt
	profileData.Name = user.Name

	db := config.GetConnection()

	userPaperDB := []models.UserPaper{}
	db.Table("user_papers").Where("user_id = ? AND is_done = ?", user.Id, true).Find(&userPaperDB)

	profileData.ListPapers = userPaperDB
	return c.JSON(http.StatusOK, utils.ResponseSuccess("Success", profileData))
}
