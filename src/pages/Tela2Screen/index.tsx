import { ChangeEvent } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import * as C from './styled';
import { setName } from '../../redux/reducers/UserReducer';

export default () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let { nome } = useParams();

    const name = useAppSelector(state => state.user.name);

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch( setName(e.target.value));
    }

    return (
        <C.Container>
            <C.Titulo>Tela2 de {nome}</C.Titulo>

            <input type="text" value={name} onChange={handleTextChange} />

            <button onClick={()=>navigate(-1)}>Voltar</button>
        </C.Container>
    );
}