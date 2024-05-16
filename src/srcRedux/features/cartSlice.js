import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        totalAllProduct: 0
    },
    reducers: {
        setAllDetailCart: (state, action) => {
            return {
                ...state,
                cartItems: action.payload
            }
        },
        setTotalAllProduct: (state, action) => {
            return {
                ...state,
                totalAllProduct: action.payload
            }
        },
    }
});

export const { setAllDetailCart, setTotalAllProduct } = cartSlice.actions;
export default cartSlice.reducer;
