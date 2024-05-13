import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setAllDetailCart: (state, action) => {
            // state = action.payload;
            return action.payload;  
        }
    }
});

export const { setAllDetailCart } = cartSlice.actions;
export default cartSlice.reducer;
