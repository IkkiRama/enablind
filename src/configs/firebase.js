// import * as firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBv3_vyVJnest7hjDU-8lVpASKPp9quc1g",
  authDomain: "react-native-crud-fireba-ea6c9.firebaseapp.com",
  projectId: "react-native-crud-fireba-ea6c9",
  storageBucket: "react-native-crud-fireba-ea6c9.appspot.com",
  messagingSenderId: "322123156336",
  appId: "1:322123156336:web:64fa6bb3325ad837145db5",
  databaseURL:
    "https://react-native-crud-fireba-ea6c9-default-rtdb.asia-southeast1.firebasedatabase.app",
  //   @deprecated is deprecated Constants.manifest
};
// initialize firebase
const FIREBASE = initializeApp(firebaseConfig);
const db = getDatabase(FIREBASE);
const storage = getStorage();
export { db, storage };
