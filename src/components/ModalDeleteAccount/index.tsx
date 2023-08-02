import * as C from './styles';

type Props = {
    setModalStatus: React.Dispatch<React.SetStateAction<boolean>>
    setConfirmDeleteAccount: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalDeleteAccount = ({setModalStatus, setConfirmDeleteAccount}: Props) => {
    const handleCancelButton = () => {
        setModalStatus(false);
    }

    const handleConfirmDeleteAccount = () => {
        setConfirmDeleteAccount(true);
    }

    return (
        <C.Container>
            <p>Tem certeza que quer excluir sua conta? Todos os seus dados serão perdidos e essa ação não podera ser desfeita.</p>
            <C.Buttons>
                <C.Button small={'true'} onClick={handleCancelButton} title='Cancelar'>Cancelar</C.Button>
                <C.Button onClick={handleConfirmDeleteAccount} title={'Excluir conta permanentemanete'}>Excluir conta</C.Button>
            </C.Buttons>
        </C.Container>
    )
}