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