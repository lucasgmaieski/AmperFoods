import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useIdToken } from 'react-firebase-hooks/auth';
import { auth, db } from './firebaseConfig';


import { collection, addDoc, doc, setDoc, query, getDocs, getDoc } from 'firebase/firestore';
import { ProdItem } from '../types/ProdItem';
import { useDispatch } from 'react-redux';
import { saveOrder } from '../redux/reducers/OrdersReducer';
import { setInfo } from '../redux/reducers/UserReducer';



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
      const pedidosSubcollectionRef = collection(userDocRef, 'orderss');
      await addDoc(pedidosSubcollectionRef, pedido);

      // Pedido adicionado com sucesso à subcoleção "pedidos" dentro do documento do usuário
    } catch (error) {
      // Ocorreu um erro ao adicionar o pedido
      console.error(error);
    }
  }
};

export const updateLocalStorage = async () => {
  const dispatch = useDispatch();

  const user = auth.currentUser;

  if (user) {
    const uid = user.uid;
    // get orders in db and save localStorage
    try {
      const userDocRef = doc(db, 'users', uid);
      const pedidosSubcollectionRef = collection(userDocRef, 'orderss');
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
        dispatch( setInfo({
          name: infoUser.name,
          email: infoUser.email,
          phone: infoUser.phone,
          address: infoUser.address
      }));
      }
    } catch (error) {
      // Ocorreu um erro ao buscar os pedidos
      console.error(error);
    }
  }
};