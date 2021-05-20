/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useCallback, useEffect } from "react";
import "../../index.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

import moment from "moment";
import { useWeb3React } from "@web3-react/core";
import UnlockButton from "components/UnlockButton";
import useDepositSellPublic from "hooks/useDepositSellPublic";
import useWithDrawSellPublic from "hooks/useWithDrawSellPublic";
import { useCurrentBalance, useGetInfo } from "hooks/useSellHelpers";
import { getBalanceNumber } from "utils/formatBalance";
import { isMobile } from "react-device-detect";
import { useHookSale } from "../../Store";

/* eslint-disable react/button-has-type */
const Header = () => {
  const [state, actions] = useHookSale();
  const [pendingtx, setPendingTx] = useState(false);

  const [orderId, setOrderId] = useState(-1);

  const { totalETH, listOrder, amountETH, currentPriceJus } = state;

  const { account } = useWeb3React();
  const { onDepositSellPublic } = useDepositSellPublic(amountETH);
  const { onWithDrawSellPublic } = useWithDrawSellPublic(orderId);

  const isWithDraw = (nextMonth, blockTimestamp) =>
    parseInt(blockTimestamp) >= parseInt(nextMonth);

  const handleDeposit = useCallback(async () => {
    setPendingTx(true);
    try {
      const txHash = await onDepositSellPublic();
      console.log("handleDeposit", txHash);
      if (txHash) {
        setPendingTx(false);
      }
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false);
    }
  }, [onDepositSellPublic, setPendingTx]);

  const handleWithDraw = useCallback(async () => {
    try {
      await onWithDrawSellPublic();
    } catch (e) {
      console.error(e);
    }
  }, [onWithDrawSellPublic]);

  const balance = useCurrentBalance();
  const {
    percentBNBDeposit,
    totalBNBDeposit,
    blockTimestamp,
    info,
    orders,
  }: any = useGetInfo();
  useEffect(() => {
    document.body.className = "";

    actions.updateTotalETH(balance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);

  const _handleWithDraw = async (order) => {
    if (isWithDraw(order.nextMonth, blockTimestamp)) {
      setOrderId(order.id);
      await handleWithDraw();
    }
  };
  let addressWallet = "";

  console.log("account: ", account);

  if (account) {
    const addressWallet1 = account.slice(0, 5);
    const addressWallet2 = account.substr(-5);
    addressWallet = addressWallet1.concat("...", addressWallet2);
  }

  const [isCopied, setIsCopied] = useState(false);

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  // const onCopy = () => {
  //   state.copied = true
  // }
  const onClick = () => {
    state.valueAcc = account
    // state.copied = !state.copied

    // if(state.copied){
    //   state.iconCoppy="../img/icons/social/copy.png"
    // }else{
    //   state.iconCoppy="../img/icons/social/coppied.png"
    // }

  }


  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        {/* Brand */}
        <a className="navbar-brand" href="/">
          <img
            src="/img/logo-dark.png?v=0.1"
            height="40px"
            className="navbar-brand-img-buytoken"
            alt="..."
          />
        </a>
        {/* Toggler */}
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Collapse */}
        <div className="navbar-collapse collapse" id="navbarCollapse">
          {/* Toggler */}
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fe fe-x" />
          </button>
          {/* Navigation */}
          {/* Button */}
          {account ? (
            <>
              <a
                className="navbar-btn btn btn-sm btn-primary lift ml-auto"
                href="/"
              >
                {isMobile ? "" : addressWallet}
           
              </a>
              <CopyToClipboard
                text={account}
                onCopy={onCopyText}
                >                
                <div>
                
                  <button className="btn-coppy"> <img src={state.iconCoppy}
                    className="list-social-icon-coppy" alt="..." />
                    {isCopied ? (
                    <span style={{"color":"rgb(241 185 12)"}}>Copied!</span>
                  ):
                  '' } 
                  </button>
                            
                </div>

              </CopyToClipboard>

            </>
          ) : (
            <UnlockButton />
          )}

          {/* {state.copied ? <span style={{color: 'red'}}>Copied.</span> : null} */}
        </div>
      </div>
    </nav>
  );
};

export default Header;
