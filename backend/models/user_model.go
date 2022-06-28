package models

type User struct {
	Id       int64  `gorm:"AUTO_INCREMENT;PRIMARY_KEY;"`
	Name     string `gorm:"type:string;not null;index:;class:FULLTEXT"  validate:"required"`
	Email    string `gorm:"type:string;unique;not null;index:;class:FULLTEXT"  validate:"required"`
	Password string `gorm:"type:string;not null" validate:"required"`
	Token    string `gorm:"type:string;"`
}

type UserBodyLogin struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Token    string `json:"token"`
}
