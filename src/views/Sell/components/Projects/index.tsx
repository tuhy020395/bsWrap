/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useEffect } from "react";
import "../../index";
import { useHookProjects } from './Store-Projects'
import Header from "../common/Header"


const ItemProject = ({ item }) => {

    const [state, actions] = useHookProjects()

    return (
        <>
            <div className="col-lg-6 col-md-6 text-center">
                <a className="card-project" href={`/projects/${item.id}`} target="_blank" >
                    <div className="single-item" >
                        <div className="pp-card-body">
                            <div className="pp-card-top">
                                <a>
                                    <div className="icon-box">
                                        <span>
                                            <img src="img/logobscs.png" alt="#" />
                                        </span>
                                    </div>
                                </a>
                                <div className="title-box">
                                    <h3 className="d-flex align-items-center">
                                        <a>
                                            <div>{item.name}</div>
                                        </a>
                                        {item.status === 0 ?
                                            (<span className="status">Pending</span>) : (
                                                item.status === 1 ? (
                                                    (<span className="status">Approved</span>)
                                                ) : (
                                                    item.status === 2 ? (
                                                        <span className="status">Process</span>
                                                    ) : (
                                                        <span className="status">Close</span>
                                                    )
                                                )
                                            )
                                        }                                 
                                    </h3>
                                    <div className="item-social flex-row">
                                        <div>
                                            <ul className="list-unstyled list-inline list-social mb-6 mb-md-0">
                                                <li className="list-inline-item list-social-item">
                                                    <a href={item.socical.zkchaos} className="text-decoration-none bg-border" target="_blank" >
                                                        <img src="img/conection.svg " className="list-social-icon" alt="..." />
                                                    </a>
                                                </li>
                                                <li className="list-inline-item list-social-item mr-3">
                                                    <a href={item.socical.twitter} className="text-decoration-none bg-border" target="_blank" >
                                                        <img src="img/icons/social/twitter.png" className="list-social-icon" alt="..." />
                                                    </a>
                                                </li>
                                                <li className="list-inline-item list-social-item mr-3">
                                                    <a href={item.socical.telegram}
                                                        className="text-decoration-none bg-border" target="_blank" >
                                                        <img src="img/icons/social/telegram.png"
                                                            className="list-social-icon" alt="..." />
                                                    </a>
                                                </li>
                                                <li className="list-inline-item list-social-item mr-3">
                                                    <a href={item.socical.medium}
                                                        className="text-decoration-none bg-border" target="_blank" >
                                                        <img src="img/icons/social/medium.png"
                                                            className="list-social-icon" alt="..." />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>                                    
                                    </div>
                                    <a className="items-morex" href="#!">        
                                        <br />                                                                   
                                        <span className="pp-status-opening">{item.unit}</span><br /><br />

                                        <div><span className="">{item.symbol}</span></div>                                      
                                    </a>
                                    <br />
                                    <div className="pp-card-col">{item.swapAmount}</div>
                                </div>
                            </div>
                            <a href={`/projects/${item.id}`} target="_blank" >
                                <div className="part-prize">
                                    <div className="pp-card-info">
                                        <div className="pp-card-col">Total raise <br />
                                            <b className="nowrap">{item.totalSupply}</b> <br />
                                            <div className="pp-card-col">({item.usdPrice} USD)</div>
                                        </div>
                                    </div>
                                    <div className="pp-card-info d-block">
                                        <div className="pp-card-progress-wrap">
                                            <div
                                                className="mb-2 d-flex justify-content-between align-items-center pp-card-progress-top">
                                                <div className="pp-card-col">Progress</div>
                                            </div>
                                            <div className="pp-card-progress">
                                                <div className="pp-card-progress-percent" />
                                                <div className="pp-card-progress-label">
                                                    <span><b>0.00%</b></span><span
                                                        className="text-allocation"><b>100%</b></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pp-card-info">
                                        <div className="pp-card-col">Max.<br /><b className="nowrap">{item.maxAllocation}</b></div>
                                        <div className="pp-card-col text-center ps-28">Min.<br /><b>{item.minAllocation}</b></div>
                                        <div className="pp-card-col text-end">Access<br /><b>{item.accessType}</b></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </a>
            </div>
        </>
    )
}

/* eslint-disable react/button-has-type */
const Projects = (prop) => {
    const [state, actions]: any = useHookProjects()
    const { idoList }: any = state


    useEffect(() => {
         actions.getProject()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div data-aos-easing="ease-out-quad" className="bg-map" data-aos-duration="700" data-aos-delay="0">
            <Header />

            <section className="section-border border-primary">
                <div className="container d-flex flex-column">
                    <div className="row align-items-center justify-content-center no-gutters" style={{ "paddingTop": "150px" }}>
                        <div className="investment-section-items">
                            <div className="row d-flex">
                                {idoList
                                    .map((item: any, i) => (
                                        <ItemProject
                                            key={item.id}
                                            item={item}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Projects;