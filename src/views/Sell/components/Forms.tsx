/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useCallback, useEffect } from "react";
import "../index.css";

import moment from "moment";
import { useWeb3React } from "@web3-react/core";
import UnlockButton from "components/UnlockButton";
import useDepositSellPublic from "hooks/useDepositSellPublic";
import useWithDrawSellPublic from "hooks/useWithDrawSellPublic";
import { useCurrentBalance, useGetInfo } from "hooks/useSellHelpers";
import { getBalanceNumber } from "utils/formatBalance";
import { isMobile } from "react-device-detect";
import { useHookSale } from "../Store";

import Header from "./common/Header"

/* eslint-disable react/button-has-type */
const Forms = () => {
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
  let addressWallet = '';
  if (account) {
    addressWallet = `${account.substr(0, 15)}...${account.substr(account.length - 9)}`
  }
  
  return (
    <div>
     
     <Header />
      <section className="section-border border-primary bg-map">
        <div className="container d-flex flex-column">
          <div
            className="row align-items-center justify-content-center no-gutters"
            style={{ paddingTop: "100px" }}
          >
            <div className="col-12 col-md-5 col-lg-4">
              {/* Heading */}
              <div className="mb-0 font-weight-bold text-center">
                <a className="navbar-brand" href="/">
                  {/* <img src="/img/logo-dark.png" className="navbar-brand-img" alt="..."> */}
                </a>
              </div>
              {/* Text */}
              {/* Form */}
              <div className="mb-9">
                <div className="sc-dQppl kmMvoB sc-hYAvag jfgTmU">
                  <div id="swap-page" className="sc-dRPiIx esbyIi">
                    <div className="sc-fXvjs darEnv">
                      <div className="sc-eCssSg sc-jSgupP eNboqf ggLwEG">
                        <div className="sc-bTvRPi sc-hOqqkJ sc-dtwoBo cchpWM hWkaVx inCwUZ">
                          <div color="text" className="sc-gsTCUz">
                            0.00353 BNB
                          </div>
                          <div
                            color="text"
                            className="sc-gsTCUz"
                            style={{ display: "inline" }}
                          >
                            ≈ 1 BSCS
                          </div>
                        </div>
                        <img
                          src="/img/logobscs.png?v=0.1" className="navbar-brand-img" style={{ height: "30px" }} alt="..."
                        />
                      </div>


                      <div className="sc-JAcuL rhuht">
                        {account ? (
                          <span>{isMobile && addressWallet}</span>
                        ) : (
                          isMobile && <UnlockButton />
                        )}
                      </div>
                      <ul className="list-unstyled list-inline list-social mb-3 mt-3 mb-md-0" style={{ textAlign: "center" }} >
                        <li className="list-inline-item list-social-item mr-3">
                          <a href="https://twitter.com/bscstation" className="text-decoration-none">
                            <img src="/img/icons/social/twitter.png" className="list-social-icon" alt="..." />
                          </a>
                        </li>
                        <li className="list-inline-item list-social-item mr-3">
                          <a
                            href="https://t.me/bscstation"
                            className="text-decoration-none"
                          >
                            <img
                              src="/img/icons/social/telegram.png"
                              className="list-social-icon"
                              alt="..."
                            />
                          </a>
                        </li>
                        <li className="list-inline-item list-social-item mr-3">
                          <a
                            href="https://bscstation.medium.com/"
                            className="text-decoration-none"
                          >
                            <img
                              src="/img/icons/social/medium.png"
                              className="list-social-icon"
                              alt="..."
                            />
                          </a>
                        </li>
                        <li className="list-inline-item list-social-item">
                          <a
                            href="https://bscstation.zendesk.com/hc/en-us"
                            className="text-decoration-none"
                          >
                            <img
                              src="/img/icons/social/Zendesk.png"
                              className="list-social-icon"
                              alt="..."
                            />
                          </a>
                        </li>
                        <li className="list-inline-item list-social-item">
                          <a
                            href="https://www.youtube.com/channel/UCJg3z-O4X7SCeL3Qccb-0zA/featured"
                            className="text-decoration-none"
                          >
                            <img
                              src="/img/icons/social/youtube.png"
                              className="list-social-icon"
                              alt="..."
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="sc-bqyKva domPRl">
                      <div className="sc-eLgOdN kubwGS">
                        <div
                          id="swap-currency-input"
                          className="sc-fybufo eORiCX"
                        >
                          <div className="sc-iWFSnp dRkbRe">
                          <div className="form-group-buy">
                                  <label htmlFor="SelectBuy">Buy with: </label>
                                  <select className="form-group-buy-select" >
                                    <option>USD</option>
                                    <option>USD1</option> 
                                  </select>
                                </div>
                            <div className="sc-dkmKpi eAbILx">
                             
                              <div className="sc-bTvRPi sc-hOqqkJ sc-dtwoBo cchpWM hWkaVx inCwUZ">
                                <div color="text" className="sc-gsTCUz cRLXro">
                                  Enter the number
                                </div>

                                <div
                                  color="text"
                                  className="sc-gsTCUz cRLXro"
                                  style={{
                                    display: "inline",
                                    cursor: "pointer",
                                  }}
                                >
                                  Balance: {totalETH}
                                </div>
                              </div>
                            </div>
                            <div className="sc-kmASHI bQNbrd">
                              <input
                                className="sc-aKZfe eyCBWg token-amount-input"
                                title="Token Amount"
                                type="number"
                                spellCheck="false"
                                readOnly={!account}
                                onChange={(e) => actions.changeInput(e)}
                                value={amountETH}
                              />
                              <button
                                className="sc-dlfnbm kffJUP"
                                onClick={() => actions.changeMaxInput()}
                              >
                                MAX
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="sc-JAcuL rhuht">
                        {pendingtx ? (
                          <button className="sc-dlfnbm btn-buy ">
                            Pending
                          </button>
                        ) : (
                          <button
                            className="sc-dlfnbm btn-buy "
                            onClick={async () => {
                              await handleDeposit();
                            }}
                          >
                            Buy
                          </button>
                        )}
                      </div>
                      <div className="sc-iWFSnp dRkbRe">
                        <div className="sc-dkmKpi eAbILx">
                          <div className="sc-bTvRPi sc-hOqqkJ sc-dtwoBo cchpWM hWkaVx inCwUZ">
                            <div color="text" className="sc-gsTCUz balance">
                              Balance :
                            </div>
                            <div
                              color="text"
                              className="sc-gsTCUz balance"
                              style={{ display: "inline" }}
                            >
                              {getBalanceNumber(
                                (info && info.totalBNBDeposit) || 0
                              ).toFixed(4)}{" "}
                              BNB
                            </div>
                          </div>
                        </div>
                        <div className="sc-dkmKpi eAbILx">
                          <div className="sc-bTvRPi sc-hOqqkJ sc-dtwoBo cchpWM hWkaVx inCwUZ">
                            <div color="text" className="sc-gsTCUz balance">
                              Total BSCS :
                            </div>
                            <div
                              color="text"
                              className="sc-gsTCUz balance"
                              style={{ display: "inline" }}
                            >
                              {getBalanceNumber(
                                (info && info.totalBSCS) || 0
                              ).toFixed(4)}{" "}
                              RECEIVED
                            </div>
                          </div>
                        </div>
                        <div className="sc-dkmKpi eAbILx">
                          <div className="sc-bTvRPi sc-hOqqkJ sc-dtwoBo cchpWM hWkaVx inCwUZ">
                            <div color="text" className="sc-gsTCUz balance">
                              &nbsp;
                            </div>
                            <div
                              color="text"
                              className="sc-gsTCUz balance"
                              style={{ display: "inline" }}
                            >
                              {getBalanceNumber(
                                (info && info.totalBSCSBlock) || 0
                              ).toFixed(4)}{" "}
                              LOCK
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="jss95">
            <div
              className="jss96"
              style={{
                opacity: 1,
                transition: "opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              }}
            >
              <div className="jss101">
                <div className="jss102">
                  <div className="jss103">
                    <img
                      className="jss104"
                      alt="pool"
                      src="/img/logobscs.png?v=0.1"
                    />
                    <div className="jss105">
                      <h1 className="MuiTypography-root jss106 MuiTypography-h1">
                        START Public Presale
                      </h1>
                      <h5 className="MuiTypography-root jss107 MuiTypography-h5">
                        Token Address
                      </h5>
                      <a
                        className="jss127"
                        href="https://bscscan.com/token/0xbcb24afb019be7e93ea9c43b7e22bb55d5b7f45d"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h5 className="MuiTypography-root jss108 MuiTypography-h5">
                          0xbcb24afb019be7e93ea9c43b7e22bb55d5b7f45d
                        </h5>
                      </a>
                    </div>
                  </div>
                  <div className="jss109">
                    <div
                      className="jss110"
                      style={{
                        backgroundColor: "#FAC668",
                        fontWeight: "bold",
                        color: "#2b2a28",
                      }}
                      id="countdowntime"
                    />
                    <h5 className="MuiTypography-root jss111 MuiTypography-h5">
                      IDO time: March 20, 2021 09:00 AM
                    </h5>
                  </div>
                </div>
                <div className="jss112">
                  <div className="jss113">
                    <div className="jss114">
                      <h5 className="MuiTypography-root jss115 MuiTypography-h5">
                        0.00353 BNB per Token
                      </h5>
                      <h5 className="MuiTypography-root jss116 MuiTypography-h5">
                        0.000 BNB Raised
                      </h5>
                    </div>
                  </div>
                  <div className="jss119">
                    <div
                      className="jss120"
                      style={{
                        backgroundColor: "#FAC668",
                        width: `${percentBNBDeposit}%`,
                      }}
                    />
                  </div>
                  <div className="jss121">
                    <h5 className="MuiTypography-root jss122 MuiTypography-h5">
                      0.000%
                    </h5>
                    <h5 className="MuiTypography-root jss122 MuiTypography-h5">
                      {totalBNBDeposit} /&nbsp;486.000 BNB
                    </h5>
                  </div>
                </div>
                <div className="jss123">
                  <div className="jss124">
                    <h5 className="MuiTypography-root jss125 MuiTypography-h5">
                      Softcap
                    </h5>
                    <h5 className="MuiTypography-root jss126 MuiTypography-h5">
                      200 BNB
                    </h5>
                  </div>
                  <div className="jss124">
                    <h5 className="MuiTypography-root jss125 MuiTypography-h5">
                      Min Per Wallet
                    </h5>
                    <h5 className="MuiTypography-root jss126 MuiTypography-h5">
                      0.2 BNB
                    </h5>
                  </div>
                  <div className="jss124">
                    <h5 className="MuiTypography-root jss125 MuiTypography-h5">
                      Presale Rate
                    </h5>
                    <h5 className="MuiTypography-root jss126 MuiTypography-h5">
                      0.00353 BNB
                    </h5>
                  </div>
                  <div className="jss124">
                    <h5 className="MuiTypography-root jss125 MuiTypography-h5">
                      Hardcap
                    </h5>
                    <h5 className="MuiTypography-root jss126 MuiTypography-h5">
                      1000 BNB
                    </h5>
                  </div>
                  <div className="jss124">
                    <h5 className="MuiTypography-root jss125 MuiTypography-h5">
                      Max Per Wallet
                    </h5>
                    <h5 className="MuiTypography-root jss126 MuiTypography-h5">
                      4.00 BNB
                    </h5>
                  </div>
                  <div className="jss124">
                    <h5 className="MuiTypography-root jss125 MuiTypography-h5">
                      Liquidity Lock Duration
                    </h5>
                    <h5 className="MuiTypography-root jss126 MuiTypography-h5">
                      365 days
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="mb-0 font-size-sm text-center text-muted">
            Back to{" "}
            <a className="MuiTypography-root jss108 MuiTypography-h5" href="/">
              home page
            </a>
            .
          </p>
          <div className="row">
            <h2 className="font-weight-bold title-history">History 1</h2>
          </div>
          <div className="table-response">
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Day Created</th>
                  <th scope="col">BSCS Received</th>
                  <th scope="col">Blocked</th>
                  <th scope="col">Next Month</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((item, i) => {
                    return (
                      <tr key={`item_${item[2]}`}>
                        <th scope="row">{i + 1}</th>
                        <td>{getBalanceNumber(item[3]).toFixed(4)}</td>
                        <td>
                          {moment.unix(item[2]).format("DD/MM/YYYY, HH:mm:ss")}
                        </td>
                        <td>{getBalanceNumber(item.amountBSCS).toFixed(4)}</td>
                        <td>
                          {getBalanceNumber(item.amountBSCSBlock).toFixed(4)}
                        </td>
                        <td>
                          {moment
                            .unix(item.nextMonth)
                            .format("DD/MM/YYYY, HH:mm:ss")}
                        </td>
                        <td>
                          <button
                            onClick={async () => {
                              await _handleWithDraw(item);
                            }}
                            className={`btn btn-withdraw ${!isWithDraw(item.nextMonth, blockTimestamp)
                                ? "disabled"
                                : ""
                              }`}
                          >
                            Withdraw
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Forms;
