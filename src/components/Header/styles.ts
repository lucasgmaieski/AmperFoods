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
    margin: auto;
`;
export const SocialArea = styled.div`
    display: flex;
    
    a {
        padding: 5px 5px 2px;
        border-radius: 7px;
        display: block;
        margin-left: 10px;
        background-color: #FA8229;
        transition: all ease .3s;

        &:hover {
            transform: translateY(-3px);
            color: #fff;
        }

        svg {
            color: #fff;
            font-size: 1.7rem;
            
        }
    }
`;