import { ChangeEvent, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import * as C from './styled';
import { setName } from '../../redux/reducers/UserReducer';
import { persistor } from '../../redux/store';

import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebaseConfig';

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

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
   
    const handleSignIn = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        createUserWithEmailAndPassword(emailInput, passwordInput);
    }
    if (loading) {
        return <p>Loading...</p>;
    }

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

            <C.FormArea onSubmit={handleSignIn}>
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