import React from 'react';
import { useHistory } from "react-router-dom";
import * as C from './styled';

export default () => {
    const history = useHistory();

    const handleButtonClick = () => {
        history.push('/tela2/testador');
    }

    return (
        <C.Container>
            <C.Titulo>Homepage</C.Titulo>
            <button onClick={handleButtonClick}>Ir para Tela 2</button>
        </C.Container>
    );
}