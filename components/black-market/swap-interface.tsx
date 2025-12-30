'use client'

import { useState } from 'react'
import { ArrowDownRight, Settings, Search, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
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
  price: string
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
    price: '10 USDC',
  },
  {
    id: 'game-credit',
    name: 'Game Credit',
    description: 'In-game currency',
    icon: '🪙',
    price: '1 SOL',
  },
  {
    id: 'stealth-cloak',
    name: 'Stealth Cloak',
    description: 'Reduces detection chance',
    icon: '👤',
    price: '25 USDC',
  },
  {
    id: 'lockpick',
    name: 'Lockpick Set',
    description: 'Opens encrypted vaults',
    icon: '🔓',
    price: '5 USDC',
  },
]

export function SwapInterface() {
  const [inputToken, setInputToken] = useState<Token>(tokens[0])
  const [outputItem, setOutputItem] = useState<GameItem>(gameItems[0])
  const [inputAmount, setInputAmount] = useState('')
  const [outputAmount, setOutputAmount] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [slippage, setSlippage] = useState('0.5')
  const [showSlippage, setShowSlippage] = useState(false)
  const [showTokenSelector, setShowTokenSelector] = useState(false)
  const [showItemSelector, setShowItemSelector] = useState(false)

  const handleScanMarket = async () => {
    setIsScanning(true)
    // Simulate Jupiter API call
    setTimeout(() => {
      const mockOutput = (parseFloat(inputAmount) * 0.95).toFixed(4)
      setOutputAmount(mockOutput)
      setIsScanning(false)
    }, 2000)
  }

  const handleSwap = () => {
    // Handle swap logic
    console.log('Swapping', inputAmount, inputToken.symbol, 'for', outputItem.name)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Buy Heist Tools</CardTitle>
            <button
              onClick={() => setShowSlippage(!showSlippage)}
              className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <CardDescription>Trade tokens for game items</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Slippage Settings */}
          {showSlippage && (
            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
              <label className="text-sm font-medium mb-2 block">Slippage Tolerance</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={slippage}
                  onChange={(e) => setSlippage(e.target.value)}
                  className="h-10"
                  step="0.1"
                  min="0"
                  max="50"
                />
                <span className="text-sm text-muted-foreground self-center">%</span>
              </div>
            </div>
          )}

          {/* Input Token */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">You Pay</label>
            <div className="relative">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                <button
                  onClick={() => setShowTokenSelector(true)}
                  className="flex items-center gap-2 flex-1 text-left"
                >
                  <span className="text-2xl">{inputToken.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold">{inputToken.symbol}</div>
                    <div className="text-xs text-muted-foreground">{inputToken.name}</div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Balance: {inputToken.balance}
                  </span>
                </button>
              </div>
              <Input
                type="number"
                placeholder="0.00"
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
                className="mt-2 text-2xl font-bold h-16"
              />
            </div>
          </div>

          {/* Swap Arrow */}
          <div className="flex justify-center -my-2">
            <div className="p-2 rounded-full bg-slate-800 border border-slate-700">
              <ArrowDownRight className="w-5 h-5 text-primary" />
            </div>
          </div>

          {/* Output Game Item */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">You Receive</label>
            <div className="relative">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                <button
                  onClick={() => setShowItemSelector(true)}
                  className="flex items-center gap-2 flex-1 text-left"
                >
                  <span className="text-2xl">{outputItem.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold">{outputItem.name}</div>
                    <div className="text-xs text-muted-foreground">{outputItem.description}</div>
                  </div>
                </button>
              </div>
              <div className="mt-2 p-4 rounded-lg bg-slate-800/30 border border-slate-700">
                <div className="text-2xl font-bold">
                  {isScanning ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Scanning...</span>
                    </div>
                  ) : outputAmount ? (
                    outputAmount
                  ) : (
                    '0.00'
                  )}
                </div>
                {outputAmount && (
                  <div className="text-xs text-muted-foreground mt-1">
                    ≈ {outputItem.price}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Scan Market Button */}
          <Button
            onClick={handleScanMarket}
            disabled={!inputAmount || isScanning}
            variant="outline"
            className="w-full"
          >
            {isScanning ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Scanning Market...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Scan Market
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Fixed Bottom Swap Button - Thumb Friendly */}
      <div className="sticky bottom-20 left-0 right-0 max-w-md mx-auto px-4 z-30 mt-4">
        <Button
          onClick={handleSwap}
          disabled={!inputAmount || !outputAmount || isScanning}
          size="xl"
          className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg"
        >
          Buy {outputItem.name}
        </Button>
      </div>

      {/* Token Selector Modal */}
      {showTokenSelector && (
        <div 
          className="fixed inset-0 z-50 flex items-end bg-black/50 backdrop-blur-sm"
          onClick={() => setShowTokenSelector(false)}
        >
          <div 
            className="w-full max-w-md mx-auto bg-slate-900 rounded-t-2xl border-t border-slate-800 max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Select Token</h3>
              <button
                onClick={() => setShowTokenSelector(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-2">
              {tokens.map((token) => (
                <button
                  key={token.symbol}
                  onClick={() => {
                    setInputToken(token)
                    setShowTokenSelector(false)
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 p-4 rounded-lg border transition-colors",
                    inputToken.symbol === token.symbol
                      ? "bg-primary/10 border-primary"
                      : "bg-slate-800/50 border-slate-700 hover:bg-slate-800"
                  )}
                >
                  <span className="text-2xl">{token.icon}</span>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{token.symbol}</div>
                    <div className="text-xs text-muted-foreground">{token.name}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{token.balance}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Item Selector Modal */}
      {showItemSelector && (
        <div 
          className="fixed inset-0 z-50 flex items-end bg-black/50 backdrop-blur-sm"
          onClick={() => setShowItemSelector(false)}
        >
          <div 
            className="w-full max-w-md mx-auto bg-slate-900 rounded-t-2xl border-t border-slate-800 max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Select Game Item</h3>
              <button
                onClick={() => setShowItemSelector(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-2">
              {gameItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setOutputItem(item)
                    setShowItemSelector(false)
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 p-4 rounded-lg border transition-colors",
                    outputItem.id === item.id
                      ? "bg-primary/10 border-primary"
                      : "bg-slate-800/50 border-slate-700 hover:bg-slate-800"
                  )}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                  <div className="text-sm text-primary">{item.price}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

