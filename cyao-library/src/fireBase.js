// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIj3dIP2-h6H17I_O6qj3R2UbiEjYj9Y4",
  authDomain: "fit-5023-lab.firebaseapp.com",
  projectId: "fit-5023-lab",
  storageBucket: "fit-5023-lab.firebasestorage.app",
  messagingSenderId: "924688050259",
  appId: "1:924688050259:web:fe404e9f421644fe7efea6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

// export utils/refs
export {
  db,
  auth
}