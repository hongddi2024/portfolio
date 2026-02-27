import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBztBK_I2cGIcvtg4TVWhGBcEaDv7fz9hY",
  authDomain: "hongddi-portfolio.firebaseapp.com",
  databaseURL: "https://hongddi-portfolio-default-rtdb.firebaseio.com",
  projectId: "hongddi-portfolio",
  storageBucket: "hongddi-portfolio.firebasestorage.app",
  messagingSenderId: "329363538929",
  appId: "1:329363538929:web:dfd3dfe09433deecae3a50",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
