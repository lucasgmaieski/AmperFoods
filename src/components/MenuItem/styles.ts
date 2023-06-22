import { styled } from "styled-components";
import { Link } from 'react-router-dom';

export const LinkArea = styled(Link)<{active: string}>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    background-color: ${props => props.active == 'true' ? '#FA8229' : 'transparent'};
    border-radius: 10px;
    margin-bottom: 10px;
`;
export const LinkIcon = styled.img`
    width: 34px;
    height: auto;
`;