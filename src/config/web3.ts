import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

// Best practice: Use environment variables for your RPC provider URLs.
// You'll need to create a .env.local file in the root of your project
// and add: NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key
const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

if (!ALCHEMY_API_KEY) {
  // This error will be thrown during the build process if the key is missing,
  // preventing a broken deployment.
  throw new Error("Missing NEXT_PUBLIC_ALCHEMY_API_KEY environment variable");
}

export const config = createConfig({
  chains: [mainnet, sepolia],
  // multiInjectedProviderDiscovery is set to false to avoid conflicting with browser wallets like Rabby and Metamask that inject multiple providers.
  // This is a best practice for a smoother user experience.
  multiInjectedProviderDiscovery: false,
  ssr: true, // Enable SSR for best practice with Next.js App Router
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`),
  },
}) 