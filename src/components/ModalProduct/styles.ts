import { styled } from "styled-components";

export const Container = styled.div`
    max-width: 650px;
    padding: 20px;
`;
export const ProductArea = styled.div`
    display: flex;
    @media (max-width: 560px) {
        flex-direction: column;
        gap: 15px;
    }
`;
export const ProductButtons = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: end;
    align-items: end;
    @media (max-width: 430px) {
        flex-direction: column;
        gap: 10px;
    }
`;
export const ProductPhoto = styled.img`
    width: 50%;
    max-width: 310px;
    aspect-ratio: 300/200;
    border-radius: 10px;
    @media (max-width: 560px) {
        align-self: center;
        width: 100%;
    }
`;
export const ProductInfoArea = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
    @media (max-width: 560px) {
        gap: 10px;
    }
`;
export const ProductDetails = styled.div`

`;
export const ProductQuantityArea = styled.div`
    height: 50px;
    display: flex;
    justify-content: space-between;
`;
export const ProductName = styled.div`
    font-size: 30px;
    line-height: 27px;
    font-weight: bold;
    @media (max-width: 560px) {
        font-size: 25px;
    }
`;
export const ProductCalories = styled.div`
    font-size: 14px;
    @media (max-width: 560px) {
        font-size: 12px;
    }
`;
export const ProductButton = styled.button<{small?: string}>`
    border: 0;
    background-color: #E35319;
    box-shadow: 4px 5px 0px rgba(0, 0, 0, 0.16);
    color: #fff;
    font-size:  ${props=>props.small ? '13px': '22px'};
    font-weight: bold;
    padding: ${props=>props.small ? '5px 10px': '10px 20px'};
    margin-left: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: all ease .3s;
    &:hover {
        background-color: #e14e13;
        box-shadow: 4px 5px 0px rgba(0, 0, 0, 0.26);
    }
    @media (max-width: 560px) {
        font-size:  ${props=>props.small ? '12px': '20px'};
        padding: ${props=>props.small ? '5px 10px': '8px 16px'};
    }
`;
export const ProductQuantity = styled.div`
    display: flex;
    align-items: center;
    background-color: #E35319;
    border-radius: 5px;
`;
export const ProductQtImage = styled.img`
    width: 24px;
    height: auto;
    margin-right: 10px;
    margin-left: 10px;
    cursor: pointer;
    @media (max-width: 560px) {
        width: 18px;
    }
`;
export const ProductQtText = styled.div`
    font-size: 25px;
    font-weight: bold;
    color: #fff;
    @media (max-width: 560px) {
        font-size: 22px;
    }
`;
export const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: bold;
    @media (max-width: 560px) {
        font-size: 25px;
        margin: auto 0;
    }
`;