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
import { ErrorInput } from '../../components/ErrorInput';
import { Modal } from '../../components/Modal';
import { ModalDeleteAccount } from '../../components/ModalDeleteAccount';

const phoneRegex = new RegExp(
    /^\d{10,11}$/
  );

const schema = z.object({
    name: z.string().min(3, "Digite pelo menos 3 caracteres"),
    email: z.string().email({message: 'Endereço de email inválido'}),
    phone: z.string().regex(phoneRegex, 'O número deve ter entre 10 e 11 dígitos'),
    address: z.string().min(5, "Endereço inválido"),
})
// .refine((fields) => fields.password === fields.confirmPassword, {
//     path: ['confirmPassword'],
//     message: 'As senhas precisam ser iguais'
// });
type FormProps = z.infer<typeof schema>;


export const ProfileScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [modalStatus, setModalStatus] = useState(false);
    const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingFinish, setLoadingFinish] = useState(false);
    const [error, setError] = useState(false);

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
        setLoadingFinish(false);
        setError(false);
        setLoading(true);
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
                    setLoadingFinish(true);
                    setTimeout(() => {
                        setLoadingFinish(false);
                        setLoading(false);
                    }, 2000);
                }
            } catch (error) {
                console.log(error);
                setError(true);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        };
        updateUserInfos();

    }

    useEffect(()=>{
        setValue("name", userInfos.name || "");
        setValue("email", userInfos.email || "");
        setValue("phone", userInfos.phone || "");
        setValue("address", userInfos.address || "");
        if(loading) setLoading(false);
    }, [setValue]);

    useEffect(()=> {
        if(confirmDeleteAccount) {
            handleDeleteAccount();
        }
    }, [confirmDeleteAccount]);

    const handleLogout = () => {
        signOut(auth).then(()=> {
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
            } catch (error) {
                console.error(error);
            }
            deleteUser(user).then(() => {
                dispatch( clearInfos({}));
                dispatch( clearCart({}));
                dispatch( clearOrders({}));
                setConfirmDeleteAccount(false);
                setModalStatus(false);
                navigate('/login');
            }).catch((error) => { 
                console.error(error); 
            });
        } else {
            console.log('não exixte user');
        }
    }
    const handleDeleteAccountClick = () => {
        setModalStatus(true);
    }
    return (
        <C.Container>
            <Header />
            <C.FormArea >
                <form onSubmit={handleSubmit(handleForm)}>
                    <C.Titulo>Olá, <strong>{userInfos.name.trim().split(" ")[0]}</strong> </C.Titulo>
                    <p>Aqui você pode alterar suas informações pessoais.</p>
                    <C.Label>
                        Nome:
                        <C.Input type="text" id="name"  {...register('name')} />
                        {errors.name && (
                            <ErrorInput message={errors.name?.message} />
                        )}
                    </C.Label>
                    <C.Label>
                        Email:
                        <C.Input type="email" id="email" readOnly title="O email não pode ser alterado." {...register('email')}/>
                        {errors.email && (
                            <ErrorInput message={errors.email?.message} />
                        )}
                    </C.Label>
                    <C.Label>
                        Telefone:
                        <C.Input type="tel" id="phone"  {...register('phone')} />
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
                    <C.ButtonSave type="submit" value="salvar"/>
                    {loading &&
                        <Loader status={loading} loadingFinish={loadingFinish} isError={error} dark={true}/>
                    }
                </form>
                <C.ButtonsArea>
                    <C.Button onClick={handleLogout}>Sair</C.Button>
                    <C.Button onClick={handleDeleteAccountClick}>Excluir Conta</C.Button>
                </C.ButtonsArea>
            </C.FormArea>
            <Modal status={modalStatus} setStatus={setModalStatus}>
                <ModalDeleteAccount setModalStatus={setModalStatus} setConfirmDeleteAccount={setConfirmDeleteAccount}/>
            </Modal>
        </C.Container>
    );
}