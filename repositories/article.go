package repositories

import (
	"articletes/models"
	"gorm.io/gorm"
)

type ArticleRepository interface {
	FindArticle(limit, offset int) ([]models.Posts, error)
	GetArticleId(id int) (models.Posts, error)
	CreateArticle(article models.Posts) (models.Posts, error)
	UpdateArticle(article models.Posts, id int) (models.Posts, error)
	DeleteArticle(article models.Posts, id int) (models.Posts, error)
	GetAllArticles() ([]models.Posts, error)
}

func RepoArticle(db *gorm.DB) *repository {
	return &repository{db}
}
func (r *repository) FindArticle(limit, offset int) ([]models.Posts, error) {
	var article []models.Posts
	err := r.db.Limit(limit).Offset(offset).Find(&article).Error
	return article, err
}

func (r *repository) GetAllArticles() ([]models.Posts, error) {
	var articles []models.Posts
	err := r.db.Find(&articles).Error
	return articles, err
}

func (r *repository) GetArticleId(id int) (models.Posts, error) {
	var articleid models.Posts
	err := r.db.First(&articleid, id).Error
	return articleid, err
}

func (r *repository) CreateArticle(article models.Posts) (models.Posts, error) {
	err := r.db.Create(&article).Error
	return article, err
}

func (r *repository) UpdateArticle(article models.Posts, id int) (models.Posts, error) {
	err := r.db.Model(&article).Where("id=?", id).Updates(&article).Error
	return article, err
}
func (r *repository) DeleteArticle(article models.Posts, id int) (models.Posts, error) {
	err := r.db.Delete(&article, id).Error
	return article, err
}
