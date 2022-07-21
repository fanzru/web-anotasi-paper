package controllers

import (
	"backend/utils"
	"bytes"
	"crypto/tls"
	"log"
	"mime/multipart"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
)

func ArtuAzController(c echo.Context) error {
	result, status := utils.ExtractClaims(c)
	if !status {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Token invalid!"))
	}

	name := c.FormValue("paper_id")
	file, err := c.FormFile("pdf_article")
	if err != nil {
		return err
	}
	src, err := file.Open()
	if err != nil {
		return err
	}

	defer src.Close()
	srcFile := os.TempDir() + file.Filename
	// Destination
	dst, err := os.Create(srcFile)
	if err != nil {
		return err
	}
	defer dst.Close()
	defer os.Remove(srcFile)

	if name == "" || file == nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Please put all form data!"))
	}

	bodyBuf := &bytes.Buffer{}
	bodyWriter := multipart.NewWriter(bodyBuf)

	// outbound
	tr := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}
	hc := http.Client{Transport: tr}

	// form := url.Values{}
	// form.Add("paper_id", name)
	// form.Add("pdf_article", srcFile)
	bodyWriter.CreateFormFile("paper_id", name)
	bodyWriter.CreateFormFile("pdf_article", srcFile)
	bodyWriter.FormDataContentType()
	log.Println("-------- loading set up request")
	log.Println(bodyBuf)
	//b := bytes.NewBufferString(bodyBuf)
	req, err := http.NewRequest(http.MethodPost, "https://ir-group.ec.tuwien.ac.at/artu_az_identification/identify_az", bodyBuf)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Config Outbound Error!"))
	}
	req.Header.Add("Content-Type", "multipart/form-data")
	log.Println("-------- loading hit outbond")

	resp, err := hc.Do(req)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Server Outbound Error!", err))
	}
	if resp.StatusCode != 200 {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError(resp.Status, err))
	}

	return c.JSON(http.StatusOK, utils.ResponseSuccess("Success", result))
}
