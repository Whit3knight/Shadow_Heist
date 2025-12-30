'use client'

import { useState } from 'react'
import { MobileLayout } from '@/components/layout/mobile-layout'
import { GameCard } from '@/components/game/card'
import { GameLog } from '@/components/game/game-log'
import { Button } from '@/components/ui/button'
import { Target, Shield, Zap, Play } from 'lucide-react'

interface PlayerCard {
  id: string
  name: string
  description: string
  icon: React.ReactNode
}

interface LogEntry {
  id: string
  message: string
  timestamp: Date
}

const playerCards: PlayerCard[] = [
  {
    id: 'hacker',
    name: 'Hacker',
    description: 'Breach security systems',
    icon: <Zap className="w-5 h-5 text-yellow-400" />,
  },
  {
    id: 'infiltrator',
    name: 'Infiltrator',
    description: 'Stealth operations',
    icon: <Target className="w-5 h-5 text-green-400" />,
  },
  {
    id: 'tank',
    name: 'Tank',
    description: 'Absorb damage',
    icon: <Shield className="w-5 h-5 text-blue-400" />,
  },
]

const opponentCards = [
  { id: 'defense-1', name: 'Security System', description: 'Encrypted' },
  { id: 'defense-2', name: 'Vault Door', description: 'Encrypted' },
  { id: 'defense-3', name: 'Alarm System', description: 'Encrypted' },
]

export default function OperationsPage() {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
  const [logs, setLogs] = useState<LogEntry[]>([])

  const handleCardSelect = (cardId: string) => {
    setSelectedCardId(cardId === selectedCardId ? null : cardId)
  }

  const handleExecuteTurn = () => {
    if (!selectedCardId) return

    const selectedCard = playerCards.find((c) => c.id === selectedCardId)
    const newLog: LogEntry = {
      id: Date.now().toString(),
      message: `Arcium computing result... ${selectedCard?.name} action processed.`,
      timestamp: new Date(),
    }

    setLogs((prev) => [newLog, ...prev])
    setSelectedCardId(null)

    // Simulate Arcium processing
    setTimeout(() => {
      const resultLog: LogEntry = {
        id: (Date.now() + 1).toString(),
        message: `Confidential computation complete. Defense status: Encrypted.`,
        timestamp: new Date(),
      }
      setLogs((prev) => [resultLog, ...prev])
    }, 2000)
  }

  return (
    <MobileLayout>
      <div className="flex flex-col" style={{ minHeight: 'calc(100vh - 140px)' }}>
        {/* Opponent Area - Top Half */}
        <div className="flex-1 p-4 border-b border-slate-800 bg-slate-900/30">
          <div className="mb-3">
            <h2 className="text-lg font-semibold text-purple-300">Vault Defense</h2>
            <p className="text-xs text-muted-foreground">Arcium Encrypted</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {opponentCards.map((card) => (
              <GameCard
                key={card.id}
                id={card.id}
                name={card.name}
                description={card.description}
                type="opponent"
              />
            ))}
          </div>
        </div>

        {/* Execute Turn Button - Middle */}
        <div className="flex items-center justify-center p-4 border-y border-slate-800 bg-slate-950">
          <Button
            onClick={handleExecuteTurn}
            disabled={!selectedCardId}
            size="lg"
            className="w-full max-w-xs h-12 text-base font-semibold bg-primary hover:bg-primary/90"
          >
            <Play className="w-5 h-5 mr-2" />
            Execute Turn
          </Button>
        </div>

        {/* Player Area - Bottom Half */}
        <div className="flex-1 p-4 bg-slate-900/30">
          <div className="mb-3">
            <h2 className="text-lg font-semibold text-green-400">Heist Crew</h2>
            <p className="text-xs text-muted-foreground">Select a card to play</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {playerCards.map((card) => (
              <GameCard
                key={card.id}
                id={card.id}
                name={card.name}
                description={card.description}
                type="player"
                isSelected={selectedCardId === card.id}
                onClick={() => handleCardSelect(card.id)}
                icon={card.icon}
              />
            ))}
          </div>
        </div>

        {/* Log Area - Bottom */}
        <GameLog logs={logs} />
      </div>
    </MobileLayout>
  )
}
