'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type State, WagmiProvider } from 'wagmi'
import { type ReactNode, useState } from 'react'

import { config } from '@/config/web3'

// Best practice: Using a dedicated provider component ensures that the app's context
// is managed cleanly and is marked as a client component, which is required by wagmi.
export function Web3Provider({
  children,
  initialState
}: {
  children: ReactNode,
  initialState?: State
}) {
  // The `useState` hook ensures that the QueryClient is only created once on the client-side.
  // This prevents re-creating the client on every render, which is crucial for performance.
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
} 