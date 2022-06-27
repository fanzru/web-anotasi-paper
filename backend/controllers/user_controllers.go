package controllers

import (
	"backend/config"
	"backend/models"
	"backend/utils"
	"net/http"

	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
)

func RegisterController(c echo.Context) error {
	data := &models.User{}
	if err := c.Bind(&data); err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Bind data Error!"))
	}
	err := utils.ValidateUser(data)
	if err != nil {
		return c.JSON(http.StatusBadRequest, utils.ResponseError("Missing fields or data not valid!"))
	}

	//hashing password
	hash, err := bcrypt.GenerateFromPassword([]byte(data.Password), 5)
	if err != nil {
		return c.JSON(http.StatusBadRequest, utils.ResponseError("Error While Hashing Password!"))
	}

	data.Password = string(hash)

	db, err := config.ConnectionDatabase()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Connection Database Failed!"))
	}

	err = db.Create(data).Error
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Register Failed!"))
	}

	return c.JSON(http.StatusOK, utils.ResponseSuccess("Success", nil))
}
