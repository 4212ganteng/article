package models

import "time"

type Posts struct {
	Id           int       `json:"id" gorm:"primary_key:auto_increment"`
	Title        string    `json:"title" gorm:"type: varchar(200)"`
	Content      string    `json:"content" gorm:"type: text"`
	Category     string    `json:"category" gorm:"type: varchar(200)"`
	Created_date time.Time `json:"created_date"`
	Updated_date time.Time `json:"updated_date"`
	Status       string    `json:"status" gorm:"type:varchar(100)"`
}
