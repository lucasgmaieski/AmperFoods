import { ChangeEvent, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import * as C from './styled';
import { setName } from '../../redux/reducers/UserReducer';
import { persistor } from '../../redux/store';
import { Header } from '../../components/Header';
import { OrderItem } from '../../components/OrderItem';


export const OrdersScreen = () => {
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
            <C.LastOrderArea>

            </C.LastOrderArea>
            
            <C.OrdersArea>
                <OrderItem />
            </C.OrdersArea>

        </C.Container>
    );
}