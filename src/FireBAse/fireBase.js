// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaQWVq6gc06IzgiKca9Z-m86fdH2t17tI",
  authDomain: "fir-pro-2-9540d.firebaseapp.com",
  projectId: "fir-pro-2-9540d",
  storageBucket: "fir-pro-2-9540d.appspot.com",
  messagingSenderId: "795819951543",
  appId: "1:795819951543:web:16b5134b7fc013d8269432",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth, firebaseConfig };
