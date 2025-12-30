# Shadow Heist

A turn-based strategy game built on Solana using Arcium (Confidential Computing) and Jupiter (Swap API).

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Blockchain**: Solana
- **Confidential Computing**: Arcium
- **Swap API**: Jupiter

## Design Philosophy

1. **Mobile-First**: All designs optimized for vertical screens (360px - 430px width)
2. **Native Mobile Feel**: Bottom navigation, large touch targets, no hover states
3. **Cyberpunk/Stealth Aesthetic**: Dark mode default, neon accents (Green for success, Red for danger, Purple/Blue for Arcium encryption), glassmorphism

## Features

- 🔐 **Connect Wallet**: Secure wallet connection screen
- 💰 **Vault**: View wallet balance and game credits
- 🛒 **Black Market**: Jupiter Swap-style interface for trading tokens for game items
- 🎯 **Operations**: Game arena for planning heists

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
shadow-heist/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Connect Wallet screen
│   ├── vault/             # Vault page
│   ├── black-market/      # Black Market (Jupiter Swap)
│   └── operations/        # Game arena
├── components/
│   ├── layout/            # Layout components
│   ├── black-market/      # Swap interface components
│   └── ui/                # Shadcn/UI components
├── store/                 # Zustand state management
└── lib/                   # Utility functions
```

## Mobile-First Design

- Bottom navigation bar with 3 tabs (Vault, Black Market, Operations)
- Sticky header with wallet address and network status
- Scrollable main content area
- Large, thumb-friendly buttons (minimum 44px touch targets)
- Dark theme with slate-950 background

## Black Market (Jupiter Swap Integration)

The Black Market page features:
- Token-to-Game-Item swap interface
- "Scan Market" button to fetch quotes (mocks Jupiter API)
- Slippage settings (hidden in gear icon)
- Large fixed swap button at bottom
- Game-themed items (EMP Drill, Stealth Cloak, Lockpick Set, etc.)

## License

MIT

