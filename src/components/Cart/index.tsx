import React, {ChangeEvent, useEffect, useState} from 'react';
import * as C from './styles';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { changeProduct, clearCart } from '../../redux/reducers/CartReducer';
import { useNavigate } from 'react-router-dom';
import { formattedCurrentDate } from '../../helpers/dataHelper';
import { saveOrder } from '../../redux/reducers/OrdersReducer';
import { Modal } from '../Modal';
import { ModalCheckout } from '../ModalCheckout';
import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../services/firebaseConfig';
import { setInfo, setToken } from '../../redux/reducers/UserReducer';

export const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useAppSelector(state => state.persistedReducer.cart.products);
    const userInfos = useAppSelector(state => state.persistedReducer.user);
    const [coupon, setCoupon] = useState('AMPERFOODS10');
    const [amount, setAmount] = useState(0);
    const delivery = 5;
    const discount = 10;
    const totalPayable = amount + delivery - (discount*amount*0.01);

    const [show, setShow] = useState(false); //-------

    const [modalStatus, setModalStatus] = useState(false);
    const [confirmOrderStatus, setConfirmOrderStatus] = useState(false);


    useEffect(()=>{
        setAmount(products.reduce((accumulator, product) => {
            return accumulator + (product.qt * product.price);
        }, 0));
        
        // console.log(amount);
        const dataAtual = new Date();
        // console.log(dataAtual);
        // console.log(formattedCurrentDate());
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
                    console.log("pedido adicionado com sucesso ")
                    // Pedido adicionado com sucesso à subcoleção "pedidos" dentro do documento do usuário
                  } catch (error) {
                    // Ocorreu um erro ao adicionar o pedido
                    console.error(error);
                  }
                }
            };
            adicionarPedido();

            dispatch( clearCart({}))
            setModalStatus(false);
            setShow(false);
            navigate('/orders');
        } else if (confirmOrderStatus && !userInfos.token) {
            setModalStatus(false);
            setShow(false);
            console.log('você não esta logado para fazer pedido. Faça login');
            navigate('/login');
        } else {
            
        }

        setConfirmOrderStatus(false);
    }, [confirmOrderStatus]);

    const handleCartClick = () => {
        setShow(!show);
    };

    const handleProductChange = (key: number, type: string) => {
        dispatch( changeProduct({
            key, type
        }));
    };

    const handleCouponInput = (e: ChangeEvent<HTMLInputElement>) => {
        setCoupon(e.target.value);
    }

    const handleCheckoutClick = () => {
        setModalStatus(true);
    }
    return (
        <C.CartArea>
            <C.CartHeader onClick={handleCartClick}>
                <C.CartIcon src="/assets/cart.png"/>
                <C.CartText>Meu Carrinho ({products.length})</C.CartText>
                {show && 
                    <C.CartIcon src="/assets/down.png"/>
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
                                src="/assets/minus.png"
                                onClick={()=>handleProductChange(index, '-')}
                            />
                            <C.ProductQtText>{item.qt}</C.ProductQtText>
                            <C.ProductQtIcon 
                                src="/assets/plus.png"
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
                <ModalCheckout totalPayable={totalPayable} setModalStatus={setModalStatus} setConfirmOrderStatus={setConfirmOrderStatus}/>
            </Modal>
        </C.CartArea>
    )
}