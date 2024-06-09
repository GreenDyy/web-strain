import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        isLogin: false,
        employeeData: null,
    },
    reducers: {
        login: (state, action) => {
            state.isLogin = true
            state.employeeData = action.payload.employeeData;
        },

        logout: (state) => {
            state.isLogin = false
            state.employeeData = null
        },

        changeData: (state, action) => {
            state.employeeData = action.payload.employeeData;
        }
    }

})
export const { login, logout, changeData } = employeeSlice.actions;
export default employeeSlice.reducer