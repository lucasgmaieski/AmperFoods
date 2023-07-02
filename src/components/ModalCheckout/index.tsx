import { useState, useEffect } from 'react';
import { ProdItem } from '../../types/ProdItem';
import * as C from './styles';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/reducers/CartReducer';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import { FiCheckSquare, FiEdit } from 'react-icons/fi';

type Props = {
    totalPayable: number
    setModalStatus: React.Dispatch<React.SetStateAction<boolean>>
    setConfirmOrderStatus: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalCheckout = ({totalPayable, setModalStatus, setConfirmOrderStatus}: Props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const address = useAppSelector(state => state.persistedReducer.user.address);

    const handleCancelButton = () => {
        setModalStatus(false);
    }
    const handleConfirmOrder = () => {
        setModalStatus(true);
        setConfirmOrderStatus(true);
    }

    return (
        <C.Container>
            <div>Endereço de entrega: </div>
            <C.AddressArea>
                
                <C.AddressInput type="text" value={address} edit={true}></C.AddressInput>
                <C.AddressButton><FiCheckSquare /></C.AddressButton>
                <C.AddressButton><FiEdit /></C.AddressButton>
            </C.AddressArea>
            
            <div>Tempo estimado para entrega: 30min</div>
            <C.TotalPayable>
                <span>Total</span>
                <span>R$ {totalPayable.toFixed(2)}</span>
            </C.TotalPayable>
            <C.ProductButtons>
                <C.ProductButton small={'true'} onClick={handleCancelButton}>Cancelar</C.ProductButton>
                <C.ProductButton onClick={handleConfirmOrder}>Confirmar Pedido</C.ProductButton>
            </C.ProductButtons>
        </C.Container>
    )
}