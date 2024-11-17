#!/bin/bash

# Base URL for the API
API_URL="http://localhost:8080/api/timeline"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print success message
success() {
    echo -e "${GREEN}$1${NC}"
}

# Function to print error message
error() {
    echo -e "${RED}$1${NC}"
}

# Create a new event
create_event() {
    echo "Creating new event..."
    curl -X POST \
        -H "Content-Type: application/json" \
        -d "@$1" \
        ${API_URL} | jq '.'
    
    if [ $? -eq 0 ]; then
        success "Event created successfully!"
    else
        error "Failed to create event"
    fi
}

# Create all new event
create_all_event() {
    echo "Creating new events..."
    curl -X POST \
        -H "Content-Type: application/json" \
        -d "@event_data_init.json" \
        ${API_URL}/all | jq '.'
    
    if [ $? -eq 0 ]; then
        success "Events created successfully!"
    else
        error "Failed to create events"
    fi
}

# Get all events
get_events() {
    echo "Fetching all events..."
    curl -X GET ${API_URL} | jq '.'
}

# Get event by ID
get_event() {
    echo "Fetching event with ID $1..."
    curl -X GET ${API_URL}/$1 | jq '.'
}

# Get events by country
get_events_by_country() {
    echo "Fetching events for country: $1..."
    curl -X GET "${API_URL}/country/$1" | jq '.'
}

# Get events by period
get_events_by_period() {
    echo "Fetching events for period: $1..."
    curl -X GET "${API_URL}/period/$1" | jq '.'
}

# Initialize database with sample data
initialize_data() {
    echo "Initializing database with sample data..."
    curl -X POST \
        -H "Content-Type: application/json" \
        -d "@event_data.json" \
        ${API_URL}/initialize
    
    if [ $? -eq 0 ]; then
        success "Database initialized successfully!"
    else
        error "Failed to initialize database"
    fi
}

# Main script logic
case "$1" in
    "init")
        initialize_data
        ;;
    "create")
        if [ -z "$2" ]; then
            error "Please provide JSON file path"
            exit 1
        fi
        create_event "$2"
        ;;
    "createAll")
        create_all_event 
        ;;
    "list")
        get_events
        ;;
    "get")
        if [ -z "$2" ]; then
            error "Please provide event ID"
            exit 1
        fi
        get_event "$2"
        ;;
    "country")
        if [ -z "$2" ]; then
            error "Please provide country name"
            exit 1
        fi
        get_events_by_country "$2"
        ;;
    "period")
        if [ -z "$2" ]; then
            error "Please provide period name"
            exit 1
        fi
        get_events_by_period "$2"
        ;;
    *)
        echo "Usage: $0 {init|create|list|get|country|period} [argument]"
        echo "Examples:"
        echo "  $0 init                    # Initialize database with sample data"
        echo "  $0 create event.json       # Create new event from JSON file"
        echo "  $0 list                    # List all events"
        echo "  $0 get 1                   # Get event with ID 1"
        echo "  $0 country Spain           # Get events for Spain"
        echo "  $0 period 'Colonial Era'   # Get events for Colonial Era"
        exit 1
        ;;
esac