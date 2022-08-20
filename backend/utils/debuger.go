package utils

import (
	"encoding/json"
	"fmt"
	"log"
)

func DebugerPrint(data interface{}) {
	log.Println("================================================")
	b, _ := json.MarshalIndent(data, "", "  ")
	fmt.Println(string(b))
	log.Println("================================================")
}
