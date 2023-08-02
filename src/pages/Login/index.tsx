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
import { Loader } from '../../components/Loader';

const schema = z.object({
    email: z.string().email({message: 'Endereço de email inválido'}),
    password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres'),
})
type FormProps = z.infer<typeof schema>;

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [loadingFinish, setLoadingFinish] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');

    const token = useAppSelector(state => state.persistedReducer.user.token);

    useEffect(()=> {
        if(token || token != '') {
            navigate('/');
        }
    }, []);

    const { handleSubmit, register, setValue, formState: { errors} } = useForm<FormProps>({mode: 'all', reValidateMode: 'onChange', resolver: zodResolver(schema)});
    const handleForm = async (data: FormProps) => {
        try {
            setLoadingFinish(false);
            setError(false);
            setLoading(true);
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
            if(user) {
                console.log("usuario logado com sucesso: "+ user.email);
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
                    console.error(error);
                }
                // get data user in db and save in localStorage
                try {
                    const userDocRef = doc(db, 'users', uid);
                    const infoUser: any = await getDoc(userDocRef);
                    
                    if(infoUser.exists()) {
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
                console.error(error);
                }
                setLoadingFinish(true);
                setTimeout(() => {
                    setLoading(false);
                    navigate('/');
                }, 2000);
            }
        } catch (error: any) {
            const errorCode = error.code;
            console.error(errorCode);
            setLoadingFinish(true);
            setError(true);
            if(errorCode == "auth/wrong-password") {
                setMessage('E-mail ou senha incorretos. Por favor, verifique suas credenciais e tente novamente.');
            }
            else if(errorCode == "auth/user-not-found") {
                setMessage('Não existe usuário cadastrado com esse email!');
            }
        }
    }
    const handleInputChange = () => {
        setLoading(false);
        setMessage('');
    };
    
    return (
        <C.Container>
            <C.FormArea onSubmit={handleSubmit(handleForm)}>
            <C.Titulo>Faça Login para comprar</C.Titulo>
                <C.Label>
                    Email:
                    <C.Input type="text" id="email"  {...register('email')} onChange={handleInputChange}/>
                    {errors.email && (
                        <ErrorInput message={errors.email?.message} />
                    )}
                </C.Label>
                <C.Label>
                    Senha:
                    <C.Input type="password" id="password"  {...register('password')} onChange={handleInputChange}/>
                    {errors.password && (
                        <ErrorInput message={errors.password?.message} />
                    )}
                </C.Label>
                    
                <Link to={'/#'} >Esqueceu sua senha?</Link>
                    
                <C.Submit>Entrar</C.Submit>
                {loading && 
                    <Loader status={loading} loadingFinish={loadingFinish} isError={error} dark={true} message={message}/>
                }
                <p>Você não tem uma conta?</p>
                <Link to={'/register'} >Crie a sua conta aqui</Link>
            </C.FormArea>
        </C.Container>
    );
}