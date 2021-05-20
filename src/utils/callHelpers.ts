import BigNumber from "bignumber.js";
import { ethers } from "ethers";

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account });
};

export const depositSellPublic = async (
  amount,
  sellPublicContract,
  account
) => {
  const amountTemp = new BigNumber(amount)
    .times(new BigNumber(10).pow(18))
    .toString();
  const gas = await sellPublicContract.methods
    .deposit()
    .estimateGas({ from: account, value: amountTemp });
  return sellPublicContract.methods
    .deposit()
    .send({ from: account, gas, value: amountTemp })
    .on("transactionHash", (tx) => {
      console.log("tx>>", tx);
      return tx.transactionHash;
    });
};

export const withDrawSellPublic = async (
  orderId,
  sellPublicContract,
  account
) => {
  return sellPublicContract.methods
    .withDraw(orderId)
    .send({ from: account })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
};

export const claim = async (idoContract, amount, account) => {
  console.log("idoContract>>", idoContract, amount, account);
  const amountTemp = new BigNumber(amount)
    .times(new BigNumber(10).pow(18))
    .toString();

  const gas = await idoContract.methods
    .claim(amountTemp)
    .estimateGas({ from: account });
  console.log("gas>>", gas);
  return idoContract.methods.claim(amountTemp).send({ from: account, gas });
};
