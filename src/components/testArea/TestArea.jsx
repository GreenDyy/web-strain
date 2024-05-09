import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginCustomerApi, getAllCustomer } from "../../apis/apiLogin";
import { getAllStrainApi } from "../../apis/apiStrain";

function TestArea() {
   const dispatch = useDispatch()

   const [dataTest, setDataTest] = useState()

   useEffect(() => {
      const setNewData = async () => {
         const data = await loginCustomerApi('an', '123')
         // const data = await getAllStrainApi('', '', 1)
         // const data = await getAllCustomer()
         setDataTest(data)

      }
      setNewData();


   }, [])
   useEffect(() => {
      console.log('a', dataTest)
   }, [dataTest])
   return (
      <div>

         <p>a</p>
      </div>
   )
}

export default TestArea