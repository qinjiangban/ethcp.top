'use client'
import { useAccount, useConnect, useEnsName } from 'wagmi'

export default function ConnectMenu() {
  const { isConnected, address } = useAccount()
  const { connect, connectors } = useConnect()
  const { data: ensName } = useEnsName({ address })


  if (isConnected) {
    return (
      <>
        <div>已连接！</div>
        <div>
          用户身份: { ensName || address}
        </div>
      </>
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