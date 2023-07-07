import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyASXsHdzm5PGxjEgUvw91iX2CwX7AcPFXI",
  authDomain: "amperfoods-auth.firebaseapp.com",
  projectId: "amperfoods-auth",
  storageBucket: "amperfoods-auth.appspot.com",
  messagingSenderId: "501239731696",
  appId: "1:501239731696:web:fd603a0ee929d320c8f935"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

