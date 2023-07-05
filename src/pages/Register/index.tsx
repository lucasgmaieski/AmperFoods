import { ChangeEvent, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import * as C from './styled';
import { setInfo, setName, setToken } from '../../redux/reducers/UserReducer';
import { persistor } from '../../redux/store';

import { auth, firestore } from '../../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';


export const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [aa, setAa] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [addressInput, setAddressInput] = useState('');
    const [phoneInput, setPhoneInput] = useState('');
    const name = useAppSelector(state => state.persistedReducer.user.name);
    
    
    const handleSignUp = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, emailInput, passwordInput);
        const user = userCredential.user;
    
        console.log("Usuário criado e logado automaticamente com uid: " + user.uid);
    
        if (user) {
            const userDocRef = doc(firestore, 'users', user.uid);
            const userData = { name:nameInput, email: user.email, phone: phoneInput, address: addressInput };
        
            await setDoc(userDocRef, userData);

            dispatch(setToken({ token: user.getIdTokenResult()}));
            dispatch( setInfo({
                name: nameInput,
                email: emailInput,
                phone: phoneInput,
                address: addressInput
            }));
            setNameInput('');
            setEmailInput('');
            setAddressInput('');
            setPhoneInput('');
            setPasswordInput('');
            navigate('/profile');
        }

      } catch (error:any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // Trate qualquer erro ocorrido durante o processo
      }
    };
    

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
        if(e.target.id == 'password') {
            setPasswordInput(e.target.value);
        }
    }


    return (
        <C.Container>
            <C.Titulo>Por favor digite suas informações de Cadastro</C.Titulo>

            <C.FormArea onSubmit={handleSignUp}>
                <C.InputArea>
                    <C.Label htmlFor="name">Nome:</C.Label>
                    <C.Input type="text" name="name" id="name" value={nameInput} onChange={handleInputChange}/>
                </C.InputArea>
                
                <C.InputArea>
                    <C.Label htmlFor="email">Email:</C.Label>
                    <C.Input type="email" name="email" id="email" value={emailInput} onChange={handleInputChange}/>
                </C.InputArea>
                    
                <C.InputArea>
                    <C.Label htmlFor="phone">Telefone:</C.Label>
                    <C.Input type="tel" name="phone" id="phone" value={phoneInput} onChange={handleInputChange}/>
                </C.InputArea>
                
                <C.InputArea>
                    <C.Label htmlFor="address">Endereço:</C.Label>
                    <C.Input type="text" name="address" id="address" value={addressInput} onChange={handleInputChange}/>
                </C.InputArea>
                <C.InputArea>
                    <C.Label htmlFor="password">Senha:</C.Label>
                    <C.Input type="password" name="password" id="password" value={passwordInput} onChange={handleInputChange}/>
                </C.InputArea>
                    
                <C.Submit>Cadastrar</C.Submit>
                <p>Você já tem uma conta?</p>
                <Link to={'/login'} >Acesse sua conta aqui</Link>
            </C.FormArea>
        </C.Container>
    );
}