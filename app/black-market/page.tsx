import { MobileLayout } from '@/components/layout/mobile-layout'
import { SwapCard } from '@/components/black-market/swap-card'

export default function BlackMarketPage() {
  return (
    <MobileLayout>
      <div className="p-4 space-y-4 pb-32">
        <SwapCard />
      </div>
    </MobileLayout>
  )
}

