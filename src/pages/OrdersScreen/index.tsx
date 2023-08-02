import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import * as C from './styled';
import { Header } from '../../components/Header';
import { OrderItem } from '../../components/OrderItem';
import { OrderOpen } from '../../components/OrderOpen';
import { FiTrash2 } from 'react-icons/fi';
import { clearOrders} from '../../redux/reducers/OrdersReducer';
import { collection, deleteDoc, doc, getDocs} from 'firebase/firestore';
import { auth, db } from '../../services/firebaseConfig';

export const OrdersScreen = () => {
    const dispatch = useDispatch();
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
          
              } catch (error) {
                console.error(error);
              }
              dispatch(clearOrders({}));
        } else {
            console.log('Não existe usuário');
        }
    }
        
    return (
        <C.Container ref={componenteBRef}>
            <Header />
            {getOrders.length > 0 && 
                <OrderOpen data={getOrders[orderOpenIndex]}/>
            }
            <C.HeaderList>
                {getOrders.length > 0 && 
                    <>
                        <h3>Histórico de pedidos</h3>
                        <C.Button onClick={handleClearOrders}>
                            <FiTrash2 /> Limpar Hístórico
                        </C.Button>
                    </>
                }
            </C.HeaderList>
            {getOrders.length == 0 && 
                <C.NoProductsArea>
                    <p>Você ainda não tem pedidos registrados.</p>
                    <C.Button>
                        <Link to={'/'}>Faça um Pedido</Link>
                    </C.Button>
                </C.NoProductsArea>
            }
            <C.OrdersArea orderopenindex={getOrders.length - orderOpenIndex -1}>
                {getOrders.slice().reverse().map((order, index)=>(
                    <OrderItem key={index} data={order} onClick={handleIndexOrderOpen} index={index} componenteBRef={componenteBRef}/>
                ))}
            </C.OrdersArea>
            <p>item ativo {orderOpenIndex}</p>
        </C.Container>
    );
}