package utils

import (
	"backend/models"

	"github.com/go-playground/validator"
)

func ValidateUser(user *models.User) error {
	validate := validator.New()
	err := validate.Struct(user)
	return err
}
