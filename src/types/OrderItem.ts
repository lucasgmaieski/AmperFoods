import { ProdItem } from "./ProdItem";

export type OrderItemType = {
    date: string;
    status: 1;
    address: string;
    discount: number;
    delivery: number;
    amount: number;
    totalPayable: number;
    products: ProdItem[];
}