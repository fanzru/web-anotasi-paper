package routes

import (
	"backend/controllers"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Echo) *echo.Echo {
	// var IsLoggedIn = middleware.JWTWithConfig(middleware.JWTConfig{
	// 	SigningKey: []byte("secret"),
	// })

	g := e.Group("/user")
	// customMiddleware := utils.CustomeMiddleware()
	g.POST("/register", controllers.RegisterController)
	g.POST("/login", controllers.LoginController)
	g.GET("/", controllers.UserProfileController)
	return e
}
