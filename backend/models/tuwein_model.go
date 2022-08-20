package models

type Sentence struct {
	Sent string `json:"sent"`
	Tag  string `json:"tag"`
}

type SelectedSentence struct {
	ParId     int64      `json:"par_id"`
	Sentences []Sentence `json:"sentences"`
}

type Section struct {
	SectionName       string             `json:"section_name"`
	SelectedSentences []SelectedSentence `json:"selected_sentences"`
}

type DataPaper struct {
	Id       *int64    `json:"id"`
	PaperId  string    `json:"paper_id"`
	Sections []Section `json:"sections"`
}

type ArtuAzDataPaper struct {
	UserPaperID    int64  `json:"user_paper_id" gorm:"user_paper_id"`
	UserId         int64  `json:"user_id" gorm:"user_id"`
	PaperName      string `json:"paper_name" gorm:"paper_name"`
	SectionName    string `json:"section_name" gorm:"section_name"`
	ParId          int64  `json:"par_id" gorm:"par_id"`
	SentId         string `json:"sent_id" gorm:"sent_id"`
	AutomaticLabel string `json:"automatic_label" gorm:"automatic_label"`
	ManualLabel    string `json:"manual_label" gorm:"manual_label"`
	Checked        bool   `json:"checked" gorm:"checked"`
	Sent           string `json:"sent" gorm:"sent"`
}

type UserPaper struct {
	Id          int64  `json:"id" gorm:"id;PRIMARY_KEY;AUTO_INCREMENT;"`
	UserId      int64  `json:"user_id" gorm:"user_id"`
	PaperName   string `json:"paper_name" gorm:"paper_name"`
	ArticleInfo string `json:"article_info" gorm:"article_info"`
	DomainInfo  string `json:"domain_info" gorm:"domain_info"`
	LinkPdf     string `json:"link_pdf" gorm:"link_pdf"`
	IsDone      bool   `json:"is_done" gorm:"is_done"`
}

type ArtuAzPaperResponse struct {
	Id          int64     `json:"id" gorm:"id;PRIMARY_KEY;AUTO_INCREMENT;"`
	UserId      int64     `json:"user_id" gorm:"user_id"`
	PaperName   string    `json:"paper_name" gorm:"paper_name"`
	ArticleInfo string    `json:"article_info" gorm:"article_info"`
	DomainInfo  string    `json:"domain_info" gorm:"domain_info"`
	LinkPdf     string    `json:"link_pdf" gorm:"link_pdf"`
	IsDone      bool      `json:"is_done" gorm:"is_done"`
	Sections    []Section `json:"sections"`
}

type DataPaperArtuSummary struct {
	DocId     string      `json:"doc_id"`
	Summaries []Summaries `json:"summaries"`
}

type Summaries struct {
	Method       string         `json:"method"`
	Summary      []string       `json:"summary"`
	ZonesSummary []ZonesSummary `json:"zones_summary"`
}

type ZonesSummary struct {
	Category        string   `json:"category"`
	CategorySummary []string `json:"category_summary"`
}
