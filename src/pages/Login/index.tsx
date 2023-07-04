import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import * as C from './styled';
import { setName, setToken } from '../../redux/reducers/UserReducer';
import { persistor } from '../../redux/store';

import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebaseConfig';


export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const name = useAppSelector(state => state.persistedReducer.user.name);


    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const handleSignIn = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        signInWithEmailAndPassword(emailInput, passwordInput);
    }
    if (loading) {
        return <p>Loading...</p>;
    }
    if (user) {
        console.log(user);
        getToken();

    }

    function getToken() {
        user?.user.getIdToken().then((token)=> {
            console.log(token);
            dispatch( setToken({token: token}));
            navigate('/');
            
        })
        .catch((error)=> {
            console.error('Erro ao obter o token de autenticação:', error);
        })
    }
   

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.id == 'email') {
            setEmailInput(e.target.value);
        }
        if(e.target.id == 'password') {
            setPasswordInput(e.target.value);
        }
    }
    
    
    return (
        <C.Container>
            <C.Titulo>Por favor digite suas informações de login</C.Titulo>

            <C.FormArea onSubmit={handleSignIn}>
                <C.InputArea>
                    <C.Label htmlFor="email">Email:</C.Label>
                    <C.Input type="email" name="email" id="email" value={emailInput} onChange={handleInputChange}/>
                </C.InputArea>
                <C.InputArea>
                    <C.Label htmlFor="password">Nome:</C.Label>
                    <C.Input type="password" name="password" id="password" value={passwordInput} onChange={handleInputChange}/>
                </C.InputArea>
                    
                <Link to={'/#'} >Esqueceu sua senha?</Link>
                    
                <C.Submit>Entrar</C.Submit>
                <p>Você não tem uma conta?</p>
                <Link to={'/register'} >Crie a sua conta aqui</Link>
            </C.FormArea>
        </C.Container>
    );
}