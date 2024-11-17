'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Filter, Search, Calendar, LayoutList, LayoutGrid } from 'lucide-react'
import { timelineData } from './timelineData'

interface TimelineFiltersProps {
  yearRange: number[]
  setYearRange: (range: number[]) => void
  selectedTopics: string[]
  setSelectedTopics: (topics: string[]) => void
  selectedRegions: string[]
  setSelectedRegions: (regions: string[]) => void
  selectedPeriods: string[]
  setSelectedPeriods: (periods: string[]) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  viewMode: 'detailed' | 'compact'
  setViewMode: (mode: 'detailed' | 'compact') => void
}

const TimelineFilters: React.FC<TimelineFiltersProps> = ({
  yearRange,
  setYearRange,
  selectedTopics,
  setSelectedTopics,
  selectedRegions,
  setSelectedRegions,
  selectedPeriods,
  setSelectedPeriods,
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
}) => {
  const allTopics = React.useMemo(() => {
    const topics = new Set<string>()
    timelineData.events.forEach(event => {
      event.topics.forEach(topic => topics.add(topic))
    })
    return Array.from(topics).sort()
  }, [])

  const allRegions = React.useMemo(() => {
    const regions = new Set<string>()
    timelineData.events.forEach(event => {
      event.regions.forEach(region => regions.add(region))
    })
    return Array.from(regions).sort()
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-bold">Timeline Filters</h2>
      </div>

      {/* Search and View Mode */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Search className="h-4 w-4 text-gray-500" />
            <label className="font-medium">Search Events</label>
          </div>
          <Input
            type="text"
            placeholder="Search events, figures, or details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex items-end justify-end">
          <Button
            variant={viewMode === 'detailed' ? 'default' : 'outline'}
            onClick={() => setViewMode('detailed')}
            className="rounded-r-none"
          >
            <LayoutList className="h-4 w-4 mr-2" />
            Detailed
          </Button>
          <Button
            variant={viewMode === 'compact' ? 'default' : 'outline'}
            onClick={() => setViewMode('compact')}
            className="rounded-l-none"
          >
            <LayoutGrid className="h-4 w-4 mr-2" />
            Compact
          </Button>
        </div>
      </div>

      {/* Year Range */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <label className="font-medium">
            Year Range: {yearRange[0]} - {yearRange[1]}
          </label>
        </div>
        <Slider
          defaultValue={[1900, 1960]}
          min={1900}
          max={1960}
          step={1}
          value={yearRange}
          onValueChange={setYearRange}
          className="w-full"
        />
      </div>

      {/* Periods */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Historical Periods</h3>
        <div className="flex flex-wrap gap-2">
          {timelineData.periods.map(period => (
            <motion.div
              key={period.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge
                variant={selectedPeriods.includes(period.name) ? "default" : "outline"}
                className={`cursor-pointer bg-${period.color}-100 hover:bg-${period.color}-200`}
                onClick={() => setSelectedPeriods(prev => 
                  prev.includes(period.name) 
                    ? prev.filter(p => p !== period.name)
                    : [...prev, period.name]
                )}
              >
                {period.name}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Topics and Regions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-2">Topics</h3>
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
            {allTopics.map(topic => (
              <motion.div
                key={topic}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant={selectedTopics.includes(topic) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedTopics(prev => 
                    prev.includes(topic) 
                      ? prev.filter(t => t !== topic)
                      : [...prev, topic]
                  )}
                >
                  {topic}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Regions</h3>
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
            {allRegions.map(region => (
              <motion.div
                key={region}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant={selectedRegions.includes(region) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedRegions(prev => 
                    prev.includes(region) 
                      ? prev.filter(r => r !== region)
                      : [...prev, region]
                  )}
                >
                  {region}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TimelineFilters