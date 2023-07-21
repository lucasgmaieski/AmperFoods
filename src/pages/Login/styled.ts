import styled from 'styled-components';

export const Container = styled.div`
    width: 100%
`;

export const Titulo = styled.h1`
    text-align: center;
    color: #fff;
`;
export const FormArea = styled.form`
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    max-width: 400px;
    margin: 20px auto;
`;
export const Label = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 7px;
    color: #FA8229;
    font-weight: 600;
`;
export const Input = styled.input`
    padding: 10px 10px;
    /* border: none; */
    outline: none;
    background-color: #f9f9f9;
    border: 1px solid #FA8229;
    border-radius: 5px;
`;
export const Submit = styled.button`
    width: fit-content;
    margin: 10px auto;
    display: block;
    background-color: #FA8229;
    border: none;
    padding: 10px 20px;
    color: #fff;
    font-weight: 700;
    border-radius:12px;
    cursor: pointer;
`;