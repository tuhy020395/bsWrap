import Web3 from "web3";
import { AbiItem } from "web3-utils";
import web3NoAccount from "utils/web3";

// Addresses
import { getSellPublicAddress } from "utils/addressHelpers";

import bep20Abi from "config/abi/erc20.json";
import sellPublic from "config/abi/sellPublic.json";
import abiZK from "config/abi/abiZK.json";

export const getContract = (abi: any, address: string, web3?: Web3) => {
  const _web3 = web3 ?? web3NoAccount;
  return new _web3.eth.Contract((abi as unknown) as AbiItem, address, {
    from: "0xB4e33AD321A173ce89067904e77413c862Bf41B6",
  });
};

export const getBep20Contract = (address: string, web3?: Web3) => {
  return getContract(bep20Abi, address, web3);
};
export const getSellPubliContract = (web3?: Web3) => {
  return getContract(sellPublic, getSellPublicAddress(), web3);
};
export const getIDOContract = (web3?: Web3) => {
  return getContract(abiZK, "0xed3d91d67adc3f2e265ac0f327c049be9aad7d58", web3);
};
