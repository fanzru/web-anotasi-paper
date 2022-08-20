package main

import (
	"backend/config"
	"backend/routes"
	"net/http"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

var DB *gorm.DB

func main() {

	dbConn, err := config.MigrationDB()
	if err != nil {
		panic(err.Error())
	}
	DB = dbConn
	e := routes.Init()

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!!")
	})

	e.Logger.Fatal(e.Start(":8081"))

}
func DBCONN() *gorm.DB {
	return DB
}
