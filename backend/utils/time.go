package utils

import "time"

func DateTime() string {
	currentTime := time.Now()
	result := currentTime.Format("2006-01-02 15:04:05") //yyyy-mm-dd HH:mm:ss
	return result
}
