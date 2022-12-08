import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDNMxNrcy17S8TAVenzgrx6ClM4xb_pFqI",
    authDomain: "curso-15a87.firebaseapp.com",
    projectId: "curso-15a87",
    storageBucket: "curso-15a87.appspot.com",
    messagingSenderId: "140610185575",
    appId: "1:140610185575:web:766b1144bf88b7e534e7c2",
    measurementId: "G-HN29KT79HN"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)
export { db, auth };