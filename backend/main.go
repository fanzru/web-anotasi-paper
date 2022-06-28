package main

import (
	"backend/config"
	"backend/routes"
	"net/http"

	"github.com/labstack/echo/v4"
)

func main() {

	_, err := config.MigrationDB()
	if err != nil {
		panic(err.Error())
	}

	e := routes.Init()

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!!")
	})

	e.Logger.Fatal(e.Start(":8081"))

}
