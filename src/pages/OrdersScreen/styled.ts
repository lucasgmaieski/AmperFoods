import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    margin: 15px;
`;

export const HeaderList = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    color: #fff;
    margin: 20px 0;
`;

export const Button = styled.button`
    background-color: #fff;
    border-radius: 5px;
    border: none;
    padding: 7px;
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    color: #E3531a;
    transition: all ease .3s;
    text-transform: uppercase;

    &:hover {
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.36);
        background-color: #f7f7f7;
    }

    a {
        text-decoration: none;
        color: #E3531a;
    }
`;

export const OrdersArea = styled.div<{orderOpenIndex:number}>`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    color: #fff;
    
    >div:nth-child(${props=>props.orderOpenIndex +1 }) {
        outline: 4px solid #E3531a;
        /* border-style: inset; */
    }
    @media (max-width: 991px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 660px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;
export const NoProductsArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    color: #E3531a;
    border-radius: 10px;
    max-width: 500px;
    width: 100%;
    padding: 20px;
    margin: 30px auto;
    @media (max-width: 660px) {
        gap: 15px;
        flex-direction: column;
    }
`;