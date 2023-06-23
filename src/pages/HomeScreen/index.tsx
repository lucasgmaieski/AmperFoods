import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import * as C from './styled';
import { Header } from '../../components/Header';
import { api } from '../../api';
import { CategoryItem } from '../../components/CategoryItem';

export default () => {
    const navigate = useNavigate();
    const [headerSearch, setHeaderSerach] = useState('');
    const [categories, setCategories] = useState([]);

    const [activeCategory, setActiveCategory] = useState(0)
    useEffect(()=> {
        const getCategories = async () => {
            const cat = await api.getCategories();
            if(cat.error == '') {
                setCategories(cat.result);
            }
        };

        getCategories();
    }, []);
    return (
        <C.Container>
            <Header search={headerSearch} onSearch={setHeaderSerach}/>

            {categories.length > 0 &&
                <C.CategoryArea>
                    Selecione uma categoria
                    <C.CategoryList>
                        <CategoryItem data={{id:0, title:'Todas as categorias', image:"/assets/food-and-restaurant-af.png"}} activeCategory={activeCategory}/>
                        {categories.map((item, index)=>(
                            <CategoryItem key={index} data={item} activeCategory={activeCategory}/>
                        ))}
                    </C.CategoryList>
                </C.CategoryArea>
            }
        </C.Container>
    );
}