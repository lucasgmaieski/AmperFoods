import { ChangeEvent, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import * as C from './styled';
import { setName } from '../../redux/reducers/UserReducer';
import { Header } from '../../components/Header';


export const ProfileScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [headerSearch, setHeaderSerach] = useState('');

    const name = useAppSelector(state => state.persistedReducer.user.name);

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch( setName({name: e.target.value}));
        console.log(name);
    }

    return (
        <C.Container>
            <Header search={headerSearch} onSearch={setHeaderSerach}/>

            <C.Titulo>Profile</C.Titulo>

        </C.Container>
    );
}