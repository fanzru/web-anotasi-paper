package controllers

import (
	"backend/config"
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

	s3 "backend/utils/s3"

	"github.com/go-resty/resty/v2"
	"github.com/labstack/echo/v4"
)

const (
	URL         = "https://ir-group.ec.tuwien.ac.at/artu_az_identification/identify_az"
	URLArtu     = "https://ir-group.ec.tuwien.ac.at/artu_summarize/summarize_article"
	ContentType = "multipart/form-data"
)

func AzArtuController(c echo.Context) error {
	user, status := utils.ExtractClaims(c)
	if !status {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Token invalid!", http.StatusInternalServerError))
	}

	name := c.FormValue("paper_name")
	articleInfo := c.FormValue("article_info")
	domainInfo := c.FormValue("domain_info")
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

	responseResult := models.DataPaper{}
	err = json.Unmarshal(resp.Body(), &responseResult)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Unmarshal error", http.StatusInternalServerError))
	}

	if resp.StatusCode() != http.StatusOK {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Failed", http.StatusInternalServerError))
	}

	cloudStorage, err := s3.NewS3Object(os.Getenv("ENDPOINT"), os.Getenv("ACCESS_KEY_ID_S3"), os.Getenv("SECRET_ACCESS_KEY_S3"), os.Getenv("BUCKET_NAME"), true)
	if err != nil {
		log.Println(err.Error())
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("NewS3Object", http.StatusInternalServerError))
	}

	resultS3, err := cloudStorage.UploadFileFromPath(srcFile)
	if err != nil {
		log.Fatal(err)
	}

	db, err := config.ConnectionDatabase()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Connection Database Failed!", http.StatusInternalServerError))
	}
	paperSaved := models.UserPaper{
		PaperName:   name,
		ArticleInfo: articleInfo,
		DomainInfo:  domainInfo,
		UserId:      user.Id,
		LinkPdf:     resultS3.EndpointPath,
		IsDone:      false,
	}

	db.Table("user_papers").Create(&paperSaved)
	responseResult.Id = &paperSaved.Id

	response := models.ArtuAzPaperResponse{
		Id:          paperSaved.Id,
		PaperName:   name,
		ArticleInfo: articleInfo,
		DomainInfo:  domainInfo,
		UserId:      user.Id,
		LinkPdf:     resultS3.EndpointPath,
		IsDone:      false,
		Sections:    responseResult.Sections,
	}
	return c.JSON(http.StatusOK, utils.ResponseSuccess("Success", response))
}

func SavedArtuAzController(c echo.Context) error {
	user, status := utils.ExtractClaims(c)
	if !status {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Token invalid!", http.StatusInternalServerError))
	}

	modelsPaper := &[]models.ArtuAzDataPaper{}
	err := c.Bind(modelsPaper)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("FormFile error", http.StatusInternalServerError))
	}

	modelsPaperDB := []models.ArtuAzDataPaper{}
	for _, v := range *modelsPaper {
		modelsPaperDB = append(modelsPaperDB, models.ArtuAzDataPaper{
			UserPaperID:    v.UserPaperID,
			UserId:         user.Id,
			PaperName:      v.PaperName,
			SectionName:    v.SectionName,
			ParId:          v.ParId,
			SentId:         v.SentId,
			AutomaticLabel: v.AutomaticLabel,
			ManualLabel:    v.ManualLabel,
			Checked:        v.Checked,
			Sent:           v.Sent,
		})
	}

	db, err := config.ConnectionDatabase()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Connection Database Failed!", http.StatusInternalServerError))
	}

	r := &models.ArtuAzDataPaper{}
	resp := db.Table("artu_az_data_papers").Where("user_paper_id = ? AND user_id = ?", modelsPaperDB[0].UserPaperID, user.Id).First(r)
	if resp.RowsAffected > 0 {
		return c.JSON(http.StatusBadRequest, utils.ResponseError("Failed Insert, because data done to saved", http.StatusBadRequest))
	}

	res := db.CreateInBatches(modelsPaperDB, 100)
	if res.RowsAffected == 0 {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Failed Insert", http.StatusInternalServerError))
	}

	db.Table("user_papers").Where("id = ? AND is_done = ?", modelsPaperDB[0].UserPaperID, false).Update("is_done", true)

	return c.JSON(http.StatusOK, utils.ResponseSuccess("Success", modelsPaperDB))
}

func ArtuSummaController(c echo.Context) error {
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
		Post(URLArtu)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("client resty error", http.StatusInternalServerError))
	}

	if resp.StatusCode() != http.StatusOK {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Failed", http.StatusInternalServerError))
	}

	responseResult := models.DataPaperArtuSummary{}
	err = json.Unmarshal(resp.Body(), &responseResult)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Unmarshal error", http.StatusInternalServerError))
	}

	return c.JSON(http.StatusOK, utils.ResponseSuccess("Success", responseResult))
}

func UploadPdfToS3Storage(c echo.Context) error {
	_, status := utils.ExtractClaims(c)
	if !status {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("Token invalid!", http.StatusInternalServerError))
	}

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
	_, err = ioutil.ReadFile(srcFile)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("ReadFile failed", http.StatusInternalServerError))
	}

	cloudStorage, err := s3.NewS3Object(os.Getenv("ENDPOINT"), os.Getenv("ACCESS_KEY_ID_S3"), os.Getenv("SECRET_ACCESS_KEY_S3"), os.Getenv("BUCKET_NAME"), true)
	if err != nil {
		log.Println(err.Error())
		return c.JSON(http.StatusInternalServerError, utils.ResponseError("NewS3Object", http.StatusInternalServerError))
	}

	a, err := cloudStorage.UploadFileFromPath(srcFile)
	if err != nil {
		log.Fatal(err)
	}

	log.Println(a.EndpointPath)
	return c.JSON(http.StatusOK, utils.ResponseSuccess("Success", nil))
}
