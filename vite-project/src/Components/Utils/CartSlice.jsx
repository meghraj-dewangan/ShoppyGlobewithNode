import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    items: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const product = action.payload;
            const existingProduct = state.items.find(item => item._id === product._id);
            if (existingProduct) {
                // Update quantity if item already exists
                existingProduct.quantity = product.quantity;
            } else {
                // Add new product
                state.items.push(product);
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
        setCart: (state, action) => {
            state.items = action.payload;
        },
    }
});

export const { addItem, removeItem, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;