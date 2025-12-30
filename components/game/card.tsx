'use client'

import { motion } from 'framer-motion'
import { Lock, Shield, Target, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GameCardProps {
  id: string
  name: string
  description: string
  type: 'player' | 'opponent'
  isSelected?: boolean
  onClick?: () => void
  icon?: React.ReactNode
}

const cardIcons = {
  shield: Shield,
  target: Target,
  zap: Zap,
}

export function GameCard({ 
  id, 
  name, 
  description, 
  type, 
  isSelected = false, 
  onClick,
  icon 
}: GameCardProps) {
  const isPlayer = type === 'player'
  const isOpponent = type === 'opponent'

  return (
    <motion.div
      animate={isSelected ? { y: -8 } : { y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={onClick}
      className={cn(
        "relative p-4 rounded-lg border-2 cursor-pointer transition-all",
        isPlayer && "bg-slate-800/50 border-slate-700",
        isPlayer && isSelected && "border-green-400 shadow-lg shadow-green-400/50",
        isOpponent && "bg-slate-900/80 border-purple-500/30",
        onClick && "active:scale-95"
      )}
    >
      {/* Pulsating purple glow for opponent cards (Arcium encryption) */}
      {isOpponent && (
        <motion.div
          animate={{
            boxShadow: [
              '0 0 10px rgba(168, 85, 247, 0.4)',
              '0 0 20px rgba(168, 85, 247, 0.6)',
              '0 0 10px rgba(168, 85, 247, 0.4)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 rounded-lg pointer-events-none"
        />
      )}

      {/* Opponent card - face down with lock */}
      {isOpponent && (
        <div className="flex flex-col items-center justify-center min-h-[120px] space-y-3">
          <div className="relative">
            <Lock className="w-12 h-12 text-purple-400" />
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Lock className="w-12 h-12 text-purple-300" />
            </motion.div>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-purple-300">Encrypted</p>
            <p className="text-xs text-muted-foreground mt-1">Arcium Protected</p>
          </div>
        </div>
      )}

      {/* Player card - face up */}
      {isPlayer && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {icon || <Target className="w-5 h-5 text-primary" />}
            <h3 className="font-semibold text-sm">{name}</h3>
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-xs text-green-400 font-medium"
            >
              Selected
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  )
}

