import axios from 'axios'
import { createStore, createHook, createContainer, createSubscriber } from 'react-sweet-state'
// import { API_IDO } from '../../constants'


const StoreProjects = createStore({
  initialState: {
    idoList: []
   },
  actions: {
    getProject: () => ({ getState, setState }) => {   
       return new Promise((resolve, reject) => {
        axios.post(`https://nftapi.bscstation.org/api/Ido/get_idos`, {}).then((res) => {         
          let { data } = res.data
          data = data.map((item, i) => {
            return item
          })
          setState({ idoList: data })
          resolve(data)
        })
       }) 
    },
  },
  name: 'Projects Store',
})

export const useHookProjects = createHook(StoreProjects)
export const Container = createContainer(StoreProjects, {
  onInit: () => ({ setState }, props) => {
    setState({ ...props })
  },
})
export const Subscriber = createSubscriber(StoreProjects)
