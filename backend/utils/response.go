package utils

import (
	"github.com/labstack/echo/v4"
	log "github.com/sirupsen/logrus"
)

func ResponseError(message string, err ...error) echo.Map {
	log.WithFields(log.Fields{
		"omg":    true,
		"number": 100,
	}).Error(err)
	return echo.Map{
		"code":    400,
		"status":  false,
		"message": message,
	}
}

func ResponseSuccess(message string, data interface{}) echo.Map {
	log.Info(data)
	return echo.Map{
		"code":    200,
		"status":  true,
		"message": message,
		"value":   data,
	}
}
