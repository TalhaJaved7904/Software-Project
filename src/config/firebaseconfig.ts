// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJcGi6s-atWVyWisC7lESh39dzzyaGqhY",
  authDomain: "lms-project-9cf54.firebaseapp.com",
  databaseURL: "https://lms-project-9cf54-default-rtdb.firebaseio.com",
  projectId: "lms-project-9cf54",
  storageBucket: "lms-project-9cf54.appspot.com",
  messagingSenderId: "1040188866291",
  appId: "1:1040188866291:web:f24846a23ea7627d274186",
  measurementId: "G-PCJD8YTZ76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;