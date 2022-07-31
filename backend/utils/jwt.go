package utils

import (
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
)

type Claims struct {
	Id    int64  `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	jwt.StandardClaims
}

func JwtGenerator(id int64, name string, email string, key string) string {
	//Generate Token JWT for auth
	expirationTime := time.Now().Add(time.Hour * 24)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &Claims{
		Id:    id,
		Name:  name,
		Email: email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	})

	tokenString, err := token.SignedString([]byte(key))
	if err != nil {
		return err.Error()
	}
	return tokenString
}

func ExtractClaims(c echo.Context) (jwt.Claims, bool) {
	if c.Request().Header.Get("Authorization") == "" {
		return nil, false
	}
	tokenAuth := strings.Split(c.Request().Header.Get("Authorization"), " ")
	if tokenAuth[1] == "" {
		return nil, false
	}

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	var jwtKey = []byte(os.Getenv("JWT_TOKEN"))

	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenAuth[1], claims,
		func(t *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

	if err != nil {
		return nil, false
	}
	if token.Valid {
		return claims, true
	} else {
		return nil, false
	}
}

func CustomeMiddleware() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {

			if len(c.Request().Header["Authorization"]) > 0 {
				if c.Request().Header["Authorization"][0] == "secretkey" {
					c.Response().Header().Set(echo.HeaderServer, "Echo/3.0")
					return next(c)
				}
			}
			return c.JSON(http.StatusForbidden, "You are not authorized!")

			// err := godotenv.Load()
			// if err != nil {
			// 	log.Fatal("Error loading .env file")
			// }
			// var jwtKey = []byte(os.Getenv("JWT_TOKEN"))

			// claims := &Claims{}
			// token, err := jwt.ParseWithClaims(c.Request().Header["Auth"][], claims,
			// 	func(t *jwt.Token) (interface{}, error) {
			// 		return jwtKey, nil
			// 	})

			// if err != nil {
			// 	return err
			// }

			// if token.Valid {
			// 	return next(c)
			// } else {
			// 	return err
			// }
		}
	}
}

func AuthMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		if len(c.Request().Header["Authorization"]) > 0 {
			if c.Request().Header["Authorization"][0] == "secretkey" {
				c.Response().Header().Set(echo.HeaderServer, "Echo/3.0")
				return next(c)
			}
		}
		return c.JSON(http.StatusForbidden, "You are not authorized!")
	}
}
