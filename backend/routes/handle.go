// routes/hello.go
package routes

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func helloHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Hello, this is your Gin server!",
	})
}

func autoCompleteHandler(c *gin.Context) {
	query := c.Query("query")
	results := filterResults(query)
	sort.Strings(results)
	
	c.JSON(http.StatusOK, gin.H{
		"message": "AutoComplete successfully completion",
		"venue": results,
	})
}