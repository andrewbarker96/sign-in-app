import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCGc9ieWeevCMiMPBDv3VEYuedyK2Xe2jI",
  authDomain: "stockassoc-a0091.firebaseapp.com",
  databaseURL: "https://stockassoc-a0091-default-rtdb.firebaseio.com",
  projectId: "stockassoc-a0091",
  storageBucket: "stockassoc-a0091.appspot.com",
  messagingSenderId: "1080703289236",
  appId: "1:1080703289236:web:a13f5bec71795e62083181",
  measurementId: "G-3MHPJHP7BR",
};
const adminAuth = [
  "yYMmzbnFnXPCclmWWmi0oyLulqh1",
  "RmgwiiugPWTEL3YyfJOyro3aq3I2",
];

const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase);
const auth = getAuth(firebase);

export { firebase, auth, firestore, adminAuth };
