/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useCallback, useEffect } from "react";
import { useTokenBalance } from "hooks/useSellHelpers";
import { useBUSDContract, useERC20, useIDOContract } from "hooks/useContract";
import { ADDRESS_RECEVIE_BUSD, BUSD_TOKEN, LIST_POOL_IDO } from "config";
import { useWeb3React } from "@web3-react/core";
import useClaim from "hooks/useClaim";
import "../../index";
import { useHookDetail } from "./Store-Detail";
import { _isClaim, _joinPool, _withDrawToken } from "./utils";

const Banner = ({ props }: any): any => {
  const [state, actions]: any = useHookDetail();
  const [balClaimed, setBalClaimed] = useState(0);
  const { objData, yourAllocations, objJoin } = state;
  const [loading, setLoading] = useState(false);
  const [loadingClaim, setLoadingClaim] = useState(false);
  const { account } = useWeb3React();
  const amount = useTokenBalance(BUSD_TOKEN);
  const busdContract = useERC20(BUSD_TOKEN);
  const idoContract = useIDOContract();
  const {
    match: { params },
  }: any = props;

  useEffect(() => {
    actions.getProjectDetail(params && params.id);
    // window.scrollTo({ top: 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  useEffect(() => {
    if (account) {
      actions.checkJoinPool({
        idoId: objData && objData.id,
        address: account,
      });
      actions.getYourAllocations({
        idoId: objData && objData.id,
        address: account,
      });
      _isClaim(idoContract, account).then((res) => {
        setBalClaimed(parseFloat(res));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  console.log("objJoin: ", objJoin);

  const _handleClaim = () => {
    setLoadingClaim(true);
    _withDrawToken(idoContract, yourAllocations, account)
      .then((res) => {
        console.log("_withDrawTokenL: ", res);
        setLoadingClaim(false);
      })
      .catch(() => {
        setLoadingClaim(false);
      });
  };
  const _handleJoinPool = () => {
    const amtJoin = objJoin.busd;
    if (amount.toNumber() / 1e18 >= amtJoin) {
      setLoading(true);
      _joinPool(busdContract, ADDRESS_RECEVIE_BUSD, amtJoin, account)
        .then((res) => {
          console.log("res>>>", res);
          // call api add join pool
          actions.addJoinPool({
            id: params.id,
            account,
            amount: objJoin.busd,
            blockHash: res.blockHash,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.log("error>", error);
          setLoading(false);
        });
    } else {
      alert("Insufficient BUSD balance");
    }
  };

  let checkJoin = false;
  if (objJoin.isJionPool) {
    checkJoin = true;
  }

  return (
    <div className="c-banner">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 col-md-6">
            <div className="c-banner__logo">
              <span>
                <img src="../img/logobscs.png " alt="#" />
              </span>
            </div>
            <h2 className="ms-0 c-banner__ttl">
              {objData && objData.name}
              {/* <a href="#" target="_blank">
                    <i className="fas fa-globe-americas" />
                  </a>
                  <a href="#" target="_blank">
                    <i className="fab fa-twitter" />
                  </a>
                  <a href="#" target="_blank">
                    <i className="fab fa-medium-m" />
                  </a>
                  <a href="#" target="_blank">
                    <i className="fab fa-telegram-plane" />
                  </a> */}
            </h2>
            <div className="mb-3 mt-3">
              <p className="text-muted">{objData && objData.ownerAddress}</p>
            </div>
            <div className="c-banner__tag">
              {objData && objData.status === 0 ? (
                <span className="tag-close ripple ripple-surface-info">
                  Pending
                </span>
              ) : objData && objData.status === 1 ? (
                <span className="status">Approved</span>
              ) : objData && objData.status === 2 ? (
                <span className="tag-close ripple ripple-surface-info">
                  Process
                </span>
              ) : (
                <span className="tag-close ripple ripple-surface-info">
                  Close
                </span>
              )}
            </div>
            <div className="mb-3">
              <p className="text-muted">
                {objData && objData.shortDescription}
              </p>
            </div>
            <button
              type="button"
              className="btn btn-primary ripple-surface-dark me-2"
              data-bs-toggle="modal"
              data-bs-target="#connectWalletModal"
              disabled={!checkJoin || loading}
              onClick={() => _handleJoinPool()}
            >
              Join Pool
              {loading ? <i className="fa fa-spinner fa-spin" /> : ""}
            </button>
            <button
              type="button"
              className="btn btn-primary ripple-surface-dark me-2"
              data-bs-toggle="modal"
              data-bs-target="#connectWalletModal"
            >
              View on Bscscan
            </button>
          </div>
          <div className="col-lg-5 col-md-6">
            <div className="card c-card mx-auto mx-lg-0">
              <div className="card-body px-3 py-2">
                <div className="c-card__info">
                  <div className="card-left">
                    <div className="card-title cus mt-2">Swap Amount </div>
                    <div className="card-desc cus">
                      {objData && objData.totalSupply}
                    </div>

                    {/* <div className="card-title cus mt-2">Your approved Amount:</div>
                        <div className="card-desc">0.0000 KRUPTO</div> */}
                  </div>

                  <div className="card-right">
                    <div className="card-title cus mt-2">
                      {objData && objData.swapAmount}
                    </div>
                    {/* <div className="card-desc">-</div> */}
                  </div>
                </div>
                {/* <hr className="mb-2 mt-2" />	
                    <div className="c-card__info">
                      <div className="card-title mt-2">CLOSED</div>
                    </div> */}
                <hr className="mb-2 mt-2" />
                <div className="c-card__info">
                  {/* <div className="card-left">
                        <div className="card-title cus mt-2">Swapped</div>
                        <div className="card-desc">0.0000 BUSD</div>
                        <div className="card-desc-1">0.0000 KRUPTO</div>
                      </div>
                      <div className="card-right">
                        <div className="card-title cus mt-2">Remaining Allocation</div>
                        <div className="card-desc">0.0000 BUSD</div>
                        <div className="card-desc-1">0.0000 KRUPTO</div>
                      </div> */}
                </div>
                {/* <hr className="mb-2 mt-2" /> */}
                <div className="c-card__info">
                  <p className="card-text w-200px">Swap progress</p>
                  <div
                    className="c-card__progress"
                    style={{ width: "100%;" }}
                  />
                  <div className="c-card__label">
                    <span>
                      <b>100.00%</b>
                    </span>
                    <span>{objData && objData.totalSupply}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment */}

      <div className="container d-flex flex-column investment">
        <div className="jss129">
          <h1 className="MuiTypography-root jss130 MuiTypography-h1">
            Your Investment
          </h1>
          <div className="jss131">
            <div className="jss132">
              {/* <div className="jss134">
                    <h5 className="MuiTypography-root jss135 MuiTypography-h5">VOTE</h5>
                    <h2 className="MuiTypography-root jss136 MuiTypography-h2">0.000 START</h2>
                    <button className="MuiButtonBase-root MuiButton-root jss137 MuiButton-text Mui-disabled Mui-disabled" tabIndex={-1} type="button" >
                        <span className="MuiButton-label jss138">VOTE</span>
                    </button>
                </div> */}
              <div className="jss134">
                <h5 className="MuiTypography-root jss135 MuiTypography-h5">
                  Your Tokens
                </h5>
                <h2 className="MuiTypography-root jss136 MuiTypography-h2">
                  {(!balClaimed && yourAllocations) || 0}
                </h2>
                <button
                  disabled={balClaimed > 0 || loadingClaim || !yourAllocations}
                  onClick={() => _handleClaim()}
                  className="btn-investment"
                  type="button"
                >
                  <span className="btn-investment-content">
                    Claim Tokens
                    {loadingClaim ? (
                      <i className="fa fa-spinner fa-spin" />
                    ) : (
                      ""
                    )}
                    
                  </span>
                </button>
              </div>
              {/* <div className="jss134">
                    <h5 className="MuiTypography-root jss135 MuiTypography-h5">Your BNB Investment</h5>
                    <h2 className="MuiTypography-root jss136 MuiTypography-h2">0.0000 BNB</h2>
                    <button className="btn-investment"  type="button" >
                        <span className="btn-investment-content">Get Refund</span>
                    </button>
                </div> */}
              <div className="jss134">
                <h5 className="MuiTypography-root jss135 MuiTypography-h5">
                  Buy Tokens
                </h5>
                <h2 className="MuiTypography-root jss136 MuiTypography-h2">
                  {objData && objData.swapAmount}
                </h2>
                <button disabled className="btn-investment" type="button">
                  <span className="btn-investment-content">Buy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
