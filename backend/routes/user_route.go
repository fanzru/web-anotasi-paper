package routes

import (
	"backend/controllers"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Echo) *echo.Echo {
	// var IsLoggedIn = middleware.JWTWithConfig(middleware.JWTConfig{
	// 	SigningKey: []byte("secret"),
	// })
	e.POST("/api/user/register", controllers.RegisterController)
	e.POST("/api/user/login", controllers.LoginController)
	e.GET("/api/user", controllers.UserProfileController)

	return e
}
