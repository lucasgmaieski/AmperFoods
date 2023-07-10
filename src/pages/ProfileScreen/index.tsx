import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import * as C from './styled';
import { clearInfos, setInfo, setName } from '../../redux/reducers/UserReducer';
import { clearCart } from '../../redux/reducers/CartReducer';
import { clearOrders } from '../../redux/reducers/OrdersReducer';
import { Header } from '../../components/Header';
import { deleteUser, signOut } from 'firebase/auth';
import { auth, db } from '../../services/firebaseConfig';
import { useIdToken } from 'react-firebase-hooks/auth';
import { deleteDoc, doc } from 'firebase/firestore';


export const ProfileScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [headerSearch, setHeaderSerach] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [addressInput, setAddressInput] = useState('');
    const [phoneInput, setPhoneInput] = useState('');
    const [saveSuccess, setSaveSuccess] = useState(false);

    const userInfos = useAppSelector(state => state.persistedReducer.user);

    useEffect(()=>{
        setUserInfos();
    }, [])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.id == 'name') {
            setNameInput(e.target.value);
        }
        if(e.target.id == 'phone') {
            setPhoneInput(e.target.value);
        }
        if(e.target.id == 'email') {
            setEmailInput(e.target.value);
        }
        if(e.target.id == 'address') {
            setAddressInput(e.target.value);
        }
    }

    const handleSaveButton = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch( setInfo({
            name: nameInput,
            email: emailInput,
            phone: phoneInput,
            address: addressInput
        }));
        setUserInfos();
        setSaveSuccess(true);
    }

    const setUserInfos = () => {
        setNameInput(userInfos.name);
        setAddressInput(userInfos.address);
        setEmailInput(userInfos.email);
        setPhoneInput(userInfos.phone);
    }

    const handleLogout = () => {
        console.log('antes de entrar no signOut');
        console.log(auth.currentUser?.email);
        console.log(auth.currentUser?.getIdTokenResult);

        signOut(auth).then(()=> {
            console.log("fazendo logout...");
            console.log(auth.currentUser?.email);
            console.log(auth.currentUser?.getIdTokenResult);
            dispatch( clearInfos({}));
            dispatch( clearCart({}));
            dispatch( clearOrders({}));
        }).catch((error)=> {
          console.error(error);
        })   
    }
    const handleDeleteAccount = async() => {
        const user = auth.currentUser;
        if(user) {
            const uid = user.uid;
            try {
                const userDocRef = doc(db, 'users', uid);
                await deleteDoc(userDocRef);
          
                // Documento do usuário excluído com sucesso
                console.log('deletando documento do usuario do banco');
                // Usuário excluído com sucesso
            } catch (error) {
                // Ocorreu um erro ao excluir os dados do usuário ou a conta do usuário
                console.error(error);
            }

            deleteUser(user).then(() => {
                // User deleted.
                console.log('deletando usuario');
                dispatch( clearInfos({}));
                dispatch( clearCart({}));
                dispatch( clearOrders({}));
            }).catch((error) => { 
                console.error(error); 
            });
        }
    }
    return (
        <C.Container>
            <Header search={headerSearch} onSearch={setHeaderSerach}/>
            
            <C.ButtonSignOut onClick={handleLogout}>Sair</C.ButtonSignOut>
            <C.ButtonSignOut onClick={handleDeleteAccount}>Excluir Conta</C.ButtonSignOut>
            <C.FormArea onSubmit={handleSaveButton}>
                <C.Titulo>Olá, <strong>{userInfos.name.trim().split(" ")[0]}</strong> </C.Titulo>
                <p>Aqui você pode alterar suas informações pessoais.</p>
                <C.Label>
                    Nome:
                    <C.Input type="text" id="name" value={nameInput} onChange={handleInputChange}/>
                </C.Label>
                <C.Label>
                    Email:
                    <C.Input type="email" id="email" value={emailInput} onChange={handleInputChange}/>
                </C.Label>
                <C.Label>
                    Telefone:
                    <C.Input type="tel" id="phone" value={phoneInput} onChange={handleInputChange}/>
                </C.Label>
                <C.Label>
                    Endereço:
                    <C.Input type="text" id="address" value={addressInput} onChange={handleInputChange}/>
                </C.Label>
                <C.ButtonSave type="submit" value="salvar"/>
                {saveSuccess && 
                    <h4>Salvo com sucesso.</h4>
                }
            </C.FormArea>
            <p>current user email{auth.currentUser?.email}</p>
            <C.Titulo>Perfil do usuário: <strong>{userInfos.name}</strong> </C.Titulo>
        </C.Container>
    );
}