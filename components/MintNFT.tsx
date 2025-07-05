'use client'
import { useAccount, useWriteContract, useSwitchChain, useConfig } from 'wagmi'
import { useState } from 'react'

const BASE_CHAIN_ID = 8453 // base 主网 chainId

export default function MintNFT() {
    const { isConnected, address, chainId } = useAccount()
    const { switchChainAsync } = useSwitchChain()
    const { writeContractAsync, isPending } = useWriteContract()
    const [status, setStatus] = useState<string | null>(null)

    const handleMint = async () => {
        setStatus(null)
        try {
            if (chainId !== BASE_CHAIN_ID) {
                await switchChainAsync({ chainId: BASE_CHAIN_ID })
            }
            await writeContractAsync({
                address: '0x2d42526e0fF024faD4c89133D77784AD50082f87',
                abi: [
                    {
                        "inputs": [],
                        "name": "mint",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    }
                ],
                functionName: 'mint',
                args: [],
            })
            setStatus('Mint 成功！')
        } catch (e: any) {
            setStatus('Mint 失败: ' + (e?.shortMessage || e?.message || '未知错误'))
        }
    }

    if (!isConnected) {
        return <div>请先连接钱包</div>
    }

    return (
        <div className="flex flex-col items-center gap-2">
            <button
                className="btn btn-primary"
                disabled={isPending}
                onClick={handleMint}
            >
                {isPending ? 'Minting...' : 'Mint NFT'}
            </button>
            {status && <div className="text-sm">{status}</div>}
        </div>
    )
}
