'use client'

import { useState, useEffect } from 'react'
import { ArrowDownRight, ShoppingBag, Coins } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Token {
  symbol: string
  name: string
  icon: string
  balance: string
}

interface GameItem {
  id: string
  name: string
  description: string
  icon: string
  pricePerUnit: number // Price in the selected token
}

const tokens: Token[] = [
  { symbol: 'SOL', name: 'Solana', icon: '🟣', balance: '0.00' },
  { symbol: 'USDC', name: 'USD Coin', icon: '💵', balance: '0.00' },
]

const gameItems: GameItem[] = [
  {
    id: 'emp-drill',
    name: 'EMP Drill',
    description: 'Disables security systems',
    icon: '⚡',
    pricePerUnit: 10, // 10 USDC or 0.01 SOL
  },
  {
    id: 'game-credit',
    name: 'Game Credit',
    description: 'In-game currency',
    icon: '🪙',
    pricePerUnit: 0.001, // 0.001 SOL = 1 Credit, or 1 USDC = 1000 Credits
  },
  {
    id: 'stealth-cloak',
    name: 'Stealth Cloak',
    description: 'Reduces detection chance',
    icon: '👤',
    pricePerUnit: 25, // 25 USDC or 0.025 SOL
  },
  {
    id: 'lockpick',
    name: 'Lockpick Set',
    description: 'Opens encrypted vaults',
    icon: '🔓',
    pricePerUnit: 5, // 5 USDC or 0.005 SOL
  },
]

// Conversion rates (simplified)
const getConversionRate = (tokenSymbol: string, itemId: string): number => {
  if (itemId === 'game-credit') {
    // 1 SOL = 1000 Credits, 1 USDC = 1000 Credits
    return tokenSymbol === 'SOL' ? 1000 : 1000
  }
  
  // For other items, use their pricePerUnit
  const item = gameItems.find(i => i.id === itemId)
  if (!item) return 1
  
  // If paying with SOL, convert USDC price to SOL (rough estimate: 1 SOL = 100 USDC)
  if (tokenSymbol === 'SOL') {
    return item.pricePerUnit / 100
  }
  
  return item.pricePerUnit
}

export function SwapCard() {
  const [selectedToken, setSelectedToken] = useState<Token>(tokens[0])
  const [selectedItem, setSelectedItem] = useState<GameItem>(gameItems[0])
  const [payAmount, setPayAmount] = useState('')
  const [receiveAmount, setReceiveAmount] = useState('')
  const [showTokenDropdown, setShowTokenDropdown] = useState(false)
  const [showItemDropdown, setShowItemDropdown] = useState(false)

  // Auto-calculate receive amount when pay amount or selections change
  useEffect(() => {
    if (payAmount && !isNaN(parseFloat(payAmount))) {
      const rate = getConversionRate(selectedToken.symbol, selectedItem.id)
      const calculated = parseFloat(payAmount) * rate
      setReceiveAmount(calculated.toFixed(4))
    } else {
      setReceiveAmount('')
    }
  }, [payAmount, selectedToken, selectedItem])

  const handleBuy = () => {
    if (!payAmount || !receiveAmount) return
    console.log(`Buying ${receiveAmount} ${selectedItem.name} for ${payAmount} ${selectedToken.symbol}`)
    // TODO: Integrate with Jupiter Swap API
  }

  return (
    <div className="space-y-4">
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Black Market
          </CardTitle>
          <CardDescription>Trade tokens for heist equipment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pay With Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Pay with</label>
            <div className="relative">
              {/* Token Selector */}
              <button
                onClick={() => setShowTokenDropdown(!showTokenDropdown)}
                className="w-full flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedToken.icon}</span>
                  <div className="text-left">
                    <div className="font-semibold">{selectedToken.symbol}</div>
                    <div className="text-xs text-muted-foreground">{selectedToken.name}</div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  Balance: {selectedToken.balance}
                </span>
              </button>

              {/* Token Dropdown */}
              {showTokenDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowTokenDropdown(false)}
                  />
                  <div className="absolute top-full mt-2 w-full z-50 bg-slate-900 rounded-lg border border-slate-800 shadow-lg">
                    {tokens.map((token) => (
                      <button
                        key={token.symbol}
                        onClick={() => {
                          setSelectedToken(token)
                          setShowTokenDropdown(false)
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 p-4 hover:bg-slate-800 transition-colors first:rounded-t-lg last:rounded-b-lg",
                          selectedToken.symbol === token.symbol && "bg-primary/10"
                        )}
                      >
                        <span className="text-2xl">{token.icon}</span>
                        <div className="flex-1 text-left">
                          <div className="font-semibold">{token.symbol}</div>
                          <div className="text-xs text-muted-foreground">{token.name}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Amount Input */}
            <Input
              type="number"
              placeholder="0.00"
              value={payAmount}
              onChange={(e) => setPayAmount(e.target.value)}
              className="h-14 text-2xl font-bold"
            />
          </div>

          {/* Arrow */}
          <div className="flex justify-center -my-2">
            <div className="p-2 rounded-full bg-slate-800 border border-slate-700">
              <ArrowDownRight className="w-5 h-5 text-primary" />
            </div>
          </div>

          {/* Receive Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Receive Item/Token</label>
            <div className="relative">
              {/* Item Selector */}
              <button
                onClick={() => setShowItemDropdown(!showItemDropdown)}
                className="w-full flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedItem.icon}</span>
                  <div className="text-left">
                    <div className="font-semibold">{selectedItem.name}</div>
                    <div className="text-xs text-muted-foreground">{selectedItem.description}</div>
                  </div>
                </div>
              </button>

              {/* Item Dropdown */}
              {showItemDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowItemDropdown(false)}
                  />
                  <div className="absolute top-full mt-2 w-full z-50 bg-slate-900 rounded-lg border border-slate-800 shadow-lg max-h-64 overflow-y-auto">
                    {gameItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setSelectedItem(item)
                          setShowItemDropdown(false)
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 p-4 hover:bg-slate-800 transition-colors first:rounded-t-lg last:rounded-b-lg",
                          selectedItem.id === item.id && "bg-primary/10"
                        )}
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <div className="flex-1 text-left">
                          <div className="font-semibold">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Read-only Amount Display */}
            <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <Coins className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">You will receive</span>
              </div>
              <div className="text-2xl font-bold">
                {receiveAmount || '0.00'} {selectedItem.name}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Big BUY EQUIPMENT Button - Fixed at bottom */}
      <div className="sticky bottom-20 left-0 right-0 max-w-md mx-auto px-4 z-30">
        <Button
          onClick={handleBuy}
          disabled={!payAmount || !receiveAmount || parseFloat(payAmount) <= 0}
          size="xl"
          className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg"
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          BUY EQUIPMENT
        </Button>
      </div>
    </div>
  )
}

