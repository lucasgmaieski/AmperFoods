import { ChangeEvent } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import * as C from './styled';
import { setName } from '../../redux/reducers/UserReducer';
import { persistor } from '../../redux/store';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { auth, db } from '../../services/firebaseConfig';
import { saveOrder } from '../../redux/reducers/OrdersReducer';
import { updateLocalStorage } from '../../services/util';


export default () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let { nome } = useParams();

    const name = useAppSelector(state => state.persistedReducer.user.name);

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        // dispatch( setName({name: e.target.value}));
        console.log(name);
    }

    const handleInfosProfile = async () => {
      const user = auth.currentUser;

      if (user) {
        const uid = user.uid;
    
        try {
          const userDocRef = doc(db, 'users', uid);
          // const pedidosSubcollectionRef = collection(userDocRef, 'orderss');
          // const pedidosQuery = query(pedidosSubcollectionRef);
          const infoUser = await getDoc(userDocRef);
          
          if(infoUser.exists()) {
            console.log("info user: ");
            console.log(infoUser.data());
          }
        } catch (error) {
          // Ocorreu um erro ao buscar os pedidos
          console.error(error);
        }
      }
    }

    return (
        <C.Container>
            <C.Titulo>Tela2 de {name}</C.Titulo>

            <input type="text" value={name} onChange={handleTextChange} />

            <button onClick={handleInfosProfile}>mostrar informações do perfil do usuario</button>
            <button onClick={updateLocalStorage}>listar pedido</button>
            <button onClick={()=>navigate(-1)}>Voltar</button>
            <button onClick={()=> (persistor.purge())}>Limpar persistor</button>
        </C.Container>
    );
}