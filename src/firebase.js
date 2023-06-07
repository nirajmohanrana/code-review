import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhUy_nSEAqXVEWh0LZdQSgcK8kj8dnYZg",
  authDomain: "code-review-416d7.firebaseapp.com",
  projectId: "code-review-416d7",
  storageBucket: "code-review-416d7.appspot.com",
  messagingSenderId: "7610342817",
  appId: "1:7610342817:web:91800cadac4e795457ffe0",
  measurementId: "G-K78XT8GNX4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export const auth = getAuth();
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default db;
