package main

import (
	"fmt"
	"log"
	"encoding/json"
	"net/http"
	"io/ioutil"
	"strings"
)

type VenueData struct {
	Name			string		`json:"Name"`
	Type			string		`json:"Type"`
	Date			string		`json:"Date"`
	Location	string		`json:"Location"`
}

type ResponseData struct {
	Message 	string 		`json:"message"`
	Venue			[]string 	`json:"venue"`
}

// Create a slice of type Person to store the unmarshaled data
var venue []VenueData

func autoCompleteHandler(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("query")
	results := filterResults(query)
	
	// Create an instance of your data structure
	responseData := ResponseData {
		Message: "AutoComplete successfully completion",
		Venue: results,
	}
	
	// Convert the data structure to JSON
	jsonResponse, err := json.Marshal(responseData)
	if err != nil {
		http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
		return
	}

	// Set CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		// Respond to preflight requests
		w.WriteHeader(http.StatusOK)
		return
	}
	
	w.Write(jsonResponse)
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
	return len(query) == 0 || strings.Contains(item.Type, query) || strings.Contains(item.Name, query)
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

func main() {
	// Read the JSON file
	venueData, err := ioutil.ReadFile("venueData.json")
	if err != nil {
		fmt.Println("Error reading JSON file:", err)
		return
	}

	// Unmarshal the JSON data into the slice of Person
	err = json.Unmarshal(venueData, &venue)
	if err != nil {
		fmt.Println("Error unmarshaling JSON:", err)
		return
	}

	// Register the autoCompleteHandler function for the "/autocomplete" route
	http.HandleFunc("/autocomplete", autoCompleteHandler)

	// Start the HTTP server on port 8080
	port := 8080
	fmt.Println("Server listening on port", port)
	log.Fatal(http.ListenAndServe(":8080", nil))
}