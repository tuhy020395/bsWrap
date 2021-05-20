import axios from "axios";
import {
  createStore,
  createHook,
  createContainer,
  createSubscriber,
} from "react-sweet-state";
import { API_NFT } from "config";

const StoreDetail = createStore({
  initialState: {
    objData: {},
    active: 1,
    classTb1: "nav-link  ripple ripple-surface-info active",
    classTb2: "nav-link  ripple ripple-surface-info",
    classTb3: "nav-link  ripple ripple-surface-info",
    listAllocations: [],
    objJoin: {
      busd: 0,
      isJionPool: false,
    },
    yourAllocations: 0,
  },
  actions: {
    addJoinPool: (obj) => ({ getState, setState }) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${API_NFT}Ido/join_pool`, {
            ido_Id: parseInt(obj.id),
            ownerAddress: obj.account,
            balance: obj.amount,
            txnhash: obj.blockHash,
          })
          .then((res) => {
            const { data } = res.data;
            setState({ objJoin: { ...getState().objJoin, isJionPool: false } }); // TODO
            resolve(data);
          });
      });
    },
    checkJoinPool: (obj) => ({ getState, setState }) => {
      return new Promise((resolve, reject) => {
        axios.post(`${API_NFT}Ido/pool_weight_by_address`, obj).then((res) => {
          const { data } = res.data;
          if (data) {
            setState({ objJoin: data }); // TODO
            resolve(data);
          }
        });
      });
    },
    getProjectDetail: (id) => ({ getState, setState }) => {
      return new Promise((resolve, reject) => {
        axios(`${API_NFT}Ido/${id}`).then((res) => {
          const { data } = res.data;
          setState({ objData: { ...data } }); // TODO
          // resolve(data)
        });
      });
    },
    getYourAllocations: (obj) => ({ getState, setState }) => {
      return new Promise((resolve, reject) => {
        axios.post(`${API_NFT}Ido/your_allocations`, obj).then((res) => {
          const { data } = res.data;
          setState({ yourAllocations: (data && data[0] && data[0].token) || 0 });
          resolve(data);
        });
      });
    },
    activeTable1: () => ({ getState, setState }) => {
      setState({
        active: 1,
        classTb1: "nav-link  ripple ripple-surface-info active",
        classTb2: "nav-link  ripple ripple-surface-info",
        classTb3: "nav-link  ripple ripple-surface-info",
      });
    },
    activeTable2: () => ({ getState, setState }) => {
      setState({
        active: 2,
        classTb2: "nav-link  ripple ripple-surface-info active",
        classTb1: "nav-link  ripple ripple-surface-info",
        classTb3: "nav-link  ripple ripple-surface-info",
      });
    },
    activeTable3: () => ({ getState, setState }) => {
      setState({
        active: 3,
        classTb3: "nav-link  ripple ripple-surface-info active",
        classTb2: "nav-link  ripple ripple-surface-info",
        classTb1: "nav-link  ripple ripple-surface-info",
      });
    },
    // getYourAllocations:()=>({getState, setState})=>{
    //   return new Promise((resolve, reject) => {
    //     axios.post(`https://nftapi.bscstation.org/api/Ido/your_allocations`,{}).then((res) => {
    //       let { data } = res.data
    //       data = data.map((item, i) => {
    //         return item
    //       })
    //       setState({ listAllocations: data })
    //     }, [])
    //    })
    // }
  },
  name: "Detail Store",
});

export const useHookDetail = createHook(StoreDetail);
export const Container = createContainer(StoreDetail, {
  onInit: () => ({ setState }, props) => {
    setState({ ...props });
  },
});
export const Subscriber = createSubscriber(StoreDetail);
