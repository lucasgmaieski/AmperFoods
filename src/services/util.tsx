import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useIdToken } from 'react-firebase-hooks/auth';
import { auth, db } from './firebaseConfig';


import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { ProdItem } from '../types/ProdItem';

export const login = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password);
};
// export const logout = () => {
//   console.log("fazendo logout...");
//   console.log(auth.currentUser?.email);
//   console.log(auth.currentUser?.getIdTokenResult);

//   signOut(auth).then(()=> {

//   }).catch((error)=> {
//     console.error(error);
//   })
// };
type Pedido = {
  pedido: {
    date: string;
  status: number;
  address: string;
  discount: number;
  delivery: number;
  amount: number;
  totalPayable: number;
  products: ProdItem[];
  }
}
export const adicionarPedido = async ({pedido}: Pedido) => {
  const user = auth.currentUser;

  if (user) {
    const uid = user.uid;

    try {
      const userDocRef = doc(db, 'users', uid);
      const pedidosSubcollectionRef = collection(userDocRef, 'pedidos');
      await addDoc(pedidosSubcollectionRef, pedido);

      // Pedido adicionado com sucesso à subcoleção "pedidos" dentro do documento do usuário
    } catch (error) {
      // Ocorreu um erro ao adicionar o pedido
      console.error(error);
    }
  }
};