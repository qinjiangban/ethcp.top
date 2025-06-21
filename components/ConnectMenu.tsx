'use client'
import { AddressTruncate } from '@/utils/AddressTruncate'
import { useAccount, useConnect, useEnsName } from 'wagmi'

export default function ConnectMenu() {
  const { isConnected, address } = useAccount()
  const { connect, connectors } = useConnect()
  const { data: ensName } = useEnsName({ address })


  if (isConnected) {
    return (
      <div className='btn btn-ghost'>
        {ensName || AddressTruncate(address as `0x${string}`)}
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => connect({ connector: connectors[0] })}
      className='btn btn-primary'
    >
      Connect
    </button>
  )
}