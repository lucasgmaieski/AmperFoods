import { ProdItem } from "./ProdItem"

// export type ProductsCart = {
//     data: ProdItem,
//     qt: number
// }
export type ProductsCart = {
    id: number;
    id_cat: number;
    image: string;
    ingredients: string;
    name: string;
    points: number;
    price: number;
    qt: number
}