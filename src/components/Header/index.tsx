import * as C from './styles';
import React, { useState, ChangeEvent } from 'react';

type Props = {
    search: string;
    onSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const Header = ({search, onSearch}: Props) => {
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
            <C.Logo src="/assets/logo.png" />
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