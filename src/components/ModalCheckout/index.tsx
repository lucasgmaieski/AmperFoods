import { useState, useEffect, ChangeEvent } from 'react';
import { ProdItem } from '../../types/ProdItem';
import * as C from './styles';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/reducers/CartReducer';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import { FiCheckSquare, FiEdit } from 'react-icons/fi';
import { setInfo } from '../../redux/reducers/UserReducer';

type Props = {
    totalPayable: number
    setModalStatus: React.Dispatch<React.SetStateAction<boolean>>
    setConfirmOrderStatus: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalCheckout = ({totalPayable, setModalStatus, setConfirmOrderStatus}: Props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [addressInput, setAddressInput] = useState('');
    const address = useAppSelector(state => state.persistedReducer.user.address);
    const userInfos = useAppSelector(state => state.persistedReducer.user);
    const [editing, setEditing] = useState(false);
    const [disableButton, setDisableButton] = useState(true);

    useEffect(()=>{
        setAddressInput(address);
        if(address.length === 0) {
            setEditing(true);
        } 
    },[]);

    useEffect(()=> {
        addressInput.length === 0 ? setDisableButton(true) : setDisableButton(false);
    }, [addressInput]);

    const handleCancelButton = () => {
        setModalStatus(false);
    }
    const handleConfirmOrder = () => {
        setModalStatus(true);
        setConfirmOrderStatus(true);
    }

    const handleSaveAddress = () => {
        if(addressInput.length !== 0) {
            setEditing(false);
            dispatch(setInfo({...userInfos, address: addressInput }))
        }
    }

    const handleEditAddress = () => {
        setEditing(true);
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddressInput(e.target.value);
    }

    return (
        <C.Container>
            <div>Endereço de entrega: </div>
            <C.AddressArea>
                
                <C.AddressInput type="text" value={addressInput} edit={editing.toString()} onChange={handleInputChange} readOnly={!editing} placeholder='Informe seu endereço'></C.AddressInput>
                <C.AddressSaveButton title='Salvar' onClick={handleSaveAddress} edit={editing.toString()} disable={disableButton.toString()}><FiCheckSquare /></C.AddressSaveButton>
                <C.AddressButton title='Editar' onClick={handleEditAddress}><FiEdit /></C.AddressButton>
            </C.AddressArea>
            
            <div>Tempo estimado para entrega: 30min</div>
            <C.TotalPayable>
                <span>Total</span>
                <span>R$ {totalPayable.toFixed(2)}</span>
            </C.TotalPayable>
            <C.ProductButtons>
                <C.ProductButton small={'true'} onClick={handleCancelButton} title='Cancelar'>Cancelar</C.ProductButton>
                <C.ProductButton onClick={handleConfirmOrder} editing={editing.toString()} disabled={editing} title={editing ? 'Confirme a alteração do endereço' : 'Confirmar Pedido'}>Confirmar Pedido</C.ProductButton>
            </C.ProductButtons>
        </C.Container>
    )
}