'use client'

import Farcaster from "./farcaster"


import { Wagmi } from "./wagmi"

export default function Providers({ children }) {
    return (
        <Wagmi >
           
                <Farcaster>
                    {children}
                </Farcaster>
        
        </Wagmi>
    )
}