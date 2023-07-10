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
export const FormArea = styled.form`
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    max-width: 400px;
    margin: 0 auto;
    p {
        margin-bottom: 15px;
    }
`;
export const Label = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 25px;
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
    padding: 10px;
    color: #fff;
    border-radius:10px;
    cursor: pointer;
`;

export const ButtonSignOut = styled.button`
    background-color: #fff;
    border-radius: 5px;
    border: none;
    padding: 7px;
    cursor: pointer;
    color: #E3531a;
`