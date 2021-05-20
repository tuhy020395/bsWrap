import web3 from "web3";
import BigNumber from "bignumber.js";

const convertNumber = (value) => {
  return web3.utils.toHex(web3.utils.toWei(value, "ether"));
};

export const _joinPool = async (busdContract, to, amount, account) => {
  try {
    const amountTemp = new BigNumber(amount)
      .times(new BigNumber(10).pow(18))
      .toString();
    const args = [to, amountTemp];

    const gas = await busdContract.methods
      .transfer(...args)
      .estimateGas({ from: account });

    return busdContract.methods
      .transfer(to, amountTemp)
      .send({ from: account, gasLimit: gas });
  } catch (error) {
    return error;
  }
};

export const _withDrawToken = async (poolContract, amount, account) => {
  const amountTemp = new BigNumber(amount)
    .times(new BigNumber(10).pow(18))
    .toString();

  const args = [amountTemp];

  const gas = await poolContract.methods
    .claim(...args)
    .estimateGas({ from: account });
  return poolContract.methods.claim(amountTemp).send({ gas, from: account });
};
export const _isClaim = async (poolContract, account) => {
  return poolContract.methods.users(account).call();
};
