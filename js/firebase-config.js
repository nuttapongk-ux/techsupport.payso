// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBB5WUNl3xOVWzKEoUcNHFEQ71nE2ELnrU",
  authDomain: "helpts-d1e53.firebaseapp.com",
  databaseURL: "https://helpts-d1e53-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "helpts-d1e53",
  storageBucket: "helpts-d1e53.firebasestorage.app",
  messagingSenderId: "781646676890",
  appId: "1:781646676890:web:2846e944a0545d66f07023",
  measurementId: "G-CJ94VCTQ0M"
};

// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
    window.db = firebase.firestore();

    window.storage = firebase.storage();
    console.log("Firebase initialized successfully");
} catch(e) {
    console.error("Firebase initialization error", e);
}
