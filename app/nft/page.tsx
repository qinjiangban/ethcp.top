'use client'
import { useAccount, useWriteContract, useSwitchChain, useEstimateGas, useGasPrice } from 'wagmi'
import { useEffect, useState } from 'react'
import contractABI from './ETHCP-NFT.json'
import { formatEther } from 'viem'

const BASE_CHAIN_ID = 8453 // base chainId
const CONTRACT_ADDRESS = '0x18b3337b19c8dc5d27dc5b01068a79654b1b32ac'
const METADATA_URL = 'https://gateway.pinata.cloud/ipfs/bafkreidnh4n72dykxikszwonfrwm4rufguwzo5vopkotvb63jgfxbls75u'



export default function Page() {
  const { isConnected, address, chainId } = useAccount()
  const { switchChainAsync } = useSwitchChain()
  const { writeContractAsync, isPending } = useWriteContract()
  const [status, setStatus] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<{ name: string; description: string; image: string } | null>(null)
  
  const MINT_FEE = BigInt('20000000000000') // 0.00002 ETH in wei
  const [gasEstimationError, setGasEstimationError] = useState(false)
  const [gasEstimationTimeout, setGasEstimationTimeout] = useState(false)
  
  // Gas estimation with proper contract call data
  const { data: gasEstimate, error: gasError, isLoading: gasLoading } = useEstimateGas({
    to: CONTRACT_ADDRESS,
    data: '0x', // Simplified estimation
    value: MINT_FEE,
    account: address,
    query: {
      enabled: !!address && chainId === BASE_CHAIN_ID,
      retry: 2,
      retryDelay: 1000,
    }
  })
  
  const { data: gasPrice, error: gasPriceError } = useGasPrice({
    query: {
      enabled: chainId === BASE_CHAIN_ID,
      retry: 2,
    }
  })
  
  // Fallback gas estimates for Base Sepolia testnet
  const FALLBACK_GAS_LIMIT = BigInt('100000') // Conservative estimate for NFT mint
  const FALLBACK_GAS_PRICE = BigInt('10000000') // 1 gwei
  const fallbackGasCost = FALLBACK_GAS_LIMIT * FALLBACK_GAS_PRICE
  
  const estimatedGasCost = gasEstimate && gasPrice ? gasEstimate * gasPrice : null
  
  // Timeout mechanism for gas estimation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (gasLoading && !gasEstimate && !gasError) {
        setGasEstimationTimeout(true)
      }
    }, 5000) // 5 second timeout
    
    return () => clearTimeout(timer)
  }, [gasLoading, gasEstimate, gasError])
  
  // Handle gas estimation errors
  useEffect(() => {
    if (gasError || gasPriceError) {
      setGasEstimationError(true)
    }
  }, [gasError, gasPriceError])

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
      if (chainId !== BASE_CHAIN_ID) {
        await switchChainAsync({ chainId: BASE_CHAIN_ID })
      }
      const tx = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: 'safeMint',
        args: [address, METADATA_URL],
        value: MINT_FEE, // 0.00002 ETH in wei
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
          
          {/* Cost Information */}
          <div className="bg-base-200 p-4 rounded-lg mb-4">
            <h3 className="font-semibold mb-2">交易费用信息</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Mint 费用:</span>
                <span className="font-mono">{formatEther(MINT_FEE)} ETH</span>
              </div>
              {estimatedGasCost ? (
                <>
                  <div className="flex justify-between">
                    <span>预估 Gas 费用:</span>
                    <span className="font-mono">{formatEther(estimatedGasCost)} ETH</span>
                  </div>
                  <div className="flex justify-between border-t pt-1 font-semibold">
                    <span>总费用:</span>
                    <span className="font-mono">{formatEther(MINT_FEE + estimatedGasCost)} ETH</span>
                  </div>
                </>
              ) : gasEstimationError || gasEstimationTimeout ? (
                <>
                  <div className="flex justify-between">
                    <span>预估 Gas 费用:</span>
                    <span className="font-mono text-orange-600">~{formatEther(fallbackGasCost)} ETH</span>
                  </div>
                  <div className="flex justify-between border-t pt-1 font-semibold">
                    <span>总费用 (预估):</span>
                    <span className="font-mono">~{formatEther(MINT_FEE + fallbackGasCost)} ETH</span>
                  </div>
                  <div className="text-xs text-orange-600 mt-1">
                    {gasEstimationTimeout ? 'Gas估算超时，使用预估值' : 'Gas估算失败，使用预估值'}
                  </div>
                </>
              ) : (
                <div className="text-gray-500">正在估算 Gas 费用...</div>
              )}
            </div>
          </div>

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
            Transaction Hash: <a href={`https://basescan.org/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="text-green-500 underline">{txHash} ↗</a>
          </div>
        )}

    </div>
  )
}