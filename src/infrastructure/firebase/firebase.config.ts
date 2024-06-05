import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCjeceAMWuhr2FkrvXgxnqhpKFmEG5fJqY",
    authDomain: "le-sport-dd.firebaseapp.com",
    projectId: "le-sport-dd",
    storageBucket: "le-sport-dd.appspot.com",
    messagingSenderId: "364549927803",
    appId: "1:364549927803:web:c65f683aead497e522c3de"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
