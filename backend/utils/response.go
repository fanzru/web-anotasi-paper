package utils

import (
	"github.com/labstack/echo/v4"
	log "github.com/sirupsen/logrus"
)

func ResponseError(message string, code int, err ...error) echo.Map {
	log.Error(err)
	return echo.Map{
		"code":    code,
		"status":  false,
		"message": message,
	}
}

func ResponseSuccess(message string, data interface{}) echo.Map {
	return echo.Map{
		"code":    200,
		"status":  true,
		"message": message,
		"value":   data,
	}
}
