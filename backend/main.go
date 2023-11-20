package main

import (
	"fmt"
	"log"
	"encoding/json"
	"net/http"
	"io/ioutil"
)

type VenueData struct {
	Name			string	`json:"Name"`
	Type			string	`json:"Type"`
	Date			string	`json:"Date"`
	Location	string	`json:"Location"`
}

// Create a slice of type Person to store the unmarshaled data
var venue []VenueData

func autoCompleteHandler(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("query")
	results := filterResults(query)
	jsonResponse, err := json.Marshal(results)
	if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResponse)
}

func filterResults(query string) []string {
	var filteredResults []string
	for _, item := range venue {
			if query == "" || contains(item, query) {
					filteredResults = append(filteredResults, item.Type)
			}
	}
	return filteredResults
}

func contains(item VenueData, query string) bool {
	return len(query) == 0 || (len(item.Type) >= len(query) && item.Type[:len(query)] == query) || (len(item.Name) >= len(query) && item.Name[:len(query)] == query)
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