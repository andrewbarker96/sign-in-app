import {
  getAuth,
  signInAnonymously,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../util/firebase";
import { auth } from "../util/firebase";

export const login = async (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const uid = user.uid;
      console.log("User signed in:", user, uid);
      window.location.href = "/";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing in:", errorCode, errorMessage);
    });
};

export const anonLogin = async (token: string) => {
  signInAnonymously(auth);
};

export const createAnonUser = async (profile: any) => {
  await anonLogin(profile.token);
  try {
    const userDoc = doc(firestore, "users", profile.uid);
    await setDoc(userDoc, profile);
  } catch (error) {
    console.error("Error adding document:", error);
  }
};

export const guestSignIn = async (
  name: string,
  email: string,
  company?: string
) => {
  const date = new Date().toDateString();
  const time = new Date().toLocaleTimeString();
  const docRef = doc(firestore, "guests", );
  const guestData = {
    name: name,
    email: email,
    company: company,
    signInTime: time,
    signOutTime: "",
    notes: "",
    date: date,
  };
  try {
    await addDoc(collection(docRef, date), guestData);
    console.log("Guest signed in");
  } catch (error) {
    console.error("Error adding document)", error);
  };
};

export const fetchGuests = async () => {
  const date = new Date().toDateString();
  const docRef = doc(firestore, "guests", date);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return data;
  } else {
    console.log("No guests signed in today");
  }
};

export const guestSignOut = async (name: string) => {
  const date = new Date().toDateString();
  const time = new Date().toLocaleTimeString();
  const docRef = doc(firestore, "guests", date, "guestList", name);
  try {
    await updateDoc(docRef, {
      signOutTime: time,
    });
    console.log("Guest signed out");
  } catch (error) {
    console.error("Error signing out guest:", error);
  }
};
