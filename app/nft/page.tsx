'use client'
import { useAccount, useWriteContract, useSwitchChain } from 'wagmi'
import { useEffect, useState } from 'react'
import contractABI from './ETHCP-NFT.json'

const BASE_SEPOLIA_CHAIN_ID = 84532 // baseSepolia testnet chainId
const CONTRACT_ADDRESS = '0x8CABdCeE9eE595Fc2133037C341E2DDD006138e0'
const TOKEN_URI = 'ipfs://bafkreidnh4n72dykxikszwonfrwm4rufguwzo5vopkotvb63jgfxbls75u'
const METADATA_URL = 'https://gateway.pinata.cloud/ipfs/bafkreidnh4n72dykxikszwonfrwm4rufguwzo5vopkotvb63jgfxbls75u'



export default function Page() {
  const { isConnected, address, chainId } = useAccount()
  const { switchChainAsync } = useSwitchChain()
  const { writeContractAsync, isPending } = useWriteContract()
  const [status, setStatus] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<{ name: string; description: string; image: string } | null>(null)

  useEffect(() => {
    async function fetchMetadata() {
      try {
        const res = await fetch(METADATA_URL)
        const data = await res.json()
        setMetadata(data)
      } catch (error) {
        console.error('Failed to fetch metadata', error)
      }
    }
    fetchMetadata()
  }, [])
  const handleMint = async () => {
    setStatus(null)
    setTxHash(null)
    try {
      if (chainId !== BASE_SEPOLIA_CHAIN_ID) {
        await switchChainAsync({ chainId: BASE_SEPOLIA_CHAIN_ID })
      }
      const tx = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: 'safeMint',
        args: [address, TOKEN_URI],
      })
      setStatus('Mint successful!')
      setTxHash(tx)
    } catch (e: any) {
      setStatus('Mint failed: ' + (e?.shortMessage || e?.message || 'Unknown error'))
    }
  }

  if (!isConnected) {
    return <div>Please connect your wallet first</div>
  }

  return (
    <div className="flex flex-col items-center lg:min-h-screen">



      <div className="card bg-base-100 sm:w-5/6 md:w-96 shadow-sm m-2 sm:m-8">

        <figure>
          <img
            src={metadata?.image}
            alt={metadata?.name} />
        </figure>

        <div className="card-body">
          <h2 className="card-title">{metadata?.name} NFT</h2>
          <p>{metadata?.description}</p>

          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              disabled={isPending}
              onClick={handleMint}
            >
              {isPending ? 'Minting...' : 'Mint NFT'}
            </button>
          </div>
        </div>

      </div>

        {status && <div className="text-sm">{status}</div>}
        {txHash && (
          <div className="text-sm">
            Transaction Hash: <a href={`https://base-sepolia.blockscout.com//tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="text-green-500 underline">{txHash} ↗</a>
          </div>
        )}

    </div>
  )
}