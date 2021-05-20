import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'

import { depositSellPublic } from 'utils/callHelpers'
import { useSellPubliContract } from './useContract'

const useDepositSellPublic = (amount) => {
  const { account } = useWeb3React()
  const sellPubliContract = useSellPubliContract()
  const handleDepositSellPublic = useCallback(async () => {
    try {
      const txHash = await depositSellPublic(amount, sellPubliContract, account)
      return txHash
    } catch (e) {
      return false
    }
  }, [account, sellPubliContract, amount])

  return { onDepositSellPublic: handleDepositSellPublic }
}
export default useDepositSellPublic
