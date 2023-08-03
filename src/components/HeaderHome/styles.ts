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
    @media (max-width: 500px) {
        flex-direction: column;
        justify-content: center;
    }
`;
export const Logo = styled.img`
    height: auto;
    max-width: 260px;
    min-width: 210px;
    width: 100%;
`;
export const SearchInput = styled.input<{active: string}>`
    border: 0;
    border-radius: 25px;
    width: ${props=> props.active == 'true' ? 300 : 0}px;
    height: 50px;
    background-color: #fff;
    background-image: url('../assets/search-af.png');
    background-size: 30px;
    background-repeat: no-repeat;
    background-position: 10px center;
    font-size: 15px;
    outline: 0;
    padding-left: 50px;
    transition: all ease .2s;
    cursor: pointer;
    @media (max-width: 500px) {
        width: ${props=> props.active == 'true' ? '100%' : '0px'};
        max-width: 250px;
    }
    &:focus {
        cursor: text;
    }
`;