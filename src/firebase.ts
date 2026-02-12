// src/firebase.ts here we initialize firebase and the services we are going to use 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; //imports firebase authentication record to the app later handled by firebase                              
import { getFirestore } from "firebase/firestore";//imports firestore database for storing user profiles later handled by you

const firebaseConfig = {
  apiKey: "AIzaSyCrMhCpgrBitz1-c940s1h2cU6LKJNOp18",
  authDomain: "projekt-ark.firebaseapp.com",
  projectId: "projekt-ark",
  storageBucket: "projekt-ark.appspot.com",
  messagingSenderId: "86093607453",
  appId: "1:86093607453:web:c977581ac9c6f2a5e18cf4",
};

const app = initializeApp(firebaseConfig);

// Exporting Firebase services so the rest of the app can use them
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
