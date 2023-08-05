import { useState } from 'react';
import { Link, useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as C from './styled';
import { setInfo, setToken } from '../../redux/reducers/UserReducer';

import { auth, db } from '../../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorInput } from '../../components/ErrorInput';
import { Loader } from '../../components/Loader';
import { Helmet } from 'react-helmet';
import { Header } from '../../components/Header';

const phoneRegex = new RegExp(
    /^\d{10,11}$/
  );

const schema = z.object({
    name: z.string().min(3, "Digite pelo menos 3 caracteres"),
    email: z.string().email({message: 'Endereço de email inválido'}),
    phone: z.string().regex(phoneRegex, 'O número deve ter entre 10 e 11 dígitos'),
    address: z.string().min(5, "Endereço inválido"),
    password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres'),
    confirmPassword: z.string(),
}).refine((fields) => fields.password === fields.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas precisam ser iguais'
});
type FormProps = z.infer<typeof schema>;

export const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [loadingFinish, setLoadingFinish] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    
    const { handleSubmit, register, formState: { errors} } = useForm<FormProps>({mode: 'all', reValidateMode: 'onChange', resolver: zodResolver(schema)});
    const handleForm = async (data: FormProps) => {
        try {
            setLoadingFinish(false);
            setError(false);
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
        
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const userData = { name: data.name, email: user.email, phone: data.phone, address: data.address };
                
                await setDoc(userDocRef, userData);
    
                dispatch(setToken({ token: user.getIdTokenResult()}));
                dispatch( setInfo({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    address: data.address
                }));

                setLoadingFinish(true);
                setTimeout(() => {
                    setLoading(false);
                    navigate('/profile');
                }, 2000);
            } else {
                console.log('usuario não existe');
            }
    
        } catch (error:any) {
            const errorCode = error.code;
            setLoadingFinish(true);
            setError(true);
            if(errorCode == "auth/email-already-in-use") {
                setMessage('Esse email já está em uso');
            }
        }
    }

    const handleInputChange = () => {
        setLoading(false);
    };
    
    return (
        <C.Container>
            <Helmet>
                <meta name="robots" content="noindex, nofollow"/>
                <meta name="og:title" content="Cadastre-se - Amper Foods"/>
                <meta property="og:url" content="https://amper-foods.vercel.app/register"/>
                <title>Cadastre-se - Amper Foods</title>
            </Helmet>
            <Header />
            <C.FormArea onSubmit={handleSubmit(handleForm)}>
                <C.Titulo>Por favor digite suas informações de Cadastro</C.Titulo>
                <C.Label>
                    Nome:
                    <C.Input type="text" id="name"  {...register('name')} onChange={handleInputChange}/>
                    {errors.name && (
                        <ErrorInput message={errors.name?.message} />
                    )}
                </C.Label>
                <C.Label>
                    Email:
                    <C.Input type="text" id="email"  {...register('email')} onChange={handleInputChange}/>
                    {errors.email && (
                        <ErrorInput message={errors.email?.message} />
                    )}
                </C.Label>
                <C.Label>
                    Telefone:
                    <C.Input type="text" id="phone"  {...register('phone')} onChange={handleInputChange}/>
                    {errors.phone && (
                        <ErrorInput message={errors.phone?.message} />
                    )}
                </C.Label>
                <C.Label>
                    Endereço:
                    <C.Input type="text" id="address"  {...register('address')} onChange={handleInputChange}/>
                    {errors.address && (
                        <ErrorInput message={errors.address?.message} />
                    )}
                </C.Label>
                <C.Label>
                    Senha:
                    <C.Input type="password" id="password"  {...register('password')} onChange={handleInputChange}/>
                    {errors.password && (
                        <ErrorInput message={errors.password?.message} />
                    )}
                </C.Label>
                <C.Label>
                    Confirmar senha:
                    <C.Input type="password" id="confirmPassword"  {...register('confirmPassword')} onChange={handleInputChange}/>
                    {errors.confirmPassword && (
                        <ErrorInput message={errors.confirmPassword?.message} />
                    )}
                </C.Label>
                    
                <C.Submit>Cadastrar</C.Submit>
                {loading && 
                    <Loader status={loading} loadingFinish={loadingFinish} isError={error} message={message} dark={true}/>
                }
                <p>Você já tem uma conta?</p>
                <Link to={'/login'} >Acesse sua conta aqui</Link>
            </C.FormArea>
        </C.Container>
    );
}