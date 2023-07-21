import { ChangeEvent, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import * as C from './styled';
import { setInfo, setName, setToken } from '../../redux/reducers/UserReducer';
import { persistor } from '../../redux/store';

import { auth, db } from '../../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorInput } from '../../components/ErrorInput';

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
    const [aa, setAa] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [addressInput, setAddressInput] = useState('');
    const [phoneInput, setPhoneInput] = useState('');
    const name = useAppSelector(state => state.persistedReducer.user.name);
    
    const { handleSubmit, register, setValue, formState: { errors} } = useForm<FormProps>({mode: 'all', reValidateMode: 'onChange', resolver: zodResolver(schema)});
    const handleForm = async (data: FormProps) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
        
            console.log("Usuário criado e logado automaticamente com uid: " + user.uid);
        
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
                setNameInput('');
                setEmailInput('');
                setAddressInput('');
                setPhoneInput('');
                setPasswordInput('');
                navigate('/profile');
            } else {
                console.log('usuario nçao existe');
            }
    
        } catch (error:any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        }
    }
    
    const handleSignUp = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, emailInput, passwordInput);
        const user = userCredential.user;
    
        console.log("Usuário criado e logado automaticamente com uid: " + user.uid);
    
        if (user) {
            const userDocRef = doc(db, 'users', user.uid);
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
    
    return (
        <C.Container>
            <C.Titulo>Por favor digite suas informações de Cadastro</C.Titulo>

            <C.FormArea onSubmit={handleSubmit(handleForm)}>
                <C.Label>
                    Nome:
                    <C.Input type="text" id="name"  {...register('name')} />
                    {errors.name && (
                        <ErrorInput message={errors.name?.message} />
                    )}
                </C.Label>
                <C.Label>
                    Email:
                    <C.Input type="text" id="email"  {...register('email')} />
                    {errors.email && (
                        <ErrorInput message={errors.email?.message} />
                    )}
                </C.Label>
                <C.Label>
                    Telefone:
                    <C.Input type="text" id="phone"  {...register('phone')} />
                    {errors.phone && (
                        <ErrorInput message={errors.phone?.message} />
                    )}
                </C.Label>
                <C.Label>
                    Endereço:
                    <C.Input type="text" id="address"  {...register('address')} />
                    {errors.address && (
                        <ErrorInput message={errors.address?.message} />
                    )}
                </C.Label>
                <C.Label>
                    Senha:
                    <C.Input type="text" id="password"  {...register('password')} />
                    {errors.password && (
                        <ErrorInput message={errors.password?.message} />
                    )}
                </C.Label>
                <C.Label>
                    Confirmar senha:
                    <C.Input type="text" id="confirmPassword"  {...register('confirmPassword')} />
                    {errors.confirmPassword && (
                        <ErrorInput message={errors.confirmPassword?.message} />
                    )}
                </C.Label>
                    
                <C.Submit>Cadastrar</C.Submit>
                <p>Você já tem uma conta?</p>
                <Link to={'/login'} >Acesse sua conta aqui</Link>
            </C.FormArea>
        </C.Container>
    );
}