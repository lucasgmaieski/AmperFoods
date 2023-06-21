import * as C from './App.styled';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppSelector } from './redux/hooks/useAppSelector';

import HomeScreen from './pages/HomeScreen';
import Tela2Screen from './pages/Tela2Screen';
import { MenuItem } from './components/MenuItem';

export default () => {
    const name = useAppSelector(state => state.user.name);

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
                            
                        <Route path="/tela2/:nome" element={<Tela2Screen />} />
                    </Routes>
                </C.PageBody>
            </C.Container>

        </BrowserRouter>
    );
}