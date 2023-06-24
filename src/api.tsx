let BASE = 'https://api.b7web.com.br/devsfood/api';

type Fields = {
    category?: number;
    page?: number;
    search?: string;
}

export const api = {
    getCategories: async () => {
        const res = await fetch(BASE+'/categories');
        const json = await res.json();
        return json;
    },
    getProducts: async (category: number, page: number, search: string) => {
        //GET /products ([search, page, category])
        let fields: Fields = {};
        if(category !== 0) {
            fields.category = category;
        }
        if(page > 0) {
            fields.page = page;
        }
        if(search !== '') {
            fields.search = search;
        }

        let queryString = new URLSearchParams(fields as any).toString();

        const res = await fetch(BASE+'/products?'+queryString);
        const json = await res.json();
        return json;
    }
}   