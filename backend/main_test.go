package main

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestHelloEndpoint(t *testing.T) {
	// Set the Gin mode to TestMode to disable unnecessary middleware
	gin.SetMode(gin.TestMode)

	// Create a new router with the defined routes
	router := gin.Default()
	router.GET("/api/hello", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, this is your Gin server!",
		})
	})

	// Create a test request to the /hello endpoint
	req, err := http.NewRequest(http.MethodGet, "/api/hello", nil)
	if err != nil {
		t.Fatal(err)
	}

	// Create a test response recorder
	w := httptest.NewRecorder()

	// Perform the request
	router.ServeHTTP(w, req)

	// Assert the response status code
	assert.Equal(t, http.StatusOK, w.Code)

	// Assert the response body
	expectedResponse := `{"message":"Hello, this is your Gin server!"}`
	assert.Equal(t, expectedResponse, w.Body.String())
}