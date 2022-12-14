package databases

import (
	"articletes/models"
	"articletes/pkg/mysql"
	"fmt"
)

func RunMigrate() {
	err := mysql.DB.AutoMigrate(&models.Posts{})
	if err != nil {
		fmt.Println(err)
		panic("migration failed")
	}
	fmt.Println("Success migration")
}
