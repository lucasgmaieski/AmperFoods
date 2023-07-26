import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import * as C from './styled';
import { setInfo, setName, setToken } from '../../redux/reducers/UserReducer';
import { persistor } from '../../redux/store';

import { auth, db } from '../../services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { saveOrder } from '../../redux/reducers/OrdersReducer';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorInput } from '../../components/ErrorInput';

const schema = z.object({
    email: z.string().email({message: 'Endereço de email inválido'}),
    password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres'),
})
type FormProps = z.infer<typeof schema>;

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const name = useAppSelector(state => state.persistedReducer.user.name);

    const { handleSubmit, register, setValue, formState: { errors} } = useForm<FormProps>({mode: 'all', reValidateMode: 'onChange', resolver: zodResolver(schema)});
    const handleForm = async (data: FormProps) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
            if(user) {
                console.log("usuario logado com sucesso: "+ user.email);
                
                // const user = auth.currentUser;
                const tokenUser = await user.getIdToken();
                console.log('tokenUser1: '+tokenUser);
                
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
                        const userToken = await user.getIdToken();
                        dispatch(setToken({ token: userToken}));
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


    const handleSignIn = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, emailInput, passwordInput);
            const user = userCredential.user;
            if(user) {
                console.log("usuario logado com sucesso: "+ user.email);
                
                // const user = auth.currentUser;
                const tokenUser = await user.getIdToken();
                console.log('tokenUser1: '+tokenUser);
                
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
                    const userToken = await user.getIdToken();
                    dispatch(setToken({ token: userToken}));
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

            <C.FormArea onSubmit={handleSubmit(handleForm)}>
            <C.Titulo>Faça Login para comprar</C.Titulo>
                <C.Label>
                    Email:
                    <C.Input type="text" id="email"  {...register('email')} />
                    {errors.email && (
                        <ErrorInput message={errors.email?.message} />
                    )}
                </C.Label>
                <C.Label>
                    Senha:
                    <C.Input type="text" id="password"  {...register('password')} />
                    {errors.password && (
                        <ErrorInput message={errors.password?.message} />
                    )}
                </C.Label>
                    
                <Link to={'/#'} >Esqueceu sua senha?</Link>
                    
                <C.Submit>Entrar</C.Submit>
                <p>Você não tem uma conta?</p>
                <Link to={'/register'} >Crie a sua conta aqui</Link>
            </C.FormArea>
        </C.Container>
    );
}