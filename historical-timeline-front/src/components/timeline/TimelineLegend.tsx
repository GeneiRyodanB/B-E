'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  BadgeDollarSign, 
  Building, 
  Flag, 
  Handshake,  // Changed from HandshakeIcon
  Palette, 
  Swords, 
  Users 
} from 'lucide-react'
import { eventTypes } from './timelineData'

const iconMap = {
  diplomatic: Handshake, 
  military: Swords,
  political: Flag,
  economic: BadgeDollarSign,
  cultural: Palette,
  social: Users,
  institutional: Building,
} as const

const TimelineLegend = () => {
  return (
    <TooltipProvider>
      <Card className="mb-8">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {Object.entries(eventTypes).map(([type, config]) => {
              const Icon = iconMap[type as keyof typeof iconMap]
              return (
                <Tooltip key={type}>
                  <TooltipTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-2 cursor-help"
                    >
                      <div className={`p-2 rounded-full bg-${config.color}-100`}>
                        <Icon className={`h-4 w-4 text-${config.color}-500`} />
                      </div>
                      <span className="text-sm font-medium capitalize">
                        {type}
                      </span>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Events related to {type.toLowerCase()} activities</p>
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}

export default TimelineLegend