// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  linkWithRedirect,
  signInWithCredential,
  linkWithCredential,
  OAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDatabase, set, ref, } from "firebase/database";

// const firebase = require("firebase/app");
// require("firebase/firestore");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT7denvECY3NyV2SJ31lNfn1yp-EaqlNU",
  authDomain: "learn-authen-ff5a8.firebaseapp.com",
  projectId: "learn-authen-ff5a8",
  storageBucket: "learn-authen-ff5a8.appspot.com",
  messagingSenderId: "1009011383213",
  appId: "1:1009011383213:web:2c78e5f7878476d6455f24",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//set up auth provider
const database = getDatabase(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const auth = getAuth();

export {
  app, 
  provider,
  auth,
  getRedirectResult,
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  onAuthStateChanged,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  linkWithRedirect,
  signInWithCredential,
  linkWithCredential,
  OAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getDatabase,
  database,
  set,
  ref,
  signOut,
  db,
  collection,
  addDoc,
  facebookProvider,
  updateDoc,
  updateProfile,
};
const users = collection(db, "users");


export const createUserWithEmailAndPasswordCall = async (email, password) => {
 
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential;
  
  } catch (error) {
    console.log(error);
  }
};
export const createUserProfileDocument = async (userAuth, additionalData,  ) => {
  if (!userAuth) return;

  const userRef = doc(users, userAuth.uid);

  const snapShot = await getDoc(userRef);
 


  if (!snapShot.exists()) {
    const { displayName, email,} = userAuth;
    const createdAt = new Date();
    const getLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        return `${data.region_code}, ${data.country_name}`;
      } catch (err) {
        console.error(err);
      }
    };
    const location = await getLocation();
    
    

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        location,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  if (snapShot.exists()) {
    const displayName = snapShot.data().displayName;
    console.log(`The user's display name is ${displayName}`);
    //saved display name to local storage
    // localStorage.setItem('displayName', displayName);
  }
  return userRef;
};


