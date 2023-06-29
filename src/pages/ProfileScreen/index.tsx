import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import * as C from './styled';
import { setInfo, setName } from '../../redux/reducers/UserReducer';
import { Header } from '../../components/Header';


export const ProfileScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [headerSearch, setHeaderSerach] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [addressInput, setAddressInput] = useState('');
    const [phoneInput, setPhoneInput] = useState('');
    const [saveSuccess, setSaveSuccess] = useState(false);

    const userInfos = useAppSelector(state => state.persistedReducer.user);

    useEffect(()=>{
        setUserInfos();
    }, [])

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
    }

    const handleSaveButton = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch( setInfo({
            name: nameInput,
            email: emailInput,
            phone: phoneInput,
            address: addressInput
        }));
        setUserInfos();
        setSaveSuccess(true);
    }

    const setUserInfos = () => {
        setNameInput(userInfos.name);
        setAddressInput(userInfos.address);
        setEmailInput(userInfos.email);
        setPhoneInput(userInfos.phone);
    }

    return (
        <C.Container>
            <Header search={headerSearch} onSearch={setHeaderSerach}/>

            <C.Titulo>Perfil do usuário</C.Titulo>
            <C.FormArea onSubmit={handleSaveButton}>
                <C.Label>
                    Nome:
                    <C.Input type="text" id="name" value={nameInput} onChange={handleInputChange}/>
                </C.Label>
                <C.Label>
                    Email:
                    <C.Input type="email" id="email" value={emailInput} onChange={handleInputChange}/>
                </C.Label>
                <C.Label>
                    Telefone:
                    <C.Input type="tel" id="phone" value={phoneInput} onChange={handleInputChange}/>
                </C.Label>
                <C.Label>
                    Endereço:
                    <C.Input type="text" id="address" value={addressInput} onChange={handleInputChange}/>
                </C.Label>
                <C.ButtonSave type="submit" value="salvar"/>
                {saveSuccess && 
                    <h4>Salvo com sucesso.</h4>
                }
            </C.FormArea>

        </C.Container>
    );
}