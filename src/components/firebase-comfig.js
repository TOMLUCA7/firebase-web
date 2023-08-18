import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAvNDxF3D4jU8bAa4r7WQoZUugQ6Uigv30",
  authDomain: "saleapp-911d3.firebaseapp.com",
  projectId: "saleapp-911d3",
  storageBucket: "saleapp-911d3.appspot.com",
  messagingSenderId: "106114862992",
  appId: "1:106114862992:web:720f5ad3d18631ca22ad15",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googelProvider = new GoogleAuthProvider();
