package routes

import "github.com/gorilla/mux"

func RoutesInit(r *mux.Router) {
	ArticleRoute(r)
}
