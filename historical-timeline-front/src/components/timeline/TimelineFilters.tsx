'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { 
  Filter, 
  Search, 
  Calendar, 
  LayoutList, 
  LayoutGrid,
  ChevronDown,
  ChevronUp,
  Globe2 
} from 'lucide-react'
import { timelineData } from './timelineData'
import { periodStyles, countryGroups } from './constants'

interface TimelineFiltersProps {
  yearRange: number[]
  setYearRange: (range: number[]) => void
  selectedTopics: string[]
  setSelectedTopics: (topics: string[]) => void
  selectedRegions: string[]
  setSelectedRegions: (regions: string[]) => void
  selectedPeriods: string[]
  setSelectedPeriods: (periods: string[]) => void
  selectedCountries: string[] // New prop
  setSelectedCountries: (countries: string[]) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  viewMode: 'detailed' | 'compact'
  setViewMode: (mode: 'detailed' | 'compact') => void
}

const CountryGroup: React.FC<{
  groupName: string
  groupData: typeof countryGroups[keyof typeof countryGroups]
  selectedCountries: string[]
  onCountryToggle: (country: string) => void
}> = ({ groupName, groupData, selectedCountries, onCountryToggle }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const GroupIcon = groupData.Icon

  return (
    <div className="space-y-2">
      {/* Group Header */}
      <div 
        className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer
          ${groupData.badge} transition-colors duration-200`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <GroupIcon className="h-4 w-4" />
        <span className="font-medium">{groupName}</span>
        {isExpanded ? 
          <ChevronUp className="h-4 w-4 ml-auto" /> : 
          <ChevronDown className="h-4 w-4 ml-auto" />
        }
      </div>

      {/* Countries */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pl-4 space-y-2"
          >
            <div className="flex flex-wrap gap-2">
              {Object.entries(groupData.countries).map(([country, config]) => {
                const IconComponent = config.Icon
                const isSelected = selectedCountries.includes(country)
                
                return (
                  <motion.div
                    key={country}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      variant="outline"
                      className={`cursor-pointer transition-all duration-300 flex items-center gap-2 
                        ${isSelected ? config.selectedBadge : config.badge}`}
                      onClick={() => onCountryToggle(country)}
                    >
                      <IconComponent className="h-3 w-3" />
                      <span>{config.flag} {country}</span>
                    </Badge>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const TimelinePeriodBadge: React.FC<{
  period: string
  isSelected: boolean
  onClick: () => void
}> = ({ period, isSelected, onClick }) => {
  const style = periodStyles[period as keyof typeof periodStyles]

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Badge
        variant="outline"
        className={`cursor-pointer transition-all duration-300 ${
          isSelected 
            ? `${style.dot} text-white border-transparent` 
            : `${style.lightBg} ${style.text} hover:${style.lightBg}`
        }`}
        onClick={onClick}
      >
        {period}
      </Badge>
    </motion.div>
  )
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
  selectedCountries,
  setSelectedCountries,
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

  const handleCountryToggle = (country: string) => {
    setSelectedCountries(prev => 
      prev.includes(country) 
        ? prev.filter(c => c !== country)
        : [...prev, country]
    )
  }

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

      <div className="mb-6">
        <h3 className="font-medium mb-2 flex items-center gap-2">
          <Globe2 className="h-4 w-4" />
          Countries by Region
        </h3>
        <div className="space-y-3">
          {Object.entries(countryGroups).map(([groupName, groupData]) => (
            <CountryGroup
              key={groupName}
              groupName={groupName}
              groupData={groupData}
              selectedCountries={selectedCountries}
              onCountryToggle={handleCountryToggle}
            />
          ))}
        </div>

        {/* Selected Countries Summary */}
        {selectedCountries.length > 0 && (
          <div className="mt-3 pt-3 border-t">
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Selected Countries ({selectedCountries.length}):
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedCountries.map(country => {
                const groupEntry = Object.entries(countryGroups).find(([, group]) => 
                  Object.keys(group.countries).includes(country)
                )
                if (!groupEntry) return null
                
                const config = groupEntry[1].countries[country as keyof typeof groupEntry[1]['countries']]
                const IconComponent = config.Icon
                
                return (
                  <Badge
                    key={country}
                    className={config.selectedBadge}
                    onClick={() => handleCountryToggle(country)}
                  >
                    <IconComponent className="h-3 w-3 mr-1" />
                    {config.flag} {country}
                    <span className="ml-1 cursor-pointer">×</span>
                  </Badge>
                )
              })}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCountries([])}
                className="text-xs"
              >
                Clear all
              </Button>
            </div>
          </div>
        )}
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
            <TimelinePeriodBadge
              key={period.name}
              period={period.name}
              isSelected={selectedPeriods.includes(period.name)}
              onClick={() => setSelectedPeriods(prev => 
                prev.includes(period.name) 
                  ? prev.filter(p => p !== period.name)
                  : [...prev, period.name]
              )}
            />
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