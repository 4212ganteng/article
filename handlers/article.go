package handlers

import (
	"articletes/dto"
	"articletes/models"
	"articletes/repositories"
	"encoding/json"
	"fmt"
	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
	"time"
)

type handlerarticle struct {
	articlerepository repositories.ArticleRepository
}

func Handlerarticle(articlerepository repositories.ArticleRepository) *handlerarticle {
	return &handlerarticle{articlerepository}
}

// find all
func (h *handlerarticle) FindArticle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	limit, _ := strconv.Atoi(mux.Vars(r)["limit"])
	offset, _ := strconv.Atoi(mux.Vars(r)["offset"])

	artc, err := h.articlerepository.FindArticle(limit, offset)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrResult{Status: "failed", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "Success", Data: artc}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerarticle) GetAllArticles(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	artc, err := h.articlerepository.GetAllArticles()

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrResult{Status: "failed", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "Success", Data: artc}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerarticle) GetArticleId(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	artc, err := h.articlerepository.GetArticleId(id)

	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		response := dto.ErrResult{Status: "failed", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "Success", Data: artc}
	json.NewEncoder(w).Encode(response)
}
func (h *handlerarticle) CreateArticle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	//get request
	var request dto.ArticleRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrResult{Status: "failed", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	//	validator
	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrResult{Status: "failed", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	field := models.Posts{
		Title:        request.Title,
		Content:      request.Content,
		Category:     request.Category,
		Status:       request.Status,
		Created_date: time.Now(),
		Updated_date: time.Now(),
	}
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrResult{Status: "failed to create", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	artc, err := h.articlerepository.CreateArticle(field)
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "Success Create article", Data: artc}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerarticle) UpdateArticle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	//get request
	var request dto.ArticleRequestUpdate
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrResult{Status: "failed", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	//	validator
	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrResult{Status: "failed", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	field := models.Posts{
		Title:    request.Title,
		Content:  request.Content,
		Category: request.Category,
		Status:   request.Status,
	}
	article := models.Posts{}
	article.Id = id
	if field.Title != "" {
		article.Title = field.Title
	}
	if field.Content != "" {
		article.Content = field.Content
	}
	if field.Category != "" {
		article.Category = field.Category
	}
	if field.Status != "" {
		article.Status = field.Status
	}
	fmt.Println(field)
	artc, err := h.articlerepository.UpdateArticle(article, id)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrResult{Status: "failed to create", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "Success Update article", Data: artc}
	json.NewEncoder(w).Encode(response)

}

func (h *handlerarticle) DeleteArticle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	article := models.Posts{}

	artc, err := h.articlerepository.DeleteArticle(article, id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrResult{Status: "failed", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "success", Data: artc}
	json.NewEncoder(w).Encode(response)
}
