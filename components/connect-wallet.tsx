'use client'

import { useState } from 'react'
import { Wallet, Shield, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useWalletStore } from '@/store/wallet-store'
import { useRouter } from 'next/navigation'

export function ConnectWallet() {
  const [isConnecting, setIsConnecting] = useState(false)
  const { connect } = useWalletStore()
  const router = useRouter()

  const handleConnect = async () => {
    setIsConnecting(true)
    // Simulate wallet connection
    setTimeout(() => {
      const mockAddress = '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU'
      connect(mockAddress)
      router.push('/vault')
      setIsConnecting(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
      <Card className="w-full max-w-md border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Shadow Heist
          </CardTitle>
          <CardDescription className="text-base">
            A turn-based strategy game powered by Arcium Confidential Computing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
              <Zap className="w-5 h-5 text-purple-400" />
              <div className="flex-1">
                <p className="text-sm font-medium">Arcium Encryption</p>
                <p className="text-xs text-muted-foreground">Confidential game state</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
              <Wallet className="w-5 h-5 text-green-400" />
              <div className="flex-1">
                <p className="text-sm font-medium">Jupiter Swap</p>
                <p className="text-xs text-muted-foreground">Trade in the Black Market</p>
              </div>
            </div>
          </div>
          <Button
            onClick={handleConnect}
            disabled={isConnecting}
            size="xl"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isConnecting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="w-5 h-5 mr-2" />
                Connect Wallet
              </>
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            By connecting, you agree to Shadow Heist&apos;s Terms of Service
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

