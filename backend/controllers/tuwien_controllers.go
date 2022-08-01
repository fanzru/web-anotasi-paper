package controllers

import (
	"backend/models"
	"backend/utils"
	"bytes"
	"crypto/tls"
	"encoding/json"
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
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Token invalid!", http.StatusInternalServerError))
	}

	name := c.FormValue("paper_id")
	fileUpload, err := c.FormFile("pdf_article")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("FormFile error", http.StatusInternalServerError))
	}

	src, err := fileUpload.Open()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("pdf_article failed to open", http.StatusInternalServerError))
	}
	defer src.Close()

	srcFile := "./temp/" + fileUpload.Filename
	dst, err := os.Create(srcFile)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("os.Create failed", http.StatusInternalServerError))
	}
	defer dst.Close()
	defer os.Remove(srcFile)

	// Copy
	if _, err = io.Copy(dst, src); err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("io.Copy failed", http.StatusInternalServerError))
	}

	// Read file
	fileBytes, err := ioutil.ReadFile(srcFile)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("ReadFile failed", http.StatusInternalServerError))
	}

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
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("client resty error", http.StatusInternalServerError))
	}
	log.Println("response code : ", resp.StatusCode)
	responseResult := models.DataPaper{}
	err = json.Unmarshal(resp.Body(), &responseResult)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Unmarshal error", http.StatusInternalServerError))
	}
	if resp.StatusCode() != http.StatusOK {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Failed", http.StatusInternalServerError))
	}
	return c.JSON(http.StatusOK, utils.ResponseSuccess("Success", responseResult))
}
