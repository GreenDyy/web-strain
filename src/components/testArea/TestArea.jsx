import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Dropdown from "../dropdown/Dropdown";
import { toast } from "react-toastify";
import { getAllTotalQuantityApi } from "../../apis/apiCart";

function TestArea() {
   const [quantity, setQuantity] = useState(0)
   useEffect(() => {
      const fetchData = async () => {
         const totalQuantity = await getAllTotalQuantityApi(1)
         setQuantity(totalQuantity.data)
         console.log(totalQuantity.status)
      }
      fetchData()
   })
   const totalQuantity = useSelector(state => state.totalProduct);
   console.log('test area:', totalQuantity)

   return (
      <div>
         <p>{totalQuantity}</p>
      </div>
   )
}

export default TestArea