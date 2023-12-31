import styled from "styled-components";

export const Container = styled.div`
    max-width: 650px;
    padding: 20px;
    color: #000;
`;
export const ProductButtons = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: end;
    align-items: end;
    @media (max-width: 430px) {
        flex-direction: column;
        gap: 10px;
    }
`;
export const ProductButton = styled.button<{small?: string, editing?: string}>`
    border: 0;
    background-color: #E35319;
    box-shadow: 4px 5px 0px rgba(0, 0, 0, 0.16);
    color: #fff;
    font-size:  ${props=>props.small ? '13px': '22px'};
    font-weight: bold;
    padding: ${props=>props.small ? '5px 10px': '10px 20px'};
    margin-left: 10px;
    border-radius: 5px;
    cursor: ${props=>props.editing == 'true' ? 'not-allowed' : 'pointer'};
    transition: all ease .3s;
    &:hover {
        background-color: #e14e13;
        box-shadow: 4px 5px 0px rgba(0, 0, 0, 0.26);
    }
    @media (max-width: 560px) {
        font-size:  ${props=>props.small ? '12px': '20px'};
        padding: ${props=>props.small ? '5px 10px': '8px 16px'};
    }
`;
export const AddressArea = styled.div`
    display: flex;
    margin: 15px 0;
`;
export const AddressInput = styled.textarea<{edit: string}>`
    flex: 1;
    font-size: 16px;
    width: 100%;
    border: ${props=>props.edit === 'true' ? '1px solid #e35319' : '1px solid transparent'};
    transition: border-color .5s ;
 
    &:focus-visible {
        outline: 0;
    }
`;
export const AddressButton = styled.div`
    cursor: pointer;
    margin-left: 5px;
    svg {
        width: 1.5rem;
        height: 1.5rem; 
    }
`;
export const AddressSaveButton = styled(AddressButton)<{edit?: string, disable: string}>`
    transition: opacity ease 0.5s;
    opacity: ${props=>props.edit === 'true' ? '1': '0'};
    display: ${props=>props.edit === 'true' ? 'block': 'none'};
    pointer-events: ${props=>props.disable === 'false' ? 'auto': 'none'};
`;
export const TotalPayable = styled.div` 
    display: flex;
    justify-content: space-between;
    margin-bottom: 3px;
    font-size: 16px;
    font-weight: bold;
    margin: 10px 0;
`;