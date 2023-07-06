import { createSlice } from '@reduxjs/toolkit';
import { ProductsCart } from '../../types/ProductsCart';
import { OrderItemType } from '../../types/OrderItem';

type InitialStateOrders = {
    orders: OrderItemType[]
}
export const slice = createSlice({
    name: 'orders',
    initialState: {
        orders: []
    } as InitialStateOrders,
    reducers: {
        saveOrder: (state: InitialStateOrders, action) => {
            state.orders.push({
                date: action.payload.date,
                status: 1,
                address: action.payload.address,
                discount: action.payload.discount,
                delivery: action.payload.delivery,
                amount: action.payload.amount,
                totalPayable: action.payload.totalPayable,
                products: action.payload.products
            });
        },
        clearOrders: (state: InitialStateOrders, action) => {
            state.orders = [];
        }
    }
});

export const {saveOrder, clearOrders} = slice.actions;
export default slice.reducer;
