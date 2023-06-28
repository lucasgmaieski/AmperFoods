import React, {useState} from 'react';
import * as C from './styles';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { changeProduct } from '../../redux/reducers/CartReducer';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useAppSelector(state => state.persistedReducer.cart.products);

    const [show, setShow] = useState(false);
    const handleCartClick = () => {
        setShow(!show);
    };

    const handleProductChange = (key: number, type: string) => {
        dispatch( changeProduct({
            key, type
        }));
    };

    const handleCheckout = () => {

        
        navigate('/orders');
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
                        <div>
                            minha casa <br />
                            Rua Iguaçu, 200 <br />
                            Ampére, PR
                        </div>
                        <C.AddressEditIcon src="/assets/edit.png" />
                    </C.AddressInfosArea>
                </C.AddressArea>
                <C.CouponArea>
                    <C.CouponTitle>Cupom de desconto</C.CouponTitle>
                    <C.CouponInput type="text" value="AMPERFOODS10"/>
                </C.CouponArea>
                <C.ValuesArea>
                    <C.ValuesItem>
                        <span>Desconto</span>
                        <span>R$ 15,99</span>
                    </C.ValuesItem>
                    <C.ValuesItem>
                        <span>Taxa de entrega</span>
                        <span>R$ 4,99</span>
                    </C.ValuesItem>
                    <C.ValuesItem>
                        <span>Total</span>
                        <span>R$ 20,99</span>
                    </C.ValuesItem>
                </C.ValuesArea>
                <C.ButtonCheckout onClick={handleCheckout}>Finalizar Compra</C.ButtonCheckout>
            </C.CartBody>
        </C.CartArea>
    )
}