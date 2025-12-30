import { MobileLayout } from '@/components/layout/mobile-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Wallet, Coins, Shield } from 'lucide-react'

export default function VaultPage() {
  return (
    <MobileLayout>
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Vault</h1>
          <p className="text-muted-foreground">Your secure wallet and assets</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">SOL</span>
                <span className="text-2xl font-bold">0.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">USDC</span>
                <span className="text-2xl font-bold">0.00</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="w-5 h-5" />
              Game Credits
            </CardTitle>
            <CardDescription>Your in-game currency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Encrypted Assets
            </CardTitle>
            <CardDescription>Protected by Arcium</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Your confidential game state is encrypted and secure
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  )
}

