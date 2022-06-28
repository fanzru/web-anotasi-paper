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
	db, err := config.ConnectionDatabase()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Connection Database Failed!"))
	}

	data := &models.User{}
	if err := c.Bind(&data); err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Bind data Error!"))
	}
	err = utils.ValidateUser(data)
	if err != nil {
		return c.JSON(http.StatusBadRequest, utils.ResponseError("Missing fields or data not valid!"))
	}

	r := &models.User{}
	rows := db.Where("email = ?", data.Email).First(r)
	if rows.RowsAffected != 0 || r.Email == data.Email {
		log.Println(err)
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Email Already Exists"))
	}

	//hashing password
	hash, err := bcrypt.GenerateFromPassword([]byte(data.Password), 5)
	if err != nil {
		return c.JSON(http.StatusBadRequest, utils.ResponseError("Error While Hashing Password!"))
	}

	data.Password = string(hash)

	err = db.Create(data).Error
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Register Failed!"))
	}

	return c.JSON(http.StatusOK, utils.ResponseSuccess("Success", nil))
}

func LoginController(c echo.Context) error {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	db, err := config.ConnectionDatabase()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Connection Database Failed!"))
	}

	data := &models.UserBodyLogin{}
	if err := c.Bind(&data); err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Bind data Error!"))
	}
	result := &models.User{}
	err = db.Where("email = ?", data.Email).First(&result).Error
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Email Not Found, Please Register First!"))
	}
	err = bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(data.Password))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Wrong Password!"))
	}

	result.Token = utils.JwtGenerator(result.Id, result.Name, result.Email, os.Getenv("JWT_TOKEN"))
	return c.JSON(http.StatusOK, utils.ResponseSuccess("Success", result.Token))
}

type Token struct {
	Token string `json:"token"`
}

func UserProfileController(c echo.Context) error {
	result, status := utils.ExtractClaims(c)
	if !status {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Token invalid!"))
	}
	return c.JSON(http.StatusOK, utils.ResponseSuccess("Success", result))
}
