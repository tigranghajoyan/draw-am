import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDhP_eDuFGbUDWQiHwvONGowPCqdJqpKmM",
  authDomain: "draw-am.firebaseapp.com",
  projectId: "draw-am",
  storageBucket: "draw-am.firebasestorage.app",
  messagingSenderId: "284756869433",
  appId: "1:284756869433:web:5418245d21448ec5e2a8e8",
  measurementId: "G-NQGX02P3PR",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
