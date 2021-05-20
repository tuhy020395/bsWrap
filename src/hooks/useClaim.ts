import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";

import { claim } from "utils/callHelpers";
import { useIDOContract } from "./useContract";

const useClaim = (amount) => {
  const { account } = useWeb3React();
  const idoContract = useIDOContract();

  const handleClaim = useCallback(async () => {
    try {
      const txHash = await claim(idoContract, amount, account);
      return txHash;
    } catch (e) {
      return false;
    }
  }, [account, idoContract, amount]);

  return { onClaim: handleClaim };
};
export default useClaim;
