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
    margin: 10px 0;
`;

export const Button = styled.button`
    background-color: #fff;
    border-radius: 5px;
    border: none;
    padding: 7px;
    cursor: pointer;
    color: #E3531a;
    a {
        text-decoration: none;
        color: #E3531a;
    }
`;

export const OrdersArea = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    color: #fff;
    @media (max-width: 991px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 660px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;
