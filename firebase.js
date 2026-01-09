import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCqOJLGhEQvxxDZxZN2Mrn3un9SxV172U4",
    authDomain: "movie-masti-web.firebaseapp.com",
    projectId: "movie-masti-web",
    storageBucket: "movie-masti-web.firebasestorage.app",
    messagingSenderId: "202812274138",
    appId: "1:202812274138:web:a5e4def0f371fcf90ebce3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export {
  auth,
  provider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  db,
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where
};
