import { createSlice } from '@reduxjs/toolkit';
import { ProductsCart } from '../../types/ProductsCart';

type InitialStateOrders = {
    orders: any[]
}
export const slice = createSlice({
    name: 'orders',
    initialState: {
        orders: []
    } as InitialStateOrders,
    reducers: {
        saveOrder: (state: InitialStateOrders, action) => {
            
        },
    }
});

export const {saveOrder} = slice.actions;
export default slice.reducer;
