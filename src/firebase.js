import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { firebaseConfig } from "./firebase-config";

firebase.initializeApp(firebaseConfig);
