import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAer9pxhROTco0B7K4orW1fCGuAJCmz9jg",
  authDomain: "authenticationtodolist.firebaseapp.com",
  projectId: "authenticationtodolist",
  storageBucket: "authenticationtodolist.appspot.com",
  messagingSenderId: "1078459326949",
  appId: "1:1078459326949:web:159dedabd3548256cb0f0c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
