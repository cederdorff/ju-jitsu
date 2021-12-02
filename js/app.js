import { navigateTo } from "./router.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import {
	getAuth,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCcbowFE6WkMAZJrrOwwzLEx4xLmdGJMY",
    authDomain: "hjjn-edd00.firebaseapp.com",
    projectId: "hjjn-edd00",
    storageBucket: "hjjn-edd00.appspot.com",
    messagingSenderId: "792163728984",
    appId: "1:792163728984:web:7805af5d294f4346a6542d"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const _auth = getAuth();

onAuthStateChanged(_auth, user => {
	console.log(user);
	if (user) {
		navigateTo("#/");
	} else {
		// User is signed out
		if (location.hash == "#/signup") {
			navigateTo("#/signup");
		} else {
			navigateTo("#/login");
		}
	}
});

function login() {
	const mail = document.querySelector("#login-mail").value;
	const password = document.querySelector("#login-password").value;

	signInWithEmailAndPassword(_auth, mail, password)
		.then(userCredential => {
			// Signed in
			const user = userCredential.user;
			console.log(user);
			document.querySelector(".login-message").innerHTML = "";
		})
		.catch(error => {
			console.log(error);
			document.querySelector(".login-message").innerHTML = error.message;
		});
}

function logout() {
	signOut(_auth);
}

function signup() {
	const mail = document.querySelector("#signup-mail").value;
	const password = document.querySelector("#signup-password").value;
	createUserWithEmailAndPassword(_auth, mail, password)
		.then(userCredential => {
			// Signed in
			const user = userCredential.user;
			console.log();
		})
		.catch(error => {
			console.log(error);
			document.querySelector(".signup-message").innerHTML = error.message;
		});
}

// =========== attach events =========== //
document.querySelector("#btn-login").onclick = () => login();
document.querySelector("#btn-logout").onclick = () => logout();
document.querySelector("#btn-signup").onclick = () => signup();



