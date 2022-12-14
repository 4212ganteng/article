package main

import (
	"articletes/databases"
	"articletes/pkg/mysql"
	"articletes/routes"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
)

func main() {
	r := mux.NewRouter()
	//database init
	mysql.DatabaseInit()

	//	auto migrate
	databases.RunMigrate()

	//	sub route api
	routes.RoutesInit(r.PathPrefix("/api/v1").Subrouter())

	fmt.Println("SERVER Running on Port 8000")
	http.ListenAndServe("localhost:8000", r)

}
