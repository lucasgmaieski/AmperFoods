import { styled } from "styled-components";

export const Container = styled.div`
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    padding: 10px;
    display: flex;
    align-items: center;
    color: #E35319;
    cursor: pointer;
    transition: all ease .4s;

    &:hover {
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.56);
        background-color: #f7f7f7;
    }
`;
export const ProductPhotoArea= styled.div`
    width: 100px;
`;
export const ProductInfoArea= styled.div`
    flex: 1;
    margin-left: 10px;
    margin-right: 10px;
`;
export const ProductButtonArea= styled.div`

`;
export const ProductPhoto= styled.img`
    width: 100%;
    border-radius: 5px;
`;
export const ProductName= styled.div`
    font-size: 20px;
    font-weight: bold;
`;
export const ProductPrice= styled.div`
    font-size: 14px;
`;
export const ProductIngredients= styled.div`
    font-size: 11px;
`;
export const ProductButton= styled.img`
    width: 15px;
`;