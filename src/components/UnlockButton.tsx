import React from 'react'
import { Button, useWalletModal } from '@pancakeswap-libs/uikit'
import useAuth from 'hooks/useAuth'

const UnlockButton = (props:any) => {
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)
  // test
  return (
    <Button className="navbar-btn btn btn-sm btn-primary lift ml-auto unlockwallet" onClick={onPresentConnectModal} {...props}>
      Unlock Wallet
    </Button>
  )
}

export default UnlockButton
