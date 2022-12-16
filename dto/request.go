package dto

import "time"

type ArticleRequest struct {
	Title        string    `json:"title" form:"title" gorm:"type: varchar(200)" validate:"required,min=20"`
	Content      string    `json:"content" form:"content" gorm:"type: text" validate:"required,min=200"`
	Category     string    `json:"category" form:"category" gorm:"type: varchar(200)" validate:"required,min=3"`
	Created_date time.Time `json:"created_Date" form:"created_date"`
	Updated_date time.Time `json:"updated_Date" form:"updated_date"`
	Status       string    `json:"status" form:"status" gorm:"type:varchar(100)" validate:"required,oneof='publish' 'draft' 'thrash'"`
}

type ArticleRequestUpdate struct {
	Title        string    `json:"title" form:"title" gorm:"type: varchar(200)"`
	Content      string    `json:"content" form:"content" gorm:"type: text"`
	Category     string    `json:"category" form:"category" gorm:"type: varchar(200)"`
	Created_date time.Time `json:"created_Date" form:"created_date"`
	Updated_date time.Time `json:"updated_Date" form:"updated_date"`
	Status       string    `json:"status" form:"status" gorm:"type:varchar(100)" validate:"required,oneof='publish' 'draft' 'thrash'"`
}
