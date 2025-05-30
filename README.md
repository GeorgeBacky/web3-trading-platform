# Web3 Trading Platform

A modern, user-friendly platform for managing cryptocurrency trading bots and wallet interactions. Built with Next.js, TypeScript, and Web3 technologies.

## Features

- 🔐 **Multiple Authentication Methods**
  - MetaMask Wallet Integration
  - WalletConnect Support
  - Email/Password Login
  - Guest Mode Access

- 💼 **Wallet Management**
  - Real-time balance tracking
  - Transaction history
  - Multiple wallet support
  - Deposit/Withdraw functionality

- 🤖 **Trading Bot Integration**
  - Pre-built trading strategies
  - Custom strategy creation
  - Performance analytics
  - Real-time monitoring

- 📊 **Analytics Dashboard**
  - Portfolio overview
  - Performance metrics
  - Trading history
  - Custom reports

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** React Context
- **Web3 Integration:** MetaMask, WalletConnect
- **Authentication:** Custom Web3 Auth
- **Notifications:** Sonner

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- MetaMask browser extension (for wallet features)

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

3. Create a `.env.local` file in the root directory and add your environment variables:
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
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Authentication pages
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── ui/               # UI components
│   └── wallet-provider.tsx # Web3 wallet context
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

- All sensitive operations require wallet authentication
- Guest mode is available for demo purposes
- API keys are stored securely
- Regular security audits are performed

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