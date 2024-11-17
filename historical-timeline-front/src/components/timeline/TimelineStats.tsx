'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { timelineData } from './timelineData'

interface TimelineStatsProps {
  filteredEvents: typeof timelineData.events
}

const TimelineStats: React.FC<TimelineStatsProps> = ({ filteredEvents }) => {
  const totalEvents = filteredEvents.length
  const eventsByPeriod = React.useMemo(() => {
    const counts = timelineData.periods.map(period => ({
      ...period,
      count: filteredEvents.filter(event => event.period === period.name).length,
      percentage: (filteredEvents.filter(event => event.period === period.name).length / totalEvents) * 100
    }))
    return counts
  }, [filteredEvents, totalEvents])

  const eventsByType = React.useMemo(() => {
    const counts: Record<string, number> = {}
    filteredEvents.forEach(event => {
      counts[event.eventType] = (counts[event.eventType] || 0) + 1
    })
    return Object.entries(counts).map(([type, count]) => ({
      type,
      count,
      percentage: (count / totalEvents) * 100
    }))
  }, [filteredEvents, totalEvents])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Events by Period</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {eventsByPeriod.map((period) => (
              <motion.div
                key={period.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-1"
              >
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{period.name}</span>
                  <span className="text-muted-foreground">
                    {period.count} ({period.percentage.toFixed(1)}%)
                  </span>
                </div>
                <Progress 
                  value={period.percentage} 
                  className={`bg-${period.color}-100`}
                />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Events by Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {eventsByType.map(({ type, count, percentage }) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-1"
              >
                <div className="flex justify-between text-sm">
                  <span className="font-medium capitalize">{type}</span>
                  <span className="text-muted-foreground">
                    {count} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <Progress value={percentage} />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TimelineStats