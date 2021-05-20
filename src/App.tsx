import React, { lazy } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { ResetCSS } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import GlobalStyle from './style/Global'
import history from './routerHistory'
import Login from "./views/Sell/components/Forms";
import Projects from "./views/Sell/components/Projects/index"
import Detail from "./views/Sell/components/Detail/index"
// 
// This - configs is requireds for number formatings
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})
const listRoute = ['/docs', '/faq', '/introduction', '/tokenomics', '/roadmap', '/Analytics', '/use-MetaMask'
  , '/Communities', '/start-pools', '/BSCSwap-Exchange', '/frontend-software-engineer', '/solidity-engineer', '/technical-writer'
  , '/senior-qa-engineer', '/ux-ui-designer', '/add-Liquidity-trustwallet', '/add-Liquidity-metamask', '/remove-liquidity', '/artworks-upload', '/']
const App: React.FC = () => {
  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={() => <iframe width="100%" height="100%" src="/home.html" title="home" />} />
        {/* <Route path="/" exact>
         <Pools />
        </Route> */}

        <Route path="/buy-token" component={() => <Login />} />
        <Route exact strict path="/projects" component={() => <Projects />} />
        {/* <Route exact strict path="/detail" component={() => <Detail />} /> */}
        <Route exact strict path="/projects/:id" component={Detail} />

        {listRoute.map((item) => (
          <Route
            key={item}
            path={`${item}`}
            component={() => <iframe width="100%" height="100%" src={`${item}.html`} title={item} />}
          />
        ))}

        

        <Route
          path="*"
          component={() => {
            return <iframe src="/404.html" title="404" />
          }}
        />
      </Switch>
    </Router>
  )
}

export default React.memo(App)
