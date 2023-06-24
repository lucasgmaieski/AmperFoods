import { styled } from "styled-components";

export const Container = styled.div`
    display: flex;
    height: 100vh;
    background-color: red;
`;

export const Menu = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E35319;
    width: 80px;
    flex-direction: column;
`;

export const PageBody = styled.div`
    display: flex;
    background-color: #FE8824;
    background-image: url('/assets/bg-af.png');
    flex: 1;
    overflow-y: auto;
`;