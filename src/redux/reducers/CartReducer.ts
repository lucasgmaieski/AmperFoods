import { createSlice } from '@reduxjs/toolkit';
import { ProductsCart } from '../../types/ProductsCart';

type InitialStateProducts = {
    products: ProductsCart[],
}
export const slice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
    } as InitialStateProducts,
    reducers: {
        addProduct: (state: InitialStateProducts, action) => {
            let id = action.payload.data.id;

            let index = state.products.findIndex(item => item.id === id);
            if(index > -1) {
                state.products[index].qt += action.payload.qt;
            } else {
                state.products.push({
                    ...action.payload.data,
                    qt: action.payload.qt
                })
            }
        },
        changeProduct: (state: InitialStateProducts, action) => {
            if(state.products[action.payload.key]) {
                if(action.payload.type === '-') {
                    state.products[action.payload.key].qt--; 
                    if(state.products[action.payload.key].qt <= 0) {
                        state.products = state.products.filter((item, index)=>index != action.payload.key && item)
                    }
                } else {
                    state.products[action.payload.key].qt++;
                }
            }
        },
        clearCart: (state: InitialStateProducts) => {
            state.products = [];
        }
    }
});

export const {addProduct, changeProduct, clearCart} = slice.actions;
export default slice.reducer;
