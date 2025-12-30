'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Wallet, ShoppingBag, Target } from 'lucide-react'
import { useWalletStore } from '@/store/wallet-store'
import { cn } from '@/lib/utils'

const navItems = [
  { path: '/vault', icon: Wallet, label: 'Vault' },
  { path: '/black-market', icon: ShoppingBag, label: 'Black Market' },
  { path: '/operations', icon: Target, label: 'Operations' },
]

export function MobileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { address, network } = useWalletStore()

  const formatAddress = (addr: string | null) => {
    if (!addr) return 'Not Connected'
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`
  }

  const getNetworkColor = () => {
    switch (network) {
      case 'mainnet':
        return 'bg-green-500'
      case 'devnet':
        return 'bg-purple-500'
      case 'testnet':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className={cn("w-2 h-2 rounded-full", getNetworkColor())} />
            <span className="text-xs text-muted-foreground uppercase">{network}</span>
          </div>
          <div className="text-sm font-mono text-foreground">
            {formatAddress(address)}
          </div>
        </div>
      </header>

      {/* Main Content - Scrollable */}
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      {/* Bottom Navigation - Sticky */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto border-t border-slate-800 bg-slate-950/95 backdrop-blur-sm">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path
            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-colors min-w-[80px]",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground"
                )}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

