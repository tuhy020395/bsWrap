import React from 'react'
import { ModalProvider } from '@pancakeswap-libs/uikit'
import { Web3ReactProvider } from '@web3-react/core'
import { Provider } from 'react-redux'
import { getLibrary } from 'utils/web3React'
import { ThemeContextProvider } from 'contexts/ThemeContext'
// import { RefreshContextProvider } from 'contexts/RefreshContext'
import store from 'state'

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ThemeContextProvider>
            {/* <RefreshContextProvider> */}
              <ModalProvider>{children}</ModalProvider>
            {/* </RefreshContextProvider> */}
        </ThemeContextProvider>
      </Provider>
    </Web3ReactProvider>
  )
}

export default Providers
