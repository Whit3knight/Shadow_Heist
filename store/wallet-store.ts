import { create } from 'zustand'

interface WalletState {
  isConnected: boolean
  address: string | null
  network: 'mainnet' | 'devnet' | 'testnet'
  connect: (address: string) => void
  disconnect: () => void
}

export const useWalletStore = create<WalletState>((set) => ({
  isConnected: false,
  address: null,
  network: 'devnet',
  connect: (address: string) => set({ isConnected: true, address }),
  disconnect: () => set({ isConnected: false, address: null }),
}))

