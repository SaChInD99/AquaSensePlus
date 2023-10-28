import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCLJLADQmHAHdhjF-D3e4YklT78Jh93qU",
  authDomain: "esp32-firebase-demo-c95d6.firebaseapp.com",
  databaseURL: "https://esp32-firebase-demo-c95d6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "esp32-firebase-demo-c95d6",
  storageBucket: "esp32-firebase-demo-c95d6.appspot.com",
  messagingSenderId: "521633258919",
  appId: "1:521633258919:web:3e0a49eaaa6af23567aa82"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
