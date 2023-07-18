import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import * as C from './styled';
import { clearInfos, setInfo, setName } from '../../redux/reducers/UserReducer';
import { clearCart } from '../../redux/reducers/CartReducer';
import { clearOrders, saveOrder } from '../../redux/reducers/OrdersReducer';
import { Header } from '../../components/Header';
import { deleteUser, signOut } from 'firebase/auth';
import { auth, db } from '../../services/firebaseConfig';
import { useIdToken } from 'react-firebase-hooks/auth';
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import InputMask from "react-input-mask";
import { Loader } from '../../components/Loader';
import { userInfo } from 'os';

const phoneRegex = new RegExp(
    /^\d{10,11}$/
  );

const schema = z.object({
    name: z.string().min(3, "Digite pelo menos 3 caracteres"),
    email: z.string().email({message: 'Endereço de email inválido'}),
    phone: z.string().regex(phoneRegex, 'O número deve ter entre 10 e 11 dígitos'),
    address: z.string().min(5, "Endereço inválido"),
    // password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres'),
    // confurmPassword: z.string(),
})
// .refine((fields) => fields.password === fields.confirmPassword, {
//     path: ['confirmPassword'],
//     message: 'As senhas precisam ser iguais'
// });
type FormProps = z.infer<typeof schema>;


export const ProfileScreen = () => {
    const dispatch = useDispatch();
    const [headerSearch, setHeaderSerach] = useState('');
    const [saveSuccess, setSaveSuccess] = useState(false);

    const userInfos = useAppSelector(state => state.persistedReducer.user);

    useEffect(()=>{
        const user = auth.currentUser;
        if (user) {
            const userId = user.uid;
            const userDocRef = doc(db, 'users', userId);
            const listenInfoUser = onSnapshot(userDocRef, (snapshot) => {
            // O código aqui será executado sempre que houver alterações nos dados do usuário
            const userData = snapshot.data();
            console.log('userData:');
            console.log(userData);
            dispatch( setInfo({
                name: userData?.name,
                email: userData?.email,
                phone: userData?.phone,
                address: userData?.address
            }));
            });
            return () => listenInfoUser();
        }
    }, []);
    
    const { handleSubmit, register, setValue, formState: { errors} } = useForm<FormProps>({mode: 'all', reValidateMode: 'onChange', resolver: zodResolver(schema)});
    const handleForm = (data: FormProps) => {
        console.log({data});
        dispatch( setInfo({
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address
        }));
        const updateUserInfos = async () => {
            const user = auth.currentUser;
            try {
                if (user) {
                    const uid = user.uid;
                    const userDocRef = doc(db, 'users', uid);
    
                    await updateDoc(userDocRef, {
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        address: data.address
                    });
                }
            } catch (error) {
                
            }
            
        };
        updateUserInfos();
        setSaveSuccess(true);
        console.log("deu certo ");
    }

    useEffect(()=>{
        setValue("name", userInfos.name || "");
        setValue("email", userInfos.email || "");
        setValue("phone", userInfos.phone || "");
        setValue("address", userInfos.address || "");
    }, [setValue]);

    const handleLogout = () => {
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
                console.log('deletando documento do usuario do banco');
            } catch (error) {
                console.error(error);
            }
            deleteUser(user).then(() => {
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
            <C.FormArea onSubmit={handleSubmit(handleForm)}>
                <C.Titulo>Olá, <strong>{userInfos.name.trim().split(" ")[0]}</strong> </C.Titulo>
                <p>Aqui você pode alterar suas informações pessoais.</p>
                <C.Label>
                    Nome:
                    <C.Input type="text" id="name"  {...register('name')} />
                    {errors.name && (
                        <p className="text-xs italic text-red-500 mt-2">
                        {errors.name?.message}
                        </p>
                    )}
                </C.Label>
                <C.Label>
                    Email:
                    <C.Input type="email" id="email"  {...register('email')}/>
                    {errors.email && (
                        <p className="text-xs italic text-red-500 mt-2">
                        {errors.email?.message}
                        </p>
                    )}
                </C.Label>
                <C.Label>
                    Telefone:
                    <C.Input type="tel" id="phone"  {...register('phone')} />
                    {errors.phone && (
                        <p className="text-xs italic text-red-500 mt-2">
                        {errors.phone?.message}
                        </p>
                    )}
                </C.Label>
                
                <C.Label>
                    Endereço:
                    <C.Input type="text" id="address"  {...register('address')} />
                    {errors.address && (
                        <p className="text-xs italic text-red-500 mt-2">
                        {errors.address?.message}
                        </p>
                    )}
                </C.Label>
                <C.ButtonSave type="submit" value="salvar"/>
                {saveSuccess && 
                    <Loader status={saveSuccess} isCheck={true}/>
                }
            </C.FormArea>
            <p>current user email{auth.currentUser?.email}</p>
            <C.Titulo>Perfil do usuário: <strong>{userInfos.name}</strong> </C.Titulo>
        </C.Container>
    );
}