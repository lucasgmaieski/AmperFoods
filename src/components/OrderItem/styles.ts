import { styled } from "styled-components";

export const Container = styled.div`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    padding: 15px;
    align-items: center;
    color: #E35319;
    cursor: pointer;
    outline: 4px solid transparent;

    position: relative;
    transition: all ease .4s;

    &:hover {
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.56);
        background-color: #f7f7f7;
    }
`;
export const UpperArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
`;
export const Date = styled.div``;
export const Status = styled.div``;
export const LowerArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;
export const Address = styled.div`

`;
export const Amount = styled.div`
    min-width: 80px;
    text-align: end;
`;
