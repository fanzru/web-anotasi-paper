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
	PaperId  string    `json:"paper_id"`
	Sections []Section `json:"sections"`
}
