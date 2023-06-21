import React from 'react';
import { useNavigate } from "react-router-dom";
import * as C from './styled';

export default () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/tela2/testador');
    }

    return (
        <C.Container>
            <C.Titulo>Homepage</C.Titulo>
            <button onClick={handleButtonClick}>Ir para Tela 2</button>
        </C.Container>
    );
}