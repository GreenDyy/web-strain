import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        isLogin: false,
        customerData: null,
        idCart: null,
    },
    reducers: {
        login: (state, action) => {
            state.isLogin = true
            state.customerData = action.payload.customerData;
            state.idCart = action.payload.idCart;
        },

        logout: (state) => {
            state.isLogin = false
            state.customerData = null
            state.idCart = null
        }
    }

})
export const { login, logout } = customerSlice.actions;
export default customerSlice.reducer