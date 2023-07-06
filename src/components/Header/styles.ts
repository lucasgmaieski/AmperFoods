import { styled } from "styled-components";


export const Container = styled.div`
    background-color: #E35319;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    div {
        max-width: 240px;
    }
`;
export const Logo = styled.img`
    max-width: 100%;
    height: auto;

`;

export const SearchInput = styled.input<{active: string}>`
    border: 0;
    border-radius: 25px;
    width: ${props=> props.active == 'true' ? 300 : 0}px;
    height: 50px;
    background-color: #fff;
    background-image: url('/assets/search-af.png');
    background-size: 30px;
    background-repeat: no-repeat;
    background-position: 10px center;
    font-size: 15px;
    outline: 0;
    padding-left: 50px;
    transition: all ease .2s;
    cursor: pointer;

    &:focus {
        cursor: text;
    }
`;