import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import * as C from './styled';
import { setInfo, setName, setToken } from '../../redux/reducers/UserReducer';
import { persistor } from '../../redux/store';

import { auth, db } from '../../services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { updateLocalStorage } from '../../services/util';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { saveOrder } from '../../redux/reducers/OrdersReducer';


export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const name = useAppSelector(state => state.persistedReducer.user.name);


    // const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

    const handleSignIn = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        // signInWithEmailAndPassword(emailInput, passwordInput);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, emailInput, passwordInput);
            const user = userCredential.user;
            if(user) {
                console.log("usuario logado com sucesso: "+ user.email);
                
                // const user = auth.currentUser;

                
                const uid = user.uid;
                // get orders in db and save localStorage
                try {
                const userDocRef = doc(db, 'users', uid);
                const pedidosSubcollectionRef = collection(userDocRef, 'orders');
                const pedidosQuery = query(pedidosSubcollectionRef);
                const pedidosSnapshot = await getDocs(pedidosQuery);

                const pedidos: any = pedidosSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                pedidos.forEach((pedido:any) => {
                    dispatch( saveOrder({
                    date: pedido.date,
                    status: 1,
                    address: pedido.address,
                    discount: pedido.discount,
                    delivery: pedido.delivery,
                    amount: pedido.amount,
                    totalPayable: pedido.totalPayable,
                    products: pedido.products
                }));
                });
                } catch (error) {
                // Ocorreu um erro ao buscar os pedidos
                console.error(error);
                }
                type infoUserType = {
                name: string,
                email: string,
                phone: string,
                address: string,
                }
                // get data user in db and save in localStorage
                try {
                const userDocRef = doc(db, 'users', uid);
                const infoUser: any = await getDoc(userDocRef);
                
                if(infoUser.exists()) {
                    console.log("info user: ");
                    console.log(infoUser.data());

                    dispatch(setToken({ token: user.getIdTokenResult()}));
                    dispatch( setInfo({
                    name: infoUser.data().name,
                    email: infoUser.data().email,
                    phone: infoUser.data().phone,
                    address: infoUser.data().address
                }));
                }
                } catch (error) {
                // Ocorreu um erro ao buscar os pedidos
                console.error(error);
                }
                navigate('/');
            }

        } catch (error) {
            console.error(error);
        }
    }
    // if (loading) {
    //     return <p>Loading...</p>;
    // }
    // if (user) {
    //     console.log(user);
    //     getToken();

    // }

    // function getToken() {
    //     user?.user.getIdToken().then((token)=> {
    //         console.log(token);
    //         dispatch( setToken({token: token}));
    //         navigate('/');
            
    //     })
    //     .catch((error)=> {
    //         console.error('Erro ao obter o token de autenticação:', error);
    //     })
    // }
   

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
            <h2>currentUser uid: {auth.currentUser?.uid}</h2>
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