import { styled } from "styled-components";

export const Container = styled.div`
    background-color: #f0ad4e;
    color: #fff;
    font-size: .7rem;
    padding: 8px 10px;
    border-radius: 10px;
    width: fit-content;
    position: relative;
    &::before {
        content: '';
        width: 10px;
        height: 10px;
        background: #f0ad4e;
        transform: rotate(45deg);
        position: absolute;
        top: -4px;
        left: 20px;
    }
`;
