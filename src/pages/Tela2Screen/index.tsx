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

    const name = useAppSelector(state => state.persistedReducer.user.name);

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch( setName({name: e.target.value}));
        console.log(name);
    }

    return (
        <C.Container>
            <C.Titulo>Tela2 de {name}</C.Titulo>

            <input type="text" value={name} onChange={handleTextChange} />

            <button onClick={()=>navigate(-1)}>Voltar</button>
        </C.Container>
    );
}