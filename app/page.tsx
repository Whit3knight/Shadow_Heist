'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useWalletStore } from '@/store/wallet-store'
import { ConnectWallet } from '@/components/connect-wallet'

export default function Home() {
  const { isConnected } = useWalletStore()
  const router = useRouter()

  useEffect(() => {
    if (isConnected) {
      router.push('/vault')
    }
  }, [isConnected, router])

  if (isConnected) {
    return null
  }

  return <ConnectWallet />
}

