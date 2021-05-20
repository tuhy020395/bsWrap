import { createStore, createHook, createContainer, createSubscriber } from 'react-sweet-state'
import { getClassWithDraw, formatNumber } from './utils'
import { addressAdminRefer, Status, listMilestone, listPercent } from './constants'

const stateDefault = {
  infoAccount: {
    addressAccount: '',
    totalETHDeposit: 0,
    totalJUS: 0,
    toalJUSBlock: 0,
    totalRefer: 0,
    referLevel: 0,
    totalJUSBlock: 0,
    addressRefer: addressAdminRefer,
  },
  totalETHDefault: 0,
  totalETH: null,
  amountETH: null,
  currentPriceJus: 0,
  listOrder: [],
  paging: {
    total: 0,
    index: 0,
  },
  transactionsPending: [],
  order: {},
  objCol: {},
  copied: false,
  valueAcc:'',
  iconCoppy:'../img/icons/social/coppied.png'
}
const Store = createStore({
  initialState: { ...stateDefault },
  actions: {
    changeMaxInput: () => ({ setState, getState }) => {
      const estimates =0;
      setState({
        amountETH: (getState().totalETHDefault - estimates).toFixed(8),
        totalETH: 0,
      })
    },
    updateTotalETH: (amount) => ({ setState }) => {
      console.log('format',formatNumber(amount))
      setState({
        totalETH: formatNumber(amount),
        totalETHDefault: formatNumber(amount),
      })
    },
    changeInput: (e, isMax) => ({ setState, getState }) => {
      let amount= e.target.value;
      if(amount && parseFloat(amount)>0){
        amount =parseFloat(amount);
      }
      if (parseFloat(amount) > parseFloat(getState().totalETHDefault)) {
        setState({
          amountETH: 0,
          totalETH: getState().totalETHDefault,
        })
      } else if (amount > 0) {
        setState({
          amountETH: amount,
          totalETH: (getState().totalETHDefault - amount).toFixed(8),
        })
      } else {
        setState({
          amountETH: amount,
          totalETH: getState().totalETHDefault,
        })
      }
    },
  },
  name: 'Sale Store',
})
export const useHookSale = createHook(Store)
export const Container = createContainer(Store, {
  onInit: () => ({ setState }, props) => {
    setState({ ...props })
  },
})
export const Subscriber = createSubscriber(Store)
