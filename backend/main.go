package main

import (
	"fmt"
	"encoding/json"
	"net/http"
	"io/ioutil"
	"strings"
	"sort"
	"os"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
)

type VenueData struct {
	Name			string		`json:"Name"`
	Type			string		`json:"Type"`
	Date			string		`json:"Date"`
	Location	string		`json:"Location"`
}

// Create a slice of type Venue to store the unmarshaled data
var venue []VenueData

func autoCompleteHandler(c *gin.Context) {
	query := c.Query("query")
	results := filterResults(query)
	sort.Strings(results)
	
	c.JSON(http.StatusOK, gin.H{
		"message": "AutoComplete successfully completion",
		"venue": results,
	})
}

func filterResults(query string) []string {
	var filteredResults []string

	for _, item := range venue {
			if query == "" || contains(item, query) {
					filteredResults = append(filteredResults, item.Type)
			}
	}

	return reduceArray(filteredResults)
}

func contains(item VenueData, query string) bool {
	return len(query) == 0 || strings.Contains(strings.ToLower(item.Type), strings.ToLower(query)) || strings.Contains(strings.ToLower(item.Name), strings.ToLower(query))
}

func reduceArray(arr []string) []string {
	seen := make(map[string]bool)
	result := []string{}

	for _, item := range arr {
		if !seen[item] {
			seen[item] = true
			result = append(result, item)
		}
	}

	return result
}

func loadLocalData() bool {
	// Read the JSON file
	venueData, err := ioutil.ReadFile("venueData.json")
	if err != nil {
		fmt.Println("Error reading JSON file:", err)
		return false
	}

	// Unmarshal the JSON data into the slice of Person
	err = json.Unmarshal(venueData, &venue)
	if err != nil {
		fmt.Println("Error unmarshaling JSON:", err)
		return false
	}

	return true
}

func main() {
	
	if(!loadLocalData()) {
		fmt.Println("Error loading local json data, please check")
		return
	}
		
	// Check if the PORT environment variable is set
	port := os.Getenv("PORT")
	if port == "" {
		// If not set, use the default port 8080
		port = "8080"
	}
	
	router := gin.Default()

	// CORS middleware
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"*"} // Replace with the actual origins you want to allow
	router.Use(cors.New(config))

	
	router.ForwardedByClientIP = true
  // Define an API endpoint
	router.GET("/api/venue/autocomplete", autoCompleteHandler)
  router.Run(":" + port) // listen and serve on localhost:8080
	fmt.Printf("Server is running on :%s\n", port)
}