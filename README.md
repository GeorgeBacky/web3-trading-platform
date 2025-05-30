# Web3 Trading Platform

A modern, user-friendly platform for managing cryptocurrency trading bots and wallet interactions. Built with Next.js, TypeScript, and Web3 technologies.

> **Note:** This is a demonstration platform that uses mock data. All trading data, wallet balances, and transactions are simulated for development and testing purposes.

## Features

- 🔐 **Multiple Authentication Methods**
  - MetaMask Wallet Integration (Demo Mode)
  - WalletConnect Support (Coming Soon)
  - Email/Password Login (Demo Mode)
  - Guest Mode Access (Mock Data)

- 💼 **Wallet Management**
  - Simulated balance tracking
  - Mock transaction history
  - Demo wallet support
  - Simulated deposit/withdraw functionality

- 🤖 **Trading Bot Integration**
  - Demo trading strategies
  - Mock performance data
  - Simulated trading activities
  - Demo monitoring interface

- 📊 **Analytics Dashboard**
  - Mock portfolio overview
  - Simulated performance metrics
  - Demo trading history
  - Sample reports

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** React Context
- **Web3 Integration:** MetaMask (Demo Mode), WalletConnect (Coming Soon)
- **Authentication:** Custom Web3 Auth (Demo)
- **Notifications:** Sonner

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- MetaMask browser extension (optional, for demo wallet features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/web3-trading-platform.git
cd web3-trading-platform
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env.local` file in the root directory and add your environment variables (optional for demo):
```env
NEXT_PUBLIC_INFURA_ID=your_infura_id
NEXT_PUBLIC_ALCHEMY_ID=your_alchemy_id
```

4. Start the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
web3-trading-platform/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages (Mock Data)
│   ├── login/            # Authentication pages
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── ui/               # UI components
│   └── wallet-provider.tsx # Web3 wallet context (Demo Mode)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/              # Static assets
└── styles/              # Global styles
```

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security

- All sensitive operations are simulated in demo mode
- Guest mode uses mock data for demonstration
- No real API keys or sensitive data are used
- Platform is for development and testing purposes only

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [MetaMask](https://metamask.io/)
- [WalletConnect](https://walletconnect.com/) 