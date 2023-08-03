import { styled } from "styled-components";

export const Container = styled.div`
    display: flex;
    height: 100vh;
    background-color: red;
    @media (max-width: 430px) {
        flex-direction: column;
    }
`;

export const Menu = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E35319;
    width: 80px;
    flex-direction: column;
    @media (max-width: 430px) {
        flex-direction: row;
        width: 100%;
        a {
            width: 45px;
            height: 45px;
            margin: 5px;
            img {
                width: 25px;
            }
        }
    }
`;

export const PageBody = styled.div`
    display: flex;
    background-color: #c5c5c5;
    background-image: url('/assets/bg-af2.png');
    flex: 1;
    overflow-y: auto;
`;