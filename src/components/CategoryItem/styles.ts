import { styled } from "styled-components";


export const Container = styled.div<{active: number, ident: number}>`
    max-width: 80px;
    aspect-ratio: 1/1;
    background-color: ${props=>props.active == props.ident ? '#fff': '#ffc64e'};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20%;
    margin-right: 10px;
    padding: 15px;
    cursor: pointer;
    transition: all ease .3s;
    @media (max-width: 560px) {
        padding: 8px;
        margin-right: 7px;
    }
`;
export const CategoryImage = styled.img`
    width: 100%;
    height: auto;
`;