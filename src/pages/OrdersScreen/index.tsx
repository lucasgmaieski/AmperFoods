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
import { Helmet } from 'react-helmet';
import { Loader } from '../../components/Loader';

export const OrdersScreen = () => {
    const dispatch = useDispatch();
    const [orderOpenIndex, setOrderOpenIndex] = useState(0)
    const componenteBRef = useRef<HTMLInputElement>(null);
    const [loadingPage, setLoadingPage] = useState(true);

    const getOrders = useAppSelector(state => state.persistedReducer.orders.orders);

    useEffect(()=> {
        setTimeout(() => {
            setLoadingPage(false);
        }, 500);
    }, []);

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
            setLoadingPage(true);
            const uid = user.uid;
            try {
                const userDocRef = doc(db, 'users', uid);
                const ordersQuerySnapshot = await getDocs(collection(userDocRef, 'orders'));
          
                const deletePromises = ordersQuerySnapshot.docs.map((doc) => deleteDoc(doc.ref));
                await Promise.all(deletePromises);
                
              } catch (error) {
                console.error(error);
              }
              dispatch(clearOrders());
              setLoadingPage(false);
        } else {
            console.log('Não existe usuário');
        }
    }
        
    return (
        <C.Container ref={componenteBRef}>
            <Helmet>
                <meta name="robots" content="noindex, nofollow"/>
                <meta name="og:title" content="Pedidos - Amper Foods"/>
                <meta property="og:url" content="https://amper-foods.vercel.app/orders"/>
                <title>Pedidos - Amper Foods</title>
            </Helmet>
            <Header />
            {getOrders.length > 0 && !loadingPage &&
                <OrderOpen data={getOrders[orderOpenIndex]}/>
            }
            <C.HeaderList>
                {getOrders.length > 0 && !loadingPage &&
                    <>
                        <h3>Histórico de pedidos</h3>
                        <C.Button onClick={handleClearOrders}>
                            <FiTrash2 /> Limpar Hístórico
                        </C.Button>
                    </>
                }
            </C.HeaderList>
            {getOrders.length == 0 && !loadingPage &&
                <C.NoProductsArea>
                    <p>Você ainda não tem pedidos registrados.</p>
                    <C.Button>
                        <Link to={'/'}>Faça um Pedido</Link>
                    </C.Button>
                </C.NoProductsArea>
            }
            {!loadingPage &&
                <C.ContainerOrders>
                    <C.OrdersArea orderopenindex={getOrders.length - orderOpenIndex -1}>
                        {getOrders.slice().reverse().map((order, index)=>(
                            <OrderItem key={index} data={order} onClick={handleIndexOrderOpen} index={index} componenteBRef={componenteBRef}/>
                        ))}
                    </C.OrdersArea>
                </C.ContainerOrders>
            }
            {loadingPage &&
                <C.ContainerLoaderPage>
                    <Loader status={true} loadingFinish={false} isError={false} message='' dark={false}/>
                </C.ContainerLoaderPage>
            }
        </C.Container>
    );
}