import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDkyHz1CTqvoZKQHlZqcOmhjNwnAzH2HJo",
    authDomain: "expencetracker-b3897.firebaseapp.com",
    databaseURL: "https://expencetracker-b3897-default-rtdb.firebaseio.com",
    projectId: "expencetracker-b3897",
    storageBucket: "expencetracker-b3897.appspot.com",
    messagingSenderId: "200471498754",
    appId: "1:200471498754:web:247b03b6c92aa4a66d171b",
    measurementId: "G-7PTHVG8XQ5"
  };

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export default storage;
