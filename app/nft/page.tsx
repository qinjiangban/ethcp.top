'use client'
import { useAccount, useWriteContract, useSwitchChain } from 'wagmi'
import { useState } from 'react'
import contractABI from './ETHCP-NFT.json'

const BASE_SEPOLIA_CHAIN_ID = 84532 // baseSepolia 测试网 chainId
const CONTRACT_ADDRESS = '0x8CABdCeE9eE595Fc2133037C341E2DDD006138e0'
const TOKEN_URI = 'ipfs://bafkreidnh4n72dykxikszwonfrwm4rufguwzo5vopkotvb63jgfxbls75u'

export default function Page() {
  const { isConnected, address, chainId } = useAccount()
  const { switchChainAsync } = useSwitchChain()
  const { writeContractAsync, isPending } = useWriteContract()
  const [status, setStatus] = useState<string | null>(null)

  const handleMint = async () => {
    setStatus(null)
    try {
      if (chainId !== BASE_SEPOLIA_CHAIN_ID) {
        await switchChainAsync({ chainId: BASE_SEPOLIA_CHAIN_ID })
      }
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: 'safeMint',
        args: [address, TOKEN_URI],
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