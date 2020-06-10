import * as firebase from "firebase/app";
import { user, isLoading } from "./stores";

let registeringUserName = null;

export function setName(name) {
    registeringUserName = name;
}

export function fakeLogin() {
    login({ displayName: "Faker"});
}

function login(newUser) {
    let u = null;
    if (newUser) {
        u = {
            displayName: newUser.displayName || registeringUserName,
        };
    }
    registeringUserName = null;
    user.set(u);
    isLoading.set(false);
}

firebase.auth().onAuthStateChanged(newUser => {
    login(newUser);
});

