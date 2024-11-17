'use client'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Book, User } from 'lucide-react'
import * as Icons from 'lucide-react'
import { HistoricalEvent } from './types'
import { eventTypes, timelineData } from './timelineData'

interface TimelineEventProps {
  event: HistoricalEvent
  index: number
  expandedEvent: number | null
  toggleEvent: (index: number) => void
  viewMode: 'detailed' | 'compact'
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ 
  event, 
  index, 
  expandedEvent, 
  toggleEvent, 
  viewMode 
}) => {
  const period = timelineData.periods.find(p => p.name === event.period)
  const eventType = eventTypes[event.eventType]
  const EventIcon = eventType ? Icons[eventType.icon as keyof typeof Icons] : null
  const PeriodIcon = period ? Icons[period.icon as keyof typeof Icons] : null

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-start group"
    >
      {/* Date and dot */}
      <div className="w-48 pr-8 text-right relative">
        <motion.div 
          className={`text-2xl font-bold text-blue-600 sticky top-4`}
          whileHover={{ scale: 1.1 }}
        >
          {event.year}
        </motion.div>
        <motion.div 
          className={`absolute right-0 top-3 w-4 h-4 rounded-full bg-blue-500 transform translate-x-2 border-2 border-white`}
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </div>

      {/* Event card */}
      <Card 
        className={`flex-1 transition-all duration-300 hover:shadow-lg border-l-4 border-${period?.color}-500`}
      >
        <CardContent className="p-4">
          {/* Event Header */}
          <div 
            className="flex items-center justify-between cursor-pointer" 
            onClick={() => toggleEvent(index)}
          >
            <div className="flex items-center gap-3">
              {EventIcon && (
                <EventIcon className={`h-6 w-6 text-${eventType.color}-500`} />
              )}
              <div>
                <h2 className="text-xl font-semibold">{event.eventName}</h2>
                <div className="flex items-center gap-2 mt-1">
                  {PeriodIcon && (
                    <PeriodIcon className={`h-4 w-4 text-${period?.color}-500`} />
                  )}
                  <span className={`text-sm text-${period?.color}-600`}>
                    {event.period}
                  </span>
                </div>
              </div>
            </div>
            {viewMode === 'detailed' && (
              expandedEvent === index ? 
                <ChevronUp className="h-6 w-6 text-gray-500" /> : 
                <ChevronDown className="h-6 w-6 text-gray-500" />
            )}
          </div>

          {/* Compact View */}
          {viewMode === 'compact' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2"
            >
              <p className="text-gray-700 line-clamp-2">{event.details}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {event.topics.slice(0, 3).map((topic, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                ))}
                {event.topics.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{event.topics.length - 3} more
                  </Badge>
                )}
              </div>
            </motion.div>
          )}

          {/* Detailed View */}
          {viewMode === 'detailed' && (
            <AnimatePresence>
              {expandedEvent === index && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4 space-y-4 overflow-hidden"
                >
                  {/* Details */}
                  <p className="text-gray-700">{event.details}</p>

                  {/* Regions */}
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Icons.Globe2 className="h-4 w-4 text-gray-500" />
                      Regions:
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {event.regions.map((region, idx) => (
                        <Badge key={idx} variant="outline">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Historical Figures */}
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      Key Figures:
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {event.figures.map((figure, idx) => (
                        <Badge key={idx} variant="secondary">
                          {figure}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Topics */}
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Icons.Tags className="h-4 w-4 text-gray-500" />
                      Topics:
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {event.topics.map((topic, idx) => (
                        <Badge key={idx}>
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Resources */}
                  {event.resources.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Book className="h-4 w-4 text-gray-500" />
                        Resources:
                      </h3>
                      <div className="space-y-3">
                        {event.resources.map((resource, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            className="bg-gray-50 p-3 rounded-lg"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold">
                                  {resource.title} ({resource.year})
                                </h4>
                                <p className="text-sm text-gray-600">
                                  By {resource.author}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {resource.type}
                              </Badge>
                            </div>
                            <p className="text-sm mt-1 text-gray-700">
                              {resource.description}
                            </p>
                            <div className="mt-2 flex gap-2 flex-wrap">
                              {resource.topics.map((topic, topicIdx) => (
                                <Badge 
                                  key={topicIdx} 
                                  variant="outline" 
                                  className="text-xs"
                                >
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default TimelineEvent