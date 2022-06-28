package utils

import (
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/joho/godotenv"
)

type Claims struct {
	Name  string `json:"name"`
	Email string `json:"email"`
	jwt.StandardClaims
}

func JwtGenerator(name, email, key string) string {
	//Generate Token JWT for auth
	expirationTime := time.Now().Add(time.Minute * 5)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &Claims{
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

func ExtractClaims(tokenStr string) (jwt.Claims, bool) {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	var jwtKey = []byte(os.Getenv("JWT_TOKEN"))

	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenStr, claims,
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
