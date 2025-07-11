
import { http, createConfig, injected, createStorage, cookieStorage } from 'wagmi'
import { mainnet, base, unichain, optimism,baseSepolia } from 'wagmi/chains'
import { farcasterFrame as miniAppConnector } from '@farcaster/frame-wagmi-connector'
import { coinbaseWallet } from 'wagmi/connectors'

export const config = createConfig({
    chains: [/* mainnet, base, unichain, optimism, */baseSepolia],
    transports: {
/*         [mainnet.id]: http(),
        [base.id]: http(),
        [unichain.id]: http(),
        [optimism.id]: http(), */
        [baseSepolia.id]: http(),
    },
    connectors: [
        injected(),
        miniAppConnector(),
        coinbaseWallet({
            appName: 'OnchainKit',
            preference: 'smartWalletOnly',
            version: '4',
        }),
    ],
    storage: createStorage({
        storage: cookieStorage,
    }),
    ssr: true,
})

