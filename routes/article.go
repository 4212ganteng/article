package routes

import (
	"articletes/handlers"
	"articletes/pkg/mysql"
	"articletes/repositories"
	"github.com/gorilla/mux"
)

func ArticleRoute(r *mux.Router) {
	articlerepo := repositories.RepoArticle(mysql.DB)
	h := handlers.Handlerarticle(articlerepo)

	r.HandleFunc("/articles/{limit}/{offset}", h.FindArticle).Methods("GET")
	r.HandleFunc("/articles", h.GetAllArticles).Methods("GET")
	r.HandleFunc("/article/{id}", h.GetArticleId).Methods("GET")
	r.HandleFunc("/article", h.CreateArticle).Methods("POST")
	r.HandleFunc("/article/{id}", h.UpdateArticle).Methods("PATCH")
	r.HandleFunc("/article/{id}", h.DeleteArticle).Methods("DELETE")

}
