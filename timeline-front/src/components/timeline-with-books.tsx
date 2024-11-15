"use client"

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Search, Globe, Clock, User, BookOpen, X, BookText, FileText } from "lucide-react";

function ResourcesModal({ resources, figure, onClose }) {
  if (!resources || resources.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-blue-600">
              Resources about {figure}
            </h2>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            {resources.map((resource, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {resource.resourceType === 'book' ? (
                        <BookText className="w-4 h-4" />
                      ) : (
                        <FileText className="w-4 h-4" />
                      )}
                      <h4 className="text-lg font-bold text-blue-700">{resource.title}</h4>
                    </div>
                    <span className="text-sm bg-blue-100 px-2 py-1 rounded">
                      {resource.year}
                    </span>
                  </div>
                  {resource.author && (
                    <div className="text-sm text-gray-600">
                      by {resource.author}
                    </div>
                  )}
                  {resource.description && (
                    <p className="text-gray-600">{resource.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm bg-purple-100 px-2 py-1 rounded">
                      {resource.type}
                    </span>
                    {/* Add topics */}
                    {resource.topics && resource.topics.map((topic, i) => (
                      <span 
                        key={i} 
                        className="text-sm bg-green-100 px-2 py-1 rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
function parseYear(yearStr) {
  // Remove any whitespace
  yearStr = yearStr.trim();
  
  // Check if it's BCE
  const isBCE = yearStr.includes('BCE');
  
  // Extract the numeric part
  const numericYear = parseInt(yearStr.replace(/[^0-9-]/g, ''));
  
  // For BCE years, return negative value
  return isBCE ? -numericYear : numericYear;
}

export default function TimelineDiagram() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedPeriod, setSelectedPeriod] = useState("All");
  const [selectedResources, setSelectedResources] = useState(null);
  const [historicalData, setHistoricalData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();
        if (selectedPeriod !== "All") queryParams.append("period", selectedPeriod);
        if (selectedCountry !== "All") queryParams.append("country", selectedCountry);
        if (searchQuery) queryParams.append("search", searchQuery);

        const response = await fetch(`http://localhost:8080/api/historical?${queryParams}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received data:', data);
        setHistoricalData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(`Failed to load data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    const debounceTimer = setTimeout(fetchData, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedCountry, selectedPeriod]);

  const periods = ["All", ...Object.keys(historicalData)];
  const countries = [
    "All",
    ...new Set(
      Object.values(historicalData).flatMap(periodData =>
        Object.keys(periodData)
      )
    )
  ];

  const filteredData = Object.entries(historicalData).reduce((acc, [period, periodData]) => {
    if (selectedPeriod !== "All" && period !== selectedPeriod) return acc;
    
    const filteredPeriodData = Object.entries(periodData).reduce((countryAcc, [country, events]) => {
      if (selectedCountry !== "All" && country !== selectedCountry) return countryAcc;
      
      const filteredEvents = events.filter(event =>
        searchQuery === "" ||
        event.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.figure.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.details.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (filteredEvents.length > 0) {
        // Sort events by date
        const sortedEvents = [...filteredEvents].sort((a, b) => {
          const yearA = parseYear(a.year);
          const yearB = parseYear(b.year);
          return yearA - yearB;
        });
        
        countryAcc[country] = sortedEvents;
      }
      return countryAcc;
    }, {});
    
    if (Object.keys(filteredPeriodData).length > 0) {
      acc[period] = filteredPeriodData;
    }
    return acc;
  }, {});

  // Get all events in a flat array for overall sorting
  const getAllEvents = () => {
    const allEvents = [];
    Object.entries(filteredData).forEach(([period, periodData]) => {
      Object.entries(periodData).forEach(([country, events]) => {
        events.forEach(event => {
          allEvents.push({
            ...event,
            period,
            country
          });
        });
      });
    });
    
    // Sort all events by date
    return allEvents.sort((a, b) => {
      const yearA = parseYear(a.year);
      const yearB = parseYear(b.year);
      return yearA - yearB;
    });
  };

  const sortedEvents = getAllEvents();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 space-y-6">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          World History Timeline
        </h1>
        
        <div className="flex flex-col space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events, figures, or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {periods.map(period => (
                  <option key={period} value={period}>{period}</option>
                ))}
              </select>
            </div>
            
            <div className="relative flex-1">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">
          {error}
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-24 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500" />
          <div className="space-y-8">
            {sortedEvents.map((event, index) => (
              <div key={`${event.period}-${event.country}-${index}`} className="relative flex items-center ml-24">
                <div className="absolute -left-4 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  •
                </div>
                <Card className="ml-8 p-4 w-full hover:shadow-lg transition-shadow">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-lg font-bold text-blue-600">{event.year}</span>
                      <div className="flex gap-2">
                        <span className="text-sm bg-blue-100 px-2 py-1 rounded">{event.country}</span>
                        <span className="text-sm bg-purple-100 px-2 py-1 rounded">{event.period}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold">{event.event}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{event.figure}</span>
                      </div>
                      {event.resources && event.resources.length > 0 && (
                        <button
                          onClick={() => setSelectedResources(event)}
                          className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600"
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>View Resources ({event.resources.length})</span>
                        </button>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{event.details}</p>
                    {event.topics && event.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {event.topics.map((topic, index) => (
                          <span
                            key={index}
                            className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedResources && (
        <ResourcesModal
          resources={selectedResources.resources}
          figure={selectedResources.figure}
          onClose={() => setSelectedResources(null)}
        />
      )}
    </div>
  );
}