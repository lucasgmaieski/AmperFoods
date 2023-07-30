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
    setModalStatus: React.Dispatch<React.SetStateAction<boolean>>
    setConfirmDeleteAccount: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalDeleteAccount = ({setModalStatus, setConfirmDeleteAccount}: Props) => {
    const dispatch = useDispatch();
    const [addressInput, setAddressInput] = useState('');
    const address = useAppSelector(state => state.persistedReducer.user.address);
    const userInfos = useAppSelector(state => state.persistedReducer.user);
    const [editing, setEditing] = useState(false);
    const [disableButton, setDisableButton] = useState(true);



    const handleCancelButton = () => {
        setModalStatus(false);
    }
    const handleConfirmOrder = () => {
        setModalStatus(true);
        setConfirmDeleteAccount(true);
    }

    return (
        <C.Container>
            <div>Vai excluir a conta mesmo ???????????????????????????</div>
            <C.ProductButtons>
                <C.ProductButton small={'true'} onClick={handleCancelButton} title='Cancelar'>Cancelar</C.ProductButton>
                <C.ProductButton onClick={handleConfirmOrder} editing={editing.toString()} disabled={editing} title={editing ? 'Confirme a alteração do endereço' : 'Confirmar Pedido'}>Confirmar Pedido</C.ProductButton>
            </C.ProductButtons>
        </C.Container>
    )
}