import { styled } from "styled-components";

export const CartArea = styled.div`
    background-color: #E35319;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    position: fixed;
    bottom: 0;
    right: 30px;
`;

export const CartHeader = styled.div`
    width: 290px;
    height: 50px;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

export const CartIcon = styled.img`
    width: 23px;
    height: auto;
    margin-left: 10px;
    margin-right: 10px;
`;

export const CartText = styled.div`
    color: #fff;
    font-size: 16px;
    flex: 1;
`;

export const CartBody = styled.div<{show: string}>`
    display: ${props=>props.show === 'true' ? 'block' : 'none'};
    color: #fff;
    margin: 10px;
`;

export const ProductsArea = styled.div``;
export const ProductItem = styled.div`
    display: flex;
    margin: 10px 0;
`;
export const ProductPhoto = styled.img`
    width: 64px;
    height: auto;
    border-radius: 10px;
`;
export const ProductInfoArea = styled.div`
    flex: 1;
    margin-left: 10px;
`;
export const ProductName = styled.div`
    font-size: 13px;
    font-weight: bold;
`;
export const ProductPrice = styled.div`
    font-size: 12px;
`;
export const ProductQuantityArea = styled.div`
    display: flex;
    align-items: center;
`;
export const ProductQtIcon = styled.img`
    width: 13px;
    height: auto;
    cursor: pointer;
`;
export const ProductQtText = styled.div`
    font-size: 13px;
    font-weight: bold;
    margin: 0px 5px;
`;

export const AddressArea = styled.div` 
    margin: 15px 0 10px;
`;
export const AddressTitle = styled.h2` 
    font-size: 15px;
`;
export const AddressInfosArea = styled.div` 
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
`;
export const AddressEditIcon = styled.img` 
    width: 15px;
    height: auto;
    cursor: pointer;
`;
export const CouponArea = styled.div` 
    margin: 15px 0 10px;
    display: flex;
    flex-direction: column;
`;
export const CouponTitle = styled.h2` 
    font-size: 15px;
`;
export const CouponInput = styled.input`
    margin: 10px 0;
    border-radius: 7px;
    outline: none;
    border: none;
    padding: 3px 10px;
    font-size: 13px;
`;
export const ValuesArea = styled.div` 
    margin: 10px 0 14px;
`;
export const ValuesItem = styled.div` 
    display: flex;
    justify-content: space-between;
    margin-bottom: 3px;
    font-size: 13px;
    font-weight: bold;
`;
export const ButtonCheckout = styled.button` 
    width: 90%;
    margin: auto;
    display: block;
    background-color: #FA8229;
    border: none;
    padding: 7px;
    color: #fff;
    border-radius:12px;
`;