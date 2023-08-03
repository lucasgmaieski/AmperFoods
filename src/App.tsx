import * as C from './App.styled';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Tooltip} from 'react-tooltip';
import HomeScreen from './pages/HomeScreen';
import { MenuItem } from './components/MenuItem';
import { PrivateRoute } from './components/PrivateRoute';
import { Cart } from './components/Cart';
import { OrdersScreen } from './pages/OrdersScreen';
import { ProfileScreen } from './pages/ProfileScreen';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export default () => {
    return (
        <BrowserRouter>
            <C.Container>
                <C.Menu>
                    <MenuItem title="Loja" icon="/public/store.png" link="/"/>
                    <MenuItem title="Pedidos" icon="/public/order.png" link="/orders"/>
                    <MenuItem title="Perfil" icon="/public/profile.png" link="/profile"/>
                </C.Menu>
                <C.PageBody>
                    <Routes>
                        <Route path="/" element={<HomeScreen />} />
                        <Route path="/orders" element={<PrivateRoute><OrdersScreen /></PrivateRoute>} />
                        <Route path="/profile" element={<PrivateRoute><ProfileScreen /></PrivateRoute>} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </C.PageBody>
                <Cart />
                <Tooltip id="tip-top" place="top" float={false}/>
                <Tooltip id="tip-right" place="right" float={false}/>
            </C.Container>

        </BrowserRouter>
    );
}