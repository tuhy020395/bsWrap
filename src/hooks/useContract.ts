import { useMemo } from "react";
import { Contract } from "@ethersproject/contracts";

import useWeb3 from "hooks/useWeb3";
import abiZK from "config/abi/abiZK.json";
import abiBUSD from "config/abi/abiBUSD.json";
import {
  getBep20Contract,
  getSellPubliContract,
  getContract,
  getIDOContract,
} from "utils/contractHelpers";

function useContract(address: string | undefined, ABI: any): any {
  return useMemo(() => {
    try {
      return getContract(ABI, address);
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI]);
}

export const useERC20 = (address: string) => {
  const web3 = useWeb3();
  return useMemo(() => getBep20Contract(address, web3), [address, web3]);
};

export const useSellPubliContract = () => {
  const web3 = useWeb3();
  return useMemo(() => getSellPubliContract(web3), [web3]);
};

export function useIDOContract(): any {
  const web3 = useWeb3();
  return useMemo(() => getIDOContract(web3), [web3]);
}

export function useBUSDContract(address): any {
  return useContract(address, abiBUSD);
}
