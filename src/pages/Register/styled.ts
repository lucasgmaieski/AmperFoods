import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    padding: 15px;
`;
export const Titulo = styled.h2`
    text-align: center;
    color: #FA8229;
    margin-bottom: 15px;
`;
export const ContainerForm = styled.div`
    padding-bottom: 40px;
`;
export const FormArea = styled.form`
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    max-width: 400px;
    margin: 3vh auto;
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
    margin:  20px auto;
    display: block;
    background-color: #FA8229;
    border: none;
    padding: 10px 20px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    color: #fff;
    font-weight: 700;
    border-radius:12px;
    cursor: pointer;
    transition: all ease .3s;
    &:hover {
        background-color: #f17a22;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.36);
    }
`;