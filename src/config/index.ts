import BigNumber from "bignumber.js/bignumber";

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

export const CAKE_PER_BLOCK = new BigNumber(40);
export const BLOCKS_PER_YEAR = new BigNumber(10512000);
export const BSC_BLOCK_TIME = 3;
export const CAKE_POOL_PID = 1;
export const BASE_URL = "https://pancakeswap.finance";
export const BASE_EXCHANGE_URL = "https://exchange.pancakeswap.finance";
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/#/add`;
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}/#/pool`;
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 50;
export const LOTTERY_TICKET_PRICE = 1;

export const LIST_POOL_IDO = {
  zkchaos: {
    pool: "0xed3d91d67adc3f2e265ac0f327c049be9aad7d58",
  },
};

// PROD : "0xe9e7cea3dedca5984780bafc599bd69add087d56";
// TEST : "0x2861cdDf4631c53c062Be728BFD4C4EFD36F0887";
export const BUSD_TOKEN = "0x2861cdDf4631c53c062Be728BFD4C4EFD36F0887" 
export const API_NFT = "https://nftapi.bscstation.org/api/"
export const ADDRESS_RECEVIE_BUSD = "0xDCC08b2c52023081b9F7e9c3dc22B16AD6EE7809"


