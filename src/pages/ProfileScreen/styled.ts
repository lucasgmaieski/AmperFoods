import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    margin: 15px;
`;
export const Titulo = styled.div`
    font-size: 20px;
    color: #000;
    margin: 20px 0;
`;
export const FormArea = styled.div`
    position: relative;
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    max-width: 400px;
    margin: 30px auto;
    p {
        margin-bottom: 15px;
    }
`;
export const Label = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 7px;
    font-weight: 600;
    color: #FA8229;
`;
export const Input = styled.input`
    padding: 10px 10px;
    border: none;
    outline: none;
    background-color: #f9f9f9;
    border-bottom: 1px solid #FA8229;
`;
export const ButtonSave = styled.input`
    width: 100%;
    margin: auto;
    display: block;
    background-color: #FA8229;
    border: none;
    margin-top: 20px;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    text-transform: uppercase;
    border-radius:10px;
    cursor: pointer;
    transition: all ease .3s;
    &:hover {
        background-color: #f17a22;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.36);
    }
`;
export const ButtonsArea = styled.div`
    display: flex;
    margin-top: 20px;
    gap: 10px;
    justify-content: end;
`;
export const Button = styled.button`
    background-color: #fff;
    border-radius: 5px;
    border: none;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    padding: 7px;
    cursor: pointer;
    color: #E3531a;
    transition: all ease .3s;
    text-transform: uppercase;
    &:hover {
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.36);
        background-color: #f7f7f7;
    }
`;