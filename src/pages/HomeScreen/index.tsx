import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import * as C from './styled';
import { Header } from '../../components/Header';

export default () => {
    const navigate = useNavigate();
    const [headerSearch, setHeaderSerach] = useState('');

    return (
        <C.Container>
            <Header search={headerSearch} onSearch={setHeaderSerach}/>
        </C.Container>
    );
}