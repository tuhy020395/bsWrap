import { configureStore } from '@reduxjs/toolkit'

import blockReducer from './block'

export default configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    block: blockReducer,
  },
})
