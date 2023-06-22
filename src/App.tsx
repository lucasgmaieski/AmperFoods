import * as C from './App.styled';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppSelector } from './redux/hooks/useAppSelector';
import { useEffect } from 'react';
import HomeScreen from './pages/HomeScreen';
import Tela2Screen from './pages/Tela2Screen';
import { MenuItem } from './components/MenuItem';
import { PrivateRoute } from './components/PrivateRoute';
import { Cart } from './components/Cart';

export default () => {
    const name = useAppSelector(state => state.persistedReducer.user.name);

    useEffect(()=> {
        
    }, [])
    return (
        <BrowserRouter>
            <C.Container>
                <C.Menu>
                    <MenuItem icon="/assets/store.png" link="/"/>
                    <MenuItem icon="/assets/order.png" link="/orders"/>
                    <MenuItem icon="/assets/profile.png" link="/profile"/>
                </C.Menu>
                <C.PageBody>
                    <Routes>
                        <Route  path="/" element={<HomeScreen />} />
                        <Route path="/orders" element={<PrivateRoute><div>tela de pedidos</div></PrivateRoute>} />
                        <Route path="/profile" element={<PrivateRoute><div>tela de perfil</div></PrivateRoute>} />
                        <Route path="/tela2/:nome" element={<Tela2Screen />} />
                        <Route path="/login" element={<div>Login</div>} />
                    </Routes>
                </C.PageBody>
                <Cart />
            </C.Container>

        </BrowserRouter>
    );
}