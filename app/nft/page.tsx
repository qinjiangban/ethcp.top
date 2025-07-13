'use client'
// 导入 wagmi 钩子用于钱包连接、合约交互、链切换、Gas估算等
import { useAccount, useWriteContract, useSwitchChain, useEstimateGas, useGasPrice } from 'wagmi'
// 导入 React 钩子
import { useEffect, useState } from 'react'
// 导入智能合约 ABI
import contractABI from './ETHCP-NFT.json'
// 导入 viem 工具函数用于格式化以太币单位
import { formatEther } from 'viem'
// 导入 Farcaster miniapp SDK
import { sdk } from '@farcaster/miniapp-sdk'

// Base 链的链 ID
const BASE_CHAIN_ID = 8453
// NFT 合约地址
const CONTRACT_ADDRESS = '0x18b3337b19c8dc5d27dc5b01068a79654b1b32ac'
// NFT 元数据 IPFS 地址
const METADATA_URL = 'https://gateway.pinata.cloud/ipfs/bafkreidnh4n72dykxikszwonfrwm4rufguwzo5vopkotvb63jgfxbls75u'



export default function Page() {
  // 获取钱包连接状态、地址和当前链 ID
  const { isConnected, address, chainId } = useAccount()
  // 获取链切换功能
  const { switchChainAsync } = useSwitchChain()
  // 获取合约写入功能和待处理状态
  const { writeContractAsync, isPending } = useWriteContract()
  // 交易状态信息
  const [status, setStatus] = useState<string | null>(null)
  // 交易哈希
  const [txHash, setTxHash] = useState<string | null>(null)
  // NFT 元数据
  const [metadata, setMetadata] = useState<{ name: string; description: string; image: string } | null>(null)

  // Mint 费用：0.00002 ETH（以 wei 为单位）
  const MINT_FEE = BigInt('20000000000000')
  // Gas 估算错误状态
  const [gasEstimationError, setGasEstimationError] = useState(false)
  // Gas 估算超时状态
  const [gasEstimationTimeout, setGasEstimationTimeout] = useState(false)

  // Gas 估算：使用合约调用数据进行准确估算
  const { data: gasEstimate, error: gasError, isLoading: gasLoading } = useEstimateGas({
    to: CONTRACT_ADDRESS,
    data: '0x', // 简化估算
    value: MINT_FEE,
    account: address,
    query: {
      enabled: !!address && chainId === BASE_CHAIN_ID, // 仅在钱包连接且在正确链上时启用
      retry: 2, // 重试 2 次
      retryDelay: 1000, // 重试延迟 1 秒
    }
  })

  // 获取当前 Gas 价格
  const { data: gasPrice, error: gasPriceError } = useGasPrice({
    query: {
      enabled: chainId === BASE_CHAIN_ID, // 仅在正确链上时启用
      retry: 2, // 重试 2 次
    }
  })

  // Base 链的备用 Gas 估算值
  const FALLBACK_GAS_LIMIT = BigInt('100000') // NFT mint 的保守估算
  const FALLBACK_GAS_PRICE = BigInt('10000000') // 1 gwei
  const fallbackGasCost = FALLBACK_GAS_LIMIT * FALLBACK_GAS_PRICE

  // 计算预估的 Gas 费用
  const estimatedGasCost = gasEstimate && gasPrice ? gasEstimate * gasPrice : null

  // Gas 估算超时机制
  useEffect(() => {
    const timer = setTimeout(() => {
      if (gasLoading && !gasEstimate && !gasError) {
        setGasEstimationTimeout(true)
      }
    }, 5000) // 5 秒超时

    return () => clearTimeout(timer)
  }, [gasLoading, gasEstimate, gasError])

  // 处理 Gas 估算错误
  useEffect(() => {
    if (gasError || gasPriceError) {
      setGasEstimationError(true)
    }
  }, [gasError, gasPriceError])

  // 获取 NFT 元数据
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

  // 处理交易哈希链接点击
  const handleTxHashClick = async (e: React.MouseEvent, txHash: string) => {
    e.preventDefault()
    const url = `https://basescan.org/tx/${txHash}`
    try {
      await sdk.actions.openUrl(url)
    } catch (error) {
      // 如果 miniapp SDK 失败，回退到传统方式
      console.error('Failed to open URL with miniapp SDK:', error)
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }
  // 处理 NFT Mint 操作
  const handleMint = async () => {
    setStatus(null)
    setTxHash(null)
    try {
      // 如果不在正确的链上，先切换到 Base 链
      if (chainId !== BASE_CHAIN_ID) {
        await switchChainAsync({ chainId: BASE_CHAIN_ID })
      }
      // 调用合约的 safeMint 函数
      const tx = await writeContractAsync({
        chainId: BASE_CHAIN_ID,
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: 'safeMint',
        args: [address, METADATA_URL], // 传入接收地址和元数据 URL
        value: MINT_FEE, // 支付 0.00002 ETH
      })
      setStatus('Mint successful!')
      setTxHash(tx)
    } catch (e: any) {
      setStatus('Mint failed: ' + (e?.shortMessage || e?.message || 'Unknown error'))
    }
  }

  // 如果钱包未连接，显示提示信息
  if (!isConnected) {
    return <div>Please connect your wallet first</div>
  }

  return (
    <div className="flex flex-col items-center lg:min-h-screen">
      {/* NFT 卡片容器 */}
      <div className="card bg-base-100 sm:w-5/6 md:w-96 shadow-sm m-2 sm:m-8">
        {/* NFT 图片 */}
        <figure>
          <img
            src={metadata?.image}
            alt={metadata?.name} />
        </figure>

        <div className="card-body">
          {/* NFT 标题和描述 */}
          <h2 className="card-title">{metadata?.name}</h2>
          <p>{metadata?.description}</p>

          {/* 交易费用信息 */}
          <div className="bg-base-200 p-4 rounded-lg mb-4">
            <h3 className="font-semibold mb-2">Transaction Cost Information</h3>
            <div className="space-y-1 text-sm">
              {/* Mint 费用显示 */}
              <div className="flex justify-between">
                <span>Mint Fee:</span>
                <span className="font-mono">{formatEther(MINT_FEE)} ETH</span>
              </div>
              {/* 根据 Gas 估算状态显示不同内容 */}
              {estimatedGasCost ? (
                <>
                  {/* 成功获取 Gas 估算 */}
                  <div className="flex justify-between">
                    <span>Estimated Gas Fee:</span>
                    <span className="font-mono">{formatEther(estimatedGasCost)} ETH</span>
                  </div>
                  <div className="flex justify-between border-t pt-1 font-semibold">
                    <span>Total Cost:</span>
                    <span className="font-mono">{formatEther(MINT_FEE + estimatedGasCost)} ETH</span>
                  </div>
                </>
              ) : gasEstimationError || gasEstimationTimeout ? (
                <>
                  {/* Gas 估算失败或超时，使用备用值 */}
                  <div className="flex justify-between">
                    <span>Estimated Gas Fee:</span>
                    <span className="font-mono text-orange-600">~{formatEther(fallbackGasCost)} ETH</span>
                  </div>
                  <div className="flex justify-between border-t pt-1 font-semibold">
                    <span>Total Cost (Estimated):</span>
                    <span className="font-mono">~{formatEther(MINT_FEE + fallbackGasCost)} ETH</span>
                  </div>
                  <div className="text-xs text-orange-600 mt-1">
                    {gasEstimationTimeout ? 'Gas estimation timeout, using estimated value' : 'Gas estimation failed, using estimated value'}
                  </div>
                </>
              ) : (
                <div className="text-gray-500">Estimating Gas fee...</div>
              )}
            </div>
          </div>

          {/* Mint 按钮 */}
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

      {/* 状态信息显示 */}
      {status && <div className="text-sm">{status}</div>}
      {/* 交易哈希链接 */}
      {txHash && (
        <div className="text-sm">
          Transaction Hash: <a 
            href={`https://basescan.org/tx/${txHash}`} 
            onClick={(e) => handleTxHashClick(e, txHash)}
            className="text-green-500 underline cursor-pointer"
          >
            {txHash} ↗
          </a>
        </div>
      )}

    </div>
  )
}