
import { http, createConfig, injected } from 'wagmi'
import { mainnet, base, unichain } from 'wagmi/chains'
import { farcasterFrame as miniAppConnector } from '@farcaster/frame-wagmi-connector'

export const config = createConfig({
    chains: [mainnet, base, unichain],
    transports: {
        [mainnet.id]: http(),
        [base.id]: http(),
        [unichain.id]: http(),
    },
    connectors: [
        injected(),
        miniAppConnector(),
       
    ]
})

