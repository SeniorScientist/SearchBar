// routes/router.go
package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
)

func SetupRouter() *gin.Engine {
	// CORS middleware
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"*"} // Replace with the actual origins you want to allow
	router.Use(cors.New(config))

	router := gin.Default()

	router.GET("/api/hello", helloHandler)
	router.GET("/api/venue/autocomplete", autoCompleteHandler)
	return router
}