
import React, { useState, useCallback, useEffect } from "react";
import "../../index";

import Header from "../common/Header"
import TableInfo from "./Table_info"
import Banner from "./Banner"

const Detail = (props) => {
  return (
    <>
      <div className="p-bscpad ">
        <Header />
        <Banner props={props} />    
        <TableInfo />             
      </div>
    </>
  );
};

export default Detail;
