'use client'
import { AddressTruncate } from '@/utils/AddressTruncate'
import { useAccount, useConnect, useDisconnect, useEnsName, useConfig } from 'wagmi'

export default function ConnectMenu() {
  const { isConnected, address, chainId } = useAccount()
  const { connect, connectors, } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const config = useConfig()
  const chains = config.chains

  if (isConnected) {
    return (
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-primary">
          {ensName ? ensName : AddressTruncate(address)}
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          {chains.map(chain => (
            <li key={chain.id}>
              <button
                type="button"
                className={`justify-between ${chainId === chain.id ? 'bg-primary text-white font-bold' : ''}`}
                disabled={chainId === chain.id}
                onClick={async () => {
                  if (window.ethereum && chainId !== chain.id) {
                    try {
                      await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: `0x${chain.id.toString(16)}` }],
                      });
                    } catch (switchError) {
                      // 可选：处理错误
                    }
                  }
                }}
              >
                {chain.name}
              </button>
            </li>
          ))}
          <li>
            <a className='my-4 hover:bg-error'>
              <button  type="button" onClick={() => disconnect()}>Disconnect</button>
            </a>
          </li>
        </ul>
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