package controllers

import (
	"backend/utils"
	"bytes"
	"crypto/tls"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/go-resty/resty/v2"
	"github.com/labstack/echo/v4"
)

const (
	URL         = "https://ir-group.ec.tuwien.ac.at/artu_az_identification/identify_az"
	ContentType = "multipart/form-data"
	//FileName    = "test1.pdf"
	// paper_id string
	// pdf_article file
)

func AzArtuController(c echo.Context) error {
	_, status := utils.ExtractClaims(c)
	if !status {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Token invalid!"))
	}

	name := c.FormValue("paper_id")
	fileUpload, err := c.FormFile("pdf_article")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("FormFile"))
	}

	src, err := fileUpload.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	srcFile := "./temp/" + fileUpload.Filename
	dst, err := os.Create(srcFile)
	if err != nil {
		return err
	}
	defer dst.Close()
	defer os.Remove(srcFile)

	// Copy
	if _, err = io.Copy(dst, src); err != nil {
		return err
	}

	// Read file
	fileBytes, err := ioutil.ReadFile(srcFile)
	if err != nil {
		log.Fatal(err.Error())
	}
	log.Println("-------------------------------- fileBytes:", fileUpload)

	client := resty.New()
	client.SetDisableWarn(true)
	tr := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}
	client.SetTransport(tr)
	resp, err := client.R().
		SetMultipartFields(
			&resty.MultipartField{
				Param:       "pdf_article",
				FileName:    srcFile,
				ContentType: "application/pdf",
				Reader:      bytes.NewReader(fileBytes),
			},
			&resty.MultipartField{
				Param:       "paper_id",
				FileName:    "",
				ContentType: "text/plain",
				Reader:      strings.NewReader(name),
			}).
		SetContentLength(true).
		Post(URL)

	if err != nil {
		log.Fatal(err.Error())
	}
	log.Println(string(resp.Body()))
	if resp.StatusCode() != http.StatusOK {
		return c.JSON(http.StatusInternalServerError, utils.ResponseSuccess("Failed", nil))
	}
	return c.JSON(http.StatusOK, utils.ResponseSuccess("Success", string(resp.Body())))
}
