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
            let products = [...state.products]
            let id = action.payload.data.id;

            let index = state.products.findIndex(item => item.id === id);
            console.log(state.products)
            if(index > -1) {
                state.products[index].qt += action.payload.qt;
            } else {
                state.products.push({
                    ...action.payload.data,
                    qt: action.payload.qt
                })
            }

            console.log(state.products)
            console.log(products)
            products.forEach((element, index) => {
                console.log('name- '+index+':'+element.name)
                console.log('qt: '+element.qt)
            });
            // console.log(products[14].name)
            // console.log(products[14].qt)
        },
        changeProduct: (state: InitialStateProducts, action) => {
            if(state.products[action.payload.key]) {
                if(action.payload.type === '-') {
                    state.products[action.payload.key].qt--; 
                    if(state.products[action.payload.key].qt <= 0) {
                        state.products = state.products.filter((item, index)=>index != action.payload.key)
                    }
                } else {
                    state.products[action.payload.key].qt++;
                }
            }
        },
        clearCart: (state: InitialStateProducts, action) => {
            state.products = [];
        }
    }
});

export const {addProduct, changeProduct, clearCart} = slice.actions;
export default slice.reducer;
