import styled from "styled-components";

export const Container = styled.div`
    max-width: 450px;
    padding: 20px;
    color: #000;
    p {
        color: red;
    }
`;
export const Buttons = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: end;
    align-items: end;
    @media (max-width: 430px) {
        flex-direction: column;
        gap: 10px;
    }
`;
export const Button = styled.button<{small?: string}>`
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
