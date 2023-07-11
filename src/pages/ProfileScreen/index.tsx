import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import * as C from './styled';
import { clearInfos, setInfo, setName } from '../../redux/reducers/UserReducer';
import { clearCart } from '../../redux/reducers/CartReducer';
import { clearOrders } from '../../redux/reducers/OrdersReducer';
import { Header } from '../../components/Header';
import { deleteUser, signOut } from 'firebase/auth';
import { auth, db } from '../../services/firebaseConfig';
import { useIdToken } from 'react-firebase-hooks/auth';
import { deleteDoc, doc } from 'firebase/firestore';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import InputMask from "react-input-mask";



const schema = z.object({
    name: z.string().min(3, "Digite pelo menos 3 caracteres"),
    email: z.string().email({message: 'Endereço de email inválido'}),
    phone: z.number(),
    phone2: z.string(),
    address: z.string(),
    // password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres'),
    // confurmPassword: z.string(),
});
type FormProps = z.infer<typeof schema>;


export const ProfileScreen = () => {
    const dispatch = useDispatch();
    const [headerSearch, setHeaderSerach] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [addressInput, setAddressInput] = useState('');
    const [phoneInput, setPhoneInput] = useState('');
    const [saveSuccess, setSaveSuccess] = useState(false);

    const userInfos = useAppSelector(state => state.persistedReducer.user);

    const [mascaraTelefone, setMascaraTelefone] = useState("(99) 9999-9999");

    
    useEffect(()=>{
        setUserInfos();
    }, [])
    
    const { handleSubmit, register, formState: { errors}, setValue, watch } = useForm<FormProps>({mode: 'all', reValidateMode: 'onChange', resolver: zodResolver(schema)});
    const handleForm = (data: FormProps) => {
        console.log({data});
    }
    const telefone = watch("phone2");

    useEffect(() => {
        if (telefone?.length === 10) {
        setMascaraTelefone("(99) 9999-9999");
        } else if (telefone?.length === 11) {
        setMascaraTelefone("(99) 99999-9999");
        }
    }, [telefone]);
    const handleSaveButton = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        // dispatch( setInfo({
        //     name: nameInput,
        //     email: emailInput,
        //     phone: phoneInput,
        //     address: addressInput
        // }));
        console.log("deu certo ");
        setUserInfos();
        setSaveSuccess(true);
    }

    const setUserInfos = () => {
        setNameInput(userInfos.name);
        setAddressInput(userInfos.address);
        setEmailInput(userInfos.email);
        setPhoneInput(userInfos.phone);
    }

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
                    Telefone com mascara:
                    <InputMask
                        mask={mascaraTelefone}
                        maskPlaceholder=''
                        type={'tel'}
                        {...register("phone2", { required: true })}
                        onChange={(event) => setValue("phone2", event.target.value)}
                    />
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
                    <h4>Salvo com sucesso.</h4>
                }
            </C.FormArea>
            <p>current user email{auth.currentUser?.email}</p>
            <C.Titulo>Perfil do usuário: <strong>{userInfos.name}</strong> </C.Titulo>
        </C.Container>
    );
}