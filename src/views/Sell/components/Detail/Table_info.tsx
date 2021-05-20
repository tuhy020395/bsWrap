/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState, useCallback, useEffect } from "react";
import "../../index";

import { useHookDetail } from './Store-Detail'
import TableAllocations from "./Table_Allocations"

const TableInfo = () => {

    const [state, actions]: any = useHookDetail()
    const { objData } = state

    return (
        <div className="c-tabs">
            <div className="container">
                <ul className="nav nav-tabs mb-3" role="tablist">
                    <li className="nav-item active  " role="presentation" onClick={actions.activeTable1}>
                        <a className={state.classTb1} data-mdb-toggle="tab" role="tab" >Pool Details</a>
                    </li>
                    <li className="nav-item" role="presentation" onClick={actions.activeTable2}>
                        <a className={state.classTb2} data-mdb-toggle="tab" role="tab" >About the Project</a>
                    </li>
                    <li className="nav-item" role="presentation" onClick={actions.activeTable3}>
                        <a className={state.classTb3} data-mdb-toggle="tab" role="tab" >Your allocations</a>
                    </li>
                </ul>
                <div className="tab-content" id="ex1-content">

                    {state.active === 1 ? (

                        <div className="tab-pane fade show active" role="tabpanel">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-header">Pool information</div>
                                        <div className="card-body p-0">
                                            <div className="table-responsive">
                                                <table className="table mw01 mb-0 nobg">
                                                    <tbody>
                                                        <tr>
                                                            <td>Token Distribution</td>
                                                            <td>{objData && objData.tokenDistribution} </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Min. Allocation</td>
                                                            <td>{objData && objData.minAllocation} </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Max. Allocation</td>
                                                            <td>{objData && objData.maxAllocation}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Soft Cap</td>
                                                            <td>{objData && objData.softCap}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Access type</td>
                                                            {objData && objData.accessType === 0 ? (
                                                                <td><span>Private</span></td>
                                                            ) : (
                                                                <td><span>Public</span></td>
                                                            )}
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mt-4 mt-md-0">
                                    <div className="card">
                                        <div className="card-header">Token information</div>
                                        <div className="card-body p-0">
                                            <div className="table-responsive">
                                                <table className="table mb-0 nobg">
                                                    <tbody>
                                                        <tr>
                                                            <td>Name</td>
                                                            <td> {objData && objData.name}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Address</td>
                                                            <td>{objData && objData.ownerAddress}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Total Supply</td>
                                                            <td>{objData && objData.totalSupply}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Decimals</td>
                                                            <td>{objData && objData.decimals}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Symbol</td>
                                                            <td>{objData && objData.symbol}</td>
                                                            
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        state.active === 2 ? (
                            <>
                                {/* <h2>
                                    <img src="../img/logo-dark.png" alt="#" style={{"height":"30px", "width":"180px"}} />
                                </h2> */}
                                <div className="item-social flex-row">
                                    <div>
                                        <ul className="list-unstyled list-inline list-social mb-6 mb-md-0">
                                            <li className="list-inline-item list-social-item">
                                                <a href={objData && objData.socical.zkchaos} className="text-decoration-none bg-border" target="_blank" >
                                                    <img src="../img/conection.svg " className="list-social-icon-allocations" alt="..." />
                                                </a>
                                            </li>
                                            <li className="list-inline-item list-social-item mr-3">
                                                <a href={objData && objData.socical.twitter} className="text-decoration-none bg-border" target="_blank" >
                                                    <img src="../img/icons/social/twitter.png" className="list-social-icon-allocations" alt="..." />
                                                </a>
                                            </li>
                                            <li className="list-inline-item list-social-item mr-3">
                                                <a href={objData && objData.socical.telegram}
                                                    className="text-decoration-none bg-border" target="_blank" >
                                                    <img src="../img/icons/social/telegram.png"
                                                        className="list-social-icon-allocations" alt="..." />
                                                </a>
                                            </li>
                                            <li className="list-inline-item list-social-item mr-3">
                                                <a href={objData && objData.socical.medium}
                                                    className="text-decoration-none bg-border" target="_blank" >
                                                    <img src="../img/icons/social/medium.png"
                                                        className="list-social-icon-allocations" alt="..." />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="dest mt-3">

                                    {objData && objData.description}
                                </div>
                            </>
                        ) : (
                            <TableAllocations />
                        )
                    )
                    }
                </div>
            </div>
        </div>
    );
};

export default TableInfo;
