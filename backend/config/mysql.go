package config

import (
	"backend/models"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func ConnectionDatabase() (*gorm.DB, error) {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	configStatment := fmt.Sprintf("%v:%v@tcp(%v:%v)/%v?charset=utf8mb4&parseTime=True&loc=Local", os.Getenv("USERNAME"), os.Getenv("PASSWORD"), os.Getenv("HOST"), os.Getenv("PORT"), os.Getenv("DBNAME"))

	db, err := gorm.Open(mysql.Open(configStatment), &gorm.Config{})
	// if there is an error opening the connection, handle it
	if err != nil {
		return nil, err
	}
	return db, nil
}

func MigrationDB() (*gorm.DB, error) {
	fmt.Println("Connecting to Database ....")
	db, err := ConnectionDatabase()
	if err != nil {
		return nil, err
	}
	err = db.AutoMigrate(&models.User{}, &models.ArtuAzDataPaper{}, &models.UserPaper{})
	if err != nil {
		fmt.Println("Init DB failed")
		return nil, err
	}
	fmt.Println("Database Connected")
	return db, nil
}
