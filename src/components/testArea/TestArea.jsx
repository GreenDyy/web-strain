import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginCustomerApi, getAllCustomer } from "../../apis/apiLogin";
import { getAllStrainApi } from "../../apis/apiStrain";
import axios from "axios";
import Dropdown from "../Dropdown/Dropdown";

function TestArea() {

   return (
      <div>
         <Dropdown/>
      </div>
   )
}

export default TestArea