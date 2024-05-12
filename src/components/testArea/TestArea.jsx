import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginCustomerApi, getAllCustomer } from "../../apis/apiLogin";
import { getAllStrainApi } from "../../apis/apiStrain";
import { getCartByIdCustomer, getAllDetailCart } from "../../apis/apiCart";
import axios from "axios";
import Dropdown from "../Dropdown/Dropdown";

function TestArea() {
   useEffect(() => {
      const fetchData = async () => {
          const cart = await getCartByIdCustomer('KH00001')
          console.log("cart nè: ", cart.data)

      
          const allDetailCart = await getAllDetailCart(cart.idCart)
          console.log(allDetailCart)
      }
      fetchData()
  }, [])
   return (
      <div>
         <p>a</p>
      </div>
   )
}

export default TestArea