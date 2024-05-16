import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setAllDetailCart: (action) => {
            return action.payload;
        },
    }
});

export const { setAllDetailCart } = cartSlice.actions;
export default cartSlice.reducer;
