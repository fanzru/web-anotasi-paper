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
	g.POST("/artu-az", controllers.AzArtuController)
	g.POST("/artu-az/saved", controllers.SavedArtuAzController)
	g.GET("/artu-az/:user_paper_id", controllers.GetUserPaper)
	g.POST("/artu-summarize/:user_paper_id/:user_id", controllers.ArtuSummaController)
	g.POST("/artu-summarize/saved", controllers.SavedArtuSummaController)
	g.POST("/test/upload", controllers.UploadPdfToS3Storage)

	g.POST("/user-longsumm/submit", controllers.UserLongsumSubmitController)
	return e
}
