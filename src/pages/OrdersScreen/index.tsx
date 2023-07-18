import { ChangeEvent, useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import * as C from './styled';
import { setInfo, setName } from '../../redux/reducers/UserReducer';
import { persistor } from '../../redux/store';
import { Header } from '../../components/Header';
import { OrderItem } from '../../components/OrderItem';
import { OrderItemType } from '../../types/OrderItem';
import { OrderOpen } from '../../components/OrderOpen';
import { FiTrash2 } from 'react-icons/fi';
import { clearOrders, saveOrder } from '../../redux/reducers/OrdersReducer';
import { collection, deleteDoc, doc, getDocs, onSnapshot, query } from 'firebase/firestore';
import { auth, db } from '../../services/firebaseConfig';

export const OrdersScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [headerSearch, setHeaderSerach] = useState('');
    const [orders, setOrders] = useState<OrderItemType[]>([]);
    const [orderOpenIndex, setOrderOpenIndex] = useState(0)
    const componenteBRef = useRef<HTMLInputElement>(null);

    const getOrders = useAppSelector(state => state.persistedReducer.orders.orders);

    useEffect(()=>{
        setOrderOpenIndex(getOrders.length -1);
    }, [getOrders]);

    const handleIndexOrderOpen = (index: number) => {
        index = getOrders.length - index -1;
        setOrderOpenIndex(index);
    }

    const handleClearOrders = async () => {
        const user = auth.currentUser;
        if(user) {
            const uid = user.uid;
            try {
                const userDocRef = doc(db, 'users', uid);
                const ordersQuerySnapshot = await getDocs(collection(userDocRef, 'orders'));
          
                const deletePromises = ordersQuerySnapshot.docs.map((doc) => deleteDoc(doc.ref));
                await Promise.all(deletePromises);
          
                // Subcoleção "orderss" excluída com sucesso
                console.log('Excluindo a subcoleção "orders" do usuário do banco');
              } catch (error) {
                // Ocorreu um erro ao excluir a subcoleção "orderss"
                console.error(error);
              }
              dispatch(clearOrders({}));
        }
    }
        
    return (
        <C.Container ref={componenteBRef}>
            <Header search={headerSearch} onSearch={setHeaderSerach}/>
            {getOrders.length != 0 && 
                <OrderOpen data={getOrders[orderOpenIndex]}/>
            }
            <C.HeaderList>
                <h3>Histórico de pedidos</h3>
                {getOrders.length != 0 && 
                    <C.Button onClick={handleClearOrders}>
                        <FiTrash2 /> Limpar Hístórico
                    </C.Button>
                }
            </C.HeaderList>
            <C.OrdersArea>
                {getOrders.slice().reverse().map((order, index)=>(
                    <OrderItem key={index} data={order} onClick={handleIndexOrderOpen} index={index} componenteBRef={componenteBRef}/>
                ))}
                {getOrders.length == 0 && <p>Você ainda não tem pedidos registrados. <C.Button>
                    <Link to={'/'}>Faça um Pedido</Link>
                </C.Button> </p> }
            </C.OrdersArea>
            <p>O índice do pedido selecionado é: {orderOpenIndex}</p>
        </C.Container>
    );
}