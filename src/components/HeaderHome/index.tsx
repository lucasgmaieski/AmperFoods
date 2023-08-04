import { Link } from 'react-router-dom';
import * as C from './styles';
import React, { useState, ChangeEvent } from 'react';

type Props = {
    search: string;
    onSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const HeaderHome = ({search, onSearch}: Props) => {
    const [inputActive, setInputActive] = useState(search == '' ? false : true);

    const handleInputFocus = () => {
        setInputActive(true);
    }
    const handleInputBlur = () => {
        if(search == '') {
            setInputActive(false);
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value)
    }

    return (
        <C.Container>
            <Link to={'/'}><C.Logo src="/logo-amperfoods-orange-2.png" /></Link>
            <C.SearchInput 
                type="text" 
                placeholder="Digite um Produto"
                value={search}
                onChange={handleChange}
                active={inputActive.toString()}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
            />
        </C.Container>
    )
}