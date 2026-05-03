import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
 const firebaseConfig = {
    apiKey: "AIzaSyDOWctyDAg9rUg9Wr3QtIZoIuXUzuAd1VU",
    authDomain: "worker-management-82edd.firebaseapp.com",
    projectId: "worker-management-82edd",
    storageBucket: "worker-management-82edd.firebasestorage.app",
    messagingSenderId: "882504843444",
    appId: "1:882504843444:web:e4decfcb961db3c10097e1",
    measurementId: "G-6Q51SNFVG3"
  };
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
