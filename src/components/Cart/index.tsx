import {ChangeEvent, useEffect, useState} from 'react';
import * as C from './styles';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { changeProduct, clearCart } from '../../redux/reducers/CartReducer';
import { Link, useNavigate } from 'react-router-dom';
import { formattedCurrentDate } from '../../helpers/dataHelper';
import { saveOrder } from '../../redux/reducers/OrdersReducer';
import { Modal } from '../Modal';
import { ModalCheckout } from '../ModalCheckout';
import { addDoc, collection, doc} from 'firebase/firestore';
import { auth, db } from '../../services/firebaseConfig';
import { Loader } from '../Loader';

export const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [loadingFinish, setLoadingFinish] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const products = useAppSelector(state => state.persistedReducer.cart.products);
    const userInfos = useAppSelector(state => state.persistedReducer.user);
    const [coupon, setCoupon] = useState('AMPERFOODS10');
    const [amount, setAmount] = useState(0);
    const delivery = 5;
    const discount = 10;
    const totalPayable = amount + delivery - (discount*amount*0.01);
    const [show, setShow] = useState(false);

    const [modalStatus, setModalStatus] = useState(false);
    const [confirmOrderStatus, setConfirmOrderStatus] = useState(false);


    useEffect(()=>{
        setAmount(products.reduce((accumulator, product) => {
            return accumulator + (product.qt * product.price);
        }, 0));
    }, [products]);

    useEffect(()=>{
        //preencher as ordens e limpar o carrinho
        if(confirmOrderStatus && userInfos.token) {
            dispatch( saveOrder({
                date: formattedCurrentDate(),
                status: 1,
                address: userInfos.address,
                discount: discount,
                delivery: delivery,
                amount: amount,
                totalPayable: totalPayable,
                products: products
            }));

            const adicionarPedido = async () => {
                const user = auth.currentUser;
                if (user) {
                  const uid = user.uid;
              
                  try {
                    const userDocRef = doc(db, 'users', uid);
                    const pedidosSubcollectionRef = collection(userDocRef, 'orders');
                    await addDoc(pedidosSubcollectionRef, {
                        date: formattedCurrentDate(),
                        status: 1,
                        address: userInfos.address,
                        discount: discount,
                        delivery: delivery,
                        amount: amount,
                        totalPayable: totalPayable,
                        products: products
                    });
                    console.log("pedido adicionado com sucesso ");
                    // Pedido adicionado com sucesso à subcoleção "orders" dentro do documento do usuário
                    dispatch( clearCart())
                    setLoading(true);
                    setLoadingFinish(true);
                    setMessage('Pedido Confirmado!');
                    setTimeout(() => {
                        setLoading(false);
                        navigate('/orders');
                        setModalStatus(false);
                        setShow(false);
                    }, 2500);
                  } catch (error) {
                    console.error(error);
                    setLoading(true);
                    setLoadingFinish(true);
                    setError(true);
                    setMessage('Não foi possível confirmar seu pedido, tente novamente!');
                    setTimeout(() => {
                        setLoading(false);
                        setLoadingFinish(false);
                        setError(false);
                        setMessage('');
                    }, 2500);
                  }
                }
            };
            adicionarPedido();

        } else if (confirmOrderStatus && !userInfos.token) {
            setLoading(true);
            setMessage('Você ainda não esta logado. Faça login para confirmar seu pedido!');
            setTimeout(() => {
                setLoadingFinish(true);
                setError(true);
            }, 800);
        } else {}

        setConfirmOrderStatus(false);
    }, [confirmOrderStatus]);

    useEffect(()=> {
        setLoading(false);
        setLoadingFinish(false);
        setError(false);
        setMessage('');
    }, [modalStatus]);

    const handleCartClick = () => {
        setShow(!show);
    };

    const handleProductChange = (key: number, type: string) => {
        dispatch( changeProduct({ key, type }));
    };

    const handleCouponInput = (e: ChangeEvent<HTMLInputElement>) => {
        setCoupon(e.target.value);
    }

    const handleCheckoutClick = () => {
        setModalStatus(true);
    }
    const handleGoLogin = () => {
        setModalStatus(false);
        setShow(false);
    }
    return (
        <C.CartArea>
            <C.CartHeader onClick={handleCartClick}>
                <C.CartIcon src="../assets/cart.png"/>
                <C.CartText>Meu Carrinho ({products.length})</C.CartText>
                {show && 
                    <C.CartIcon src="../assets/down.png"/>
                }
            </C.CartHeader>
            <C.CartBody show={show.toString()}>
                <C.ProductsArea>
                    {products.map((item, index)=> (
                    <C.ProductItem key={index}>
                        <C.ProductPhoto src={item.image} />
                        <C.ProductInfoArea>
                            <C.ProductName>{item.name}</C.ProductName>
                            <C.ProductPrice>R$ {item.price.toFixed(2)}</C.ProductPrice>
                        </C.ProductInfoArea>
                        <C.ProductQuantityArea>
                            <C.ProductQtIcon 
                                src="../assets/minus.png"
                                onClick={()=>handleProductChange(index, '-')}
                            />
                            <C.ProductQtText>{item.qt}</C.ProductQtText>
                            <C.ProductQtIcon 
                                src="../assets/plus.png"
                                onClick={()=>handleProductChange(index, '+')}
                            />
                        </C.ProductQuantityArea>
                    </C.ProductItem>
                    ))}
                </C.ProductsArea>
                <C.AddressArea>
                    <C.AddressTitle>Entrega</C.AddressTitle>
                    <C.AddressInfosArea>
                        <C.AddressText>
                            {userInfos.address}
                        </C.AddressText>
                        {/* <C.AddressEditIcon src="/assets/edit.png" /> */}
                    </C.AddressInfosArea>
                </C.AddressArea>
                <C.CouponArea>
                    <C.CouponTitle>Cupom de desconto</C.CouponTitle>
                    <C.CouponInput type="text" value={coupon} onChange={handleCouponInput}/>
                </C.CouponArea>
                <C.ValuesArea>
                    <C.ValuesItem>
                        <span>Produtos</span>
                        <span>R$ {amount.toFixed(2)}</span>
                    </C.ValuesItem>
                    <C.ValuesItem>
                        <span>Taxa de entrega</span>
                        <span>R$ {delivery.toFixed(2)}</span>
                    </C.ValuesItem>
                    <C.ValuesItem>
                        <span>Desconto</span>
                        <span>R$ {amount ? (discount*(amount+delivery)*0.01).toFixed(2) : '0.00'} ({discount}%)</span>
                    </C.ValuesItem>
                    <C.ValuesItem>
                        <span>Total</span>
                        <span>R$ {amount ? (amount + delivery - (discount*amount*0.01)).toFixed(2) : '0.00'}</span>
                    </C.ValuesItem>
                </C.ValuesArea>
                <C.ButtonCheckout onClick={handleCheckoutClick} disabled={products.length === 0}>Finalizar Compra</C.ButtonCheckout>
            </C.CartBody>
            <Modal status={modalStatus} setStatus={setModalStatus}>
                {!loading && 
                    <ModalCheckout totalPayable={totalPayable} setModalStatus={setModalStatus} setConfirmOrderStatus={setConfirmOrderStatus}/>
                }
                {loading &&
                    <C.ContainerLoader>
                        <Loader status={loading} loadingFinish={loadingFinish} isError={error} message={message} dark={true}/>
                        {!userInfos.token && loadingFinish &&
                            <Link to={'/login'} onClick={handleGoLogin}><C.LoginButton> Fazer Login</C.LoginButton></Link>
                        }
                    </C.ContainerLoader>
                }
            </Modal>
        </C.CartArea>
    )
}