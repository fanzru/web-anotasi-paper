package routes

import (
	"backend/controllers"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Echo) *echo.Echo {
	e.POST("/api/user/register", controllers.RegisterController)
	return e
}
