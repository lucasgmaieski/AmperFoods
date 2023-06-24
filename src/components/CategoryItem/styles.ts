import { styled } from "styled-components";


export const Container = styled.div<{active: number, ident: number}>`
    width: 80px;
    height: 80px;
    background-color: ${props=>props.active == props.ident ? '#fff': '#ffc64e'};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    margin-right: 10px;
    cursor: pointer;
    transition: all ease .3s;
`;
export const CategoryImage = styled.img`
    width: 55px;
    height: 55px;
`;