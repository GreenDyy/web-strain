import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        isLogin: false,
        customerData: null,
    },
    reducers: {
        login: (state, action) => {
            state.isLogin = true
            state.customerData = action.payload
        },

        logout: (state) => {
            state.isLogin = false
            state.customerData = null
        }
    }

})
export const { login, logout } = customerSlice.actions;
export default customerSlice.reducer