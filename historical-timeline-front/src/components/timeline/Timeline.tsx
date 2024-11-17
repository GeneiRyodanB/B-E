'use client'
import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TimelineFilters from './TimelineFilters'
import TimelineEvent from './TimelineEvent'
import { TimelineData, HistoricalEvent } from './types'
import { timelineData } from './timelineData'
import TimelineStats from './TimelineStats'
import TimelineLegend from './TimelineLegend'

export const Timeline = () => {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const [yearRange, setYearRange] = useState([1900, 1960])
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'detailed' | 'compact'>('detailed')

  const filteredEvents = useMemo(() => {
    return timelineData.events.filter(event => {
        const yearInRange = parseInt(event.year) >= yearRange[0] && 
                         parseInt(event.year) <= yearRange[1]

        const matchesCountries = selectedCountries.length === 0 || 
                         selectedCountries.includes(event.country)

      
        const matchesTopics = selectedTopics.length === 0 || 
                            selectedTopics.some(topic => event.topics.includes(topic))
        
        const matchesRegions = selectedRegions.length === 0 || 
                                selectedRegions.some(region => event.regions.includes(region))
        
        const matchesPeriods = selectedPeriods.length === 0 || 
                                selectedPeriods.includes(event.period)
        
        const matchesSearch = searchQuery === '' || 
                           event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.figures.some(figure => 
                             figure.toLowerCase().includes(searchQuery.toLowerCase())
                           )

      return yearInRange && matchesTopics && matchesCountries && matchesRegions && matchesPeriods && matchesSearch
    }).sort((a, b) => parseInt(a.year) - parseInt(b.year))
  }, [yearRange, selectedTopics, selectedRegions, selectedPeriods, selectedCountries, searchQuery, timelineData.events])

  const toggleEvent = (index: number) => {
    setExpandedEvent(expandedEvent === index ? null : index)
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Historical Timeline</h1>
        <p className="text-lg text-gray-600">
          Explore key historical events in Moroccan history
        </p>
      </motion.div>

      <TimelineFilters
        yearRange={yearRange}
        setYearRange={setYearRange}
        selectedTopics={selectedTopics}
        setSelectedTopics={setSelectedTopics}
        selectedRegions={selectedRegions}
        setSelectedRegions={setSelectedRegions}
        selectedPeriods={selectedPeriods}
        setSelectedPeriods={setSelectedPeriods}
        selectedCountries={selectedCountries}
        setSelectedCountries={setSelectedCountries}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <TimelineStats filteredEvents={filteredEvents} />
      <TimelineLegend />

      <div className="relative mt-16">
        {/* Main vertical line */}
        <div className="absolute left-24 top-0 bottom-0 w-0.5 bg-blue-200" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedTopics}-${selectedRegions}-${selectedPeriods}-${searchQuery}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {filteredEvents.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <p className="text-gray-500 text-lg">
                  No events found matching your criteria.
                </p>
              </motion.div>
            ) : (
              filteredEvents.map((event, index) => (
                <TimelineEvent
                  key={`${event.year}-${event.eventName}`}
                  event={event}
                  index={index}
                  expandedEvent={expandedEvent}
                  toggleEvent={toggleEvent}
                  viewMode={viewMode}
                />
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Timeline