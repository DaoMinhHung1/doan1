import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDmpbDzW6fnjl5NiyFhqbBsa07b06bqZJ4",
  authDomain: "doanalta1.firebaseapp.com",
  projectId: "doanalta1",
  storageBucket: "doanalta1.appspot.com",
  messagingSenderId: "506508882156",
  appId: "1:506508882156:web:0a899e3f2d47f90efa75c9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
