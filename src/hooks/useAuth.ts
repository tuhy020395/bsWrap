import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { ConnectorNames } from '@pancakeswap-libs/uikit'
import { connectorsByName } from 'utils/web3React'
import { setupNetwork } from 'utils/wallet'

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()

  const login = useCallback((connectorID: ConnectorNames) => {
    const connector = connectorsByName[connectorID]
    if (connector) {
      activate(connector, async (error: Error) => {
        if (error instanceof UnsupportedChainIdError) {
          const hasSetup = await setupNetwork()
          if (hasSetup) {
            activate(connector)
          }
        }
      })
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { login, logout: deactivate }
}

export default useAuth
