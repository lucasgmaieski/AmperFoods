import { createSlice } from '@reduxjs/toolkit';
import { ProductsCart } from '../../types/ProductsCart';

type InitialStateProducts = {
    products: ProductsCart[],
    address: any,
    discount: number,
    delivery: number
}
export const slice = createSlice({
    name: 'cart',
    initialState: {
        products: [{
            id: 1,
            id_cat: 1,
            image: 'adfadf',
            ingredients: 'kjgk',
            name: 'suco',
            points: 5,
            price: 10,
            qt: 1,
            },
        ],
        address: [],
        discount: 0,
        delivery: 0
    } as InitialStateProducts,
    reducers: {
        addProduct: (state: InitialStateProducts, action) => {
            let products = [...state.products]
            let id = action.payload.data.id;
            console.log(state.products)

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
            console.log(products[14].name)
            console.log(products[14].qt)
        },
    }
});

export const {addProduct} = slice.actions;
export default slice.reducer;
