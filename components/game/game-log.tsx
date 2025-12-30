'use client'

import { useState } from 'react'
import { ChevronUp, ChevronDown, Terminal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface LogEntry {
  id: string
  message: string
  timestamp: Date
}

interface GameLogProps {
  logs: LogEntry[]
}

export function GameLog({ logs }: GameLogProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="border-t border-slate-800 bg-slate-900/50">
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full justify-between p-3 h-auto"
      >
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Game Log</span>
          {logs.length > 0 && (
            <span className="text-xs text-muted-foreground">({logs.length})</span>
          )}
        </div>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronUp className="w-4 h-4" />
        )}
      </Button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2 max-h-48 overflow-y-auto">
              {logs.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No log entries yet
                </p>
              ) : (
                logs.map((log) => (
                  <div
                    key={log.id}
                    className="text-xs font-mono p-2 rounded bg-slate-800/50 border border-slate-700"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-purple-400">[Arcium]</span>
                      <span className="text-muted-foreground">
                        {log.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-foreground">{log.message}</p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

