package utils

import (
	"github.com/labstack/echo/v4"
)

func ResponseError(message string) echo.Map {
	return echo.Map{
		"code":    400,
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
