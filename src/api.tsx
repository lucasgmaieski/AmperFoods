import { ProdItem } from "./types/ProdItem";

let BASE = 'http://localhost:5000';

export const api = {
    getCategories: async () => {
        const res = await fetch(BASE+'/categories');
        const json = await res.json();
        console.log('categories'+json);
        console.log(json);
        return json;
    },
    getProducts: async (category: number, page: number, search: string) => {
        const res = await fetch(BASE+'/products');
        const json = await res.json();

        let results = json;
    
        // Filtrar por categoria, se fornecida
        if (category) {
            results = results.filter((product: ProdItem) => product.id_cat === category);
        }
        // Filtrar por termo de pesquisa, se fornecido
        if (search) {
            results = results.filter((product: ProdItem) =>
                product.name.toLowerCase().includes(search.toLowerCase())
            );
        }
        // Paginação
        const pageSize = 6; // Quantidade de produtos por página
        const totalProducts = results.length;
        const totalPages = Math.ceil(totalProducts / pageSize);
        const currentPage = Math.min(page, totalPages);
    
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedResults = results.slice(startIndex, endIndex);
    
        console.log('totalPages: '+totalPages);
        results = {
            currentPage,
            totalPages,
            totalProducts,
            data: paginatedResults,
        }
        return results;
    }
}   