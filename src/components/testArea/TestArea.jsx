import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { loginCustomerApi, getAllCustomer } from "../../apis/apiLogin";
// import { getAllStrainApi } from "../../apis/apiStrain";
// import { getCartByIdCustomerApi, getAllDetailCartApi } from "../../apis/apiCart";
import axios from "axios";
import Dropdown from "../Dropdown/Dropdown";
import { toast } from "react-toastify";

function TestArea() {
   const handleConfirm = () => {
      // Xử lý hành động khi người dùng xác nhận
      console.log('Người dùng đã xác nhận');
      toast.dismiss();
   };

   const showToast = () => {
      toast.info(
         <div>
            <div>🦄 Bạn có chắc chắn muốn xoá mục này không?</div>
            <button onClick={handleConfirm}>Xác nhận</button>
         </div>,
         {
            autoClose: false,
            closeButton: true,
            closeOnClick: false,
            draggable: true,
            progress: undefined,
            hideProgressBar: true
         }
      );
   };

   return (
      <div>
         <button onClick={showToast}>Hiển thị Toast</button>
      </div>
   )
}

export default TestArea