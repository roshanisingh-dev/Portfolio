import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCLTAodkFi-Wle4fII4orwjpbL0G3p4Nmo",
    authDomain: "roshani-portfolio-39c61.firebaseapp.com",
    projectId: "roshani-portfolio-39c61",
    storageBucket: "roshani-portfolio-39c61.firebasestorage.app",
    messagingSenderId: "547143795053",
    appId: "1:547143795053:web:bc13c889ab6d451e66da64"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, serverTimestamp };