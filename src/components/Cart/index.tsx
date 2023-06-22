import React from 'react';
import * as C from './styles';

export const Cart = () => {
    return (
        <C.CartArea>
            <C.CartHeader>
                <C.CartIcon src="/assets/cart.png"/>
                <C.CartText>Meu Carrinho (x)</C.CartText>
            </C.CartHeader>
            <C.CartBody>

            </C.CartBody>
        </C.CartArea>
    )
}