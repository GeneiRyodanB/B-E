"use client"

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Search, Globe, Clock, User, BookOpen, X, BookText, FileText, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";

// Static sample content for resources
const STATIC_CONTENT = {
  "Morocco That Was": `Morocco That Was by Walter Harris

Chapter 1: Introduction

In the latter years of the nineteenth century Morocco remained a land apart, keeping its distance from the developing ambitions of European colonial powers. It was a country of infinite charm and variety, a paradise for painters, a happy hunting ground for diplomats, and a source of anxiety to governments. The Sultan's authority, though real enough in the submissive areas, was often more nominal than actual in the tribal regions, and the distinction between Bled el-Makhzen—the government's land—and Bled es-Siba—the land of dissidence—was marked...

Chapter 2: The Land and Its People

The Moroccan people presented a fascinating mixture of Arab and Berber cultures. The Arabs, who had arrived with the Islamic conquest, dominated the plains and cities, while the Berbers remained the masters of the mountains. This division was not merely geographical; it represented profound differences in social organization, custom, and even religious practice...

The great cities of Fez, Marrakesh, Rabat, and Meknes each had their distinct character. Fez, with its ancient university of Al-Quaraouiyine, was the intellectual and spiritual capital. Marrakesh, lying at the foot of the Atlas Mountains, was the gateway to the Sahara and the great trading routes of Africa...`,

  "Early Dynastic Egypt": `Early Dynastic Egypt by Toby A. H. Wilkinson

Chapter 1: The Path to Unification

The unification of Upper and Lower Egypt marks one of humanity's first recorded attempts at nation-building. Through careful analysis of archaeological evidence, we can trace the complex process that led to the formation of the world's first territorial state...

Chapter 2: The First Dynasty

The establishment of the First Dynasty represents a watershed moment in human history. Under Narmer and his successors, we see the emergence of sophisticated administrative systems, complex hierarchies, and the beginnings of monumental architecture. The royal tombs at Abydos provide us with rich evidence of this transformative period...

Chapter 3: State Formation

The development of early Egyptian state institutions was remarkably sophisticated. The period saw the emergence of complex bureaucratic systems, standardized writing, and centralized economic control. These innovations would shape Egyptian civilization for millennia to come...`,

  "Life of Charlemagne": `Life of Charlemagne by Einhard

Preface

I have taken care not to omit any facts that could come to my knowledge, but at the same time not to offend by presenting a mass of superfluous matter. I have tried to write in a style as plain and direct as possible...

Chapter 1: The Merovingian Family

Before Charlemagne, the family called the Merovingians had exercised royal authority over the Franks. Although they had long borne the name of king, their power had dwindled to nothing. The wealth and power of the kingdom had passed into the hands of the prefects of the palace, called "mayors of the palace"...

Chapter 2: Charlemagne's Accession

After the death of Pepin, the kingdom passed by divine will to his sons, Charles and Carloman. The Franks, in a solemn assembly, made them both kings on the condition that they should divide the whole kingdom equally...`,

  "The First Man: The Life of Neil A. Armstrong": `The First Man: The Life of Neil A. Armstrong by James R. Hansen

Chapter 1: Navy Fighter Pilot

Long before he walked on the Moon, Neil Armstrong was pushing the boundaries of flight within Earth's atmosphere. As a naval aviator, he flew 78 combat missions during the Korean War. His experiences in the Navy shaped his later career and contributed to his selection as an astronaut...

Chapter 2: The Apollo Mission

The Apollo 11 mission represented the culmination of years of scientific advancement and personal preparation. Armstrong's selection as commander was based on both his technical expertise and his demonstrated ability to remain calm under pressure. The mission itself was a testament to human ingenuity and courage...

Chapter 3: The Moonwalk

The first human footsteps on the Moon marked a watershed moment in human history. Armstrong's famous words, "That's one small step for man, one giant leap for mankind," captured the magnitude of the achievement. The lunar landing demonstrated both human technological achievement and the power of peaceful international competition...`
};

function ResourcesModal({ resources, figure, onClose, setSelectedReadingResource }) {
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
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm bg-purple-100 px-2 py-1 rounded">
                        {resource.type}
                      </span>
                      {resource.topics && resource.topics.map((topic, i) => (
                        <span 
                          key={i} 
                          className="text-sm bg-green-100 px-2 py-1 rounded"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => setSelectedReadingResource(resource)}
                      className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600"
                    >
                      <BookText className="w-4 h-4" />
                      <span>Read</span>
                    </button>
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

function ResourceReader({ resource, onClose }) {
  const [fontSize, setFontSize] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8080/api/books/content?title=${encodeURIComponent(resource.title)}&author=${encodeURIComponent(resource.author || '')}`
        );

        if (!response.ok) {
          throw new Error('Failed to load book content');
        }

        const text = await response.text();
        // Process the text to preserve paragraphs and line breaks
        const processedText = text
          .replace(/\n\n/g, '[PARAGRAPH]') // Mark paragraphs
          .replace(/\n/g, ' ') // Replace single line breaks with spaces
          .replace(/\[PARAGRAPH\]/g, '\n\n'); // Restore paragraphs
        setContent(processedText);
        setError(null);
      } catch (err) {
        console.error('Error loading book:', err);
        setError('Failed to load book content');
        setContent("Content unavailable");
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [resource]);

  /*const WORDS_PER_PAGE = 300;
  const words = content.split(/\s+/);
  const totalPages = Math.ceil(words.length / WORDS_PER_PAGE);
  const currentPageContent = words.slice(
    (currentPage - 1) * WORDS_PER_PAGE,
    currentPage * WORDS_PER_PAGE
  ).join(' ');*/

  // Split content into pages based on paragraphs rather than words
  const paragraphs = content.split('\n\n').filter(p => p.trim());
  const PARAGRAPHS_PER_PAGE = 5;
  const totalPages = Math.ceil(paragraphs.length / PARAGRAPHS_PER_PAGE);
  const currentPageParagraphs = paragraphs.slice(
    (currentPage - 1) * PARAGRAPHS_PER_PAGE,
    currentPage * PARAGRAPHS_PER_PAGE
  );


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] bg-white">
        <div className="border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-blue-600">{resource.title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto" style={{ fontSize: `${fontSize}px` }}>
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">
              {error}
            </div>
          ) : (
            <div className="space-y-6">
              {currentPageParagraphs.map((paragraph, index) => (
                <p 
                  key={index} 
                  className="whitespace-pre-line"
                  style={{ textIndent: paragraph.startsWith('Chapter') ? 0 : '2em' }}
                >
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          )}
        </div>


        <div className="border-t p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFontSize(s => Math.max(12, s - 2))}
              className="px-2 py-1 bg-gray-100 rounded"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize(s => Math.min(24, s + 2))}
              className="px-2 py-1 bg-gray-100 rounded"
            >
              A+
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
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
  const [selectedReadingResource, setSelectedReadingResource] = useState(null);
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
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedResources(event)}
                            className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600"
                          >
                            <BookOpen className="w-4 h-4" />
                            <span>View Resources ({event.resources.length})</span>
                          </button>
                        </div>
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
          setSelectedReadingResource={setSelectedReadingResource}
        />
      )}

      {selectedReadingResource && (
        <ResourceReader
          resource={selectedReadingResource}
          onClose={() => setSelectedReadingResource(null)}
        />
      )}
    </div>
  );
}