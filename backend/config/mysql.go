package config

import (
	"backend/models"
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func ConnectionDatabase() (*gorm.DB, error) {
	dsn := "root:fanzru@tcp(103.55.38.98:1000)/db_riset_tuwien?charset=utf8mb4&parseTime=True&loc=Local"

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
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
	err = db.AutoMigrate(&models.User{})
	if err != nil {
		fmt.Println("Init DB failed")
		return nil, err
	}
	fmt.Println("Database Connected")
	return db, nil
}
