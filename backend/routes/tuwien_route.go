package routes

import (
	"backend/controllers"

	"github.com/labstack/echo/v4"
)

func TuwienRoutes(e *echo.Echo) *echo.Echo {
	// var IsLoggedIn = middleware.JWTWithConfig(middleware.JWTConfig{
	// 	SigningKey: []byte("secret"),
	// })

	g := e.Group("/tuwien")
	// customMiddleware := utils.CustomeMiddleware()
	g.POST("/artu-az", controllers.ArtuAzController)
	return e
}
