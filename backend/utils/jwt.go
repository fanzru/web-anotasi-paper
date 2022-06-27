package utils

import "github.com/golang-jwt/jwt"

func JwtGenerator(name, email, key string) string {
	//Generate Token JWT for auth
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": name,
		"email":    email,
	})

	tokenString, err := token.SignedString([]byte(key))
	if err != nil {
		return err.Error()
	}
	return tokenString
}
