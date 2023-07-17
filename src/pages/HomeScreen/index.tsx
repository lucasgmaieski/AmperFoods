import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import * as C from './styled';
import { Header } from '../../components/Header';
import { api } from '../../api';
import { CategoryItem } from '../../components/CategoryItem';
import { CatItem } from '../../types/CatItem';
import { ProductItem } from '../../components/ProductItem';
import { ProdItem } from '../../types/ProdItem';
import { Modal } from '../../components/Modal';
import { ModalProduct } from '../../components/ModalProduct';
import { Loader } from '../../components/Loader';

let searchTimer: NodeJS.Timeout | undefined = undefined;

export default () => {
    const navigate = useNavigate();
    const [headerSearch, setHeaderSerach] = useState('');
    const [categories, setCategories] = useState<CatItem[]>([]);
    const [products, setProducts] = useState<ProdItem[]>([]);
    const [totalPages, setTotalPages] = useState(0);

    const [loading, setLoading] = useState(false);
    const [modalStatus, setModalStatus] = useState(false);
    const [modalData, setModalData] = useState<ProdItem | null>(null);

    const [activeCategory, setActiveCategory] = useState(0);
    const [activePage, setActivePage] = useState(1);
    const [activeSearch, setActiveSearch] = useState('');

    const getProducts = async () => {
        setLoading(true);
        const prods = await api.getProducts(activeCategory, activePage, activeSearch);
        setTimeout(() => {
            setTotalPages(prods.totalPages);
            setLoading(false);
            if(prods.data.length > 0) {
                setProducts(prods.data);
                console.log(prods.data);
                // setTotalPages(prods.totalPages);
                setActivePage(prods.currentPage);
            }
        }, 150);
    }

    useEffect(()=>{
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
            setActivePage(1);
            setActiveSearch(headerSearch);
        }, 2000);
    }, [headerSearch]);

    useEffect(()=> {
        const getCategories = async () => {
            const cat = await api.getCategories();
            if(cat.length > 0) {
                setCategories(cat);
            }
        };
        getCategories();
    }, []);

    useEffect(()=>{
        setProducts([]);
        getProducts();
    }, [activeCategory, activePage, activeSearch]);

    const handleProductClick = (data:ProdItem) => {
        setModalData(data);
        setModalStatus(true);
    }
    
    return (
        <C.Container>
            <Header search={headerSearch} onSearch={setHeaderSerach}/>

            {categories.length > 0 &&
                <C.CategoryArea>
                    Selecione uma categoria
                    <C.CategoryList>
                        <CategoryItem 
                            data={{id:0, name:'Todas as categorias', image:"/assets/food-and-restaurant-af.png"}} 
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                            setActivePage={setActivePage}
                        />
                        {categories.map((item, index)=>(
                            <CategoryItem 
                                key={index} 
                                data={item} 
                                activeCategory={activeCategory}
                                setActiveCategory={setActiveCategory}
                                setActivePage={setActivePage}
                            />
                        ))}
                    </C.CategoryList>
                </C.CategoryArea>
            }

            {products.length > 0 && 
                <C.ProductArea>
                    <C.ProductList>
                        {products.map((item, index)=>(
                            <ProductItem 
                                key={index}
                                data={item}
                                onClick={handleProductClick}
                            />
                        ))}
                    </C.ProductList>
                </C.ProductArea>
            }
            {products.length === 0 && !loading && 
                <C.NoProducts>Nenhum produto encontrado!</C.NoProducts>
            }
            {loading && 
                <Loader status={true} isCheck={false} />
            }

            {totalPages > 0 &&
                <C.ProductPaginationArea>
                    {Array(totalPages).fill(0).map((item, index)=>(
                        <C.ProductPaginationItem 
                            key={index} 
                            active={activePage}
                            current={index + 1}
                            onClick={()=>setActivePage(index + 1)}
                        >
                            {index + 1}
                        </C.ProductPaginationItem>
                    ))}
                </C.ProductPaginationArea>
            }

            <Modal status={modalStatus} setStatus={setModalStatus}>
                <ModalProduct data={modalData} setStatus={setModalStatus}/>
            </Modal>
        </C.Container>
    );
}