
import React, { useState, useCallback, useEffect } from "react";
import "../../index";

import { useHookDetail } from './Store-Detail'


const TableAllocations = () => {

    // const [state, actions]: any = useHookDetail()
    // const { listAllocations }: any = state

    // useEffect(() => {
    //     actions.getYourAllocations()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    return (

        <div className="tab-pane fade show active" role="tabpanel">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        {/* <div className="card-header">Pool information</div> */}
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table mw01 mb-0 nobg">
                                    <thead>
                                        <tr>
                                            <th scope="col">No.</th>
                                            <th scope="col">Token allocation</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Token(s) claimed</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>



        // <table className="table">
        //     <thead>
        //         <tr>
        //             <th scope="col">No.</th>
        //             <th scope="col">Token allocation</th>
        //             <th scope="col">Date</th>
        //             <th scope="col">Token(s) claimed</th>
        //             <th scope="col">Action</th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         <tr>
        //             <th scope="row">1</th>
        //             <td>0</td>
        //             <td>0</td>
        //             <td>0</td>
        //             <td>0</td>
        //         </tr>
        //     </tbody>
        // </table>
    );
};

export default TableAllocations;
