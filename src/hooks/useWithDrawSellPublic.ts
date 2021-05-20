import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'

import { withDrawSellPublic } from 'utils/callHelpers'
import { useSellPubliContract } from './useContract'

const useWithDrawSellPublic = (orderId) => {
  const { account } = useWeb3React()
  const sellPubliContract = useSellPubliContract()

  const handleWithDrawSellPublic = useCallback(async () => {
    try {
      const txHash = await withDrawSellPublic(orderId, sellPubliContract, account)
      return txHash
    } catch (e) {
      return false
    }
  }, [account, sellPubliContract, orderId])

  return { onWithDrawSellPublic: handleWithDrawSellPublic }
}
export default useWithDrawSellPublic
