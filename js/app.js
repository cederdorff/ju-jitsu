import { navigateTo } from "./router.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import {
	getAuth,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

// ========== FIREBASE SIGN IN FUNCTIONALITY ========== //
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCCcbowFE6WkMAZJrrOwwzLEx4xLmdGJMY",
	authDomain: "hjjn-edd00.firebaseapp.com",
	projectId: "hjjn-edd00",
	storageBucket: "hjjn-edd00.appspot.com",
	messagingSenderId: "792163728984",
	appId: "1:792163728984:web:7805af5d294f4346a6542d"
};
// Initialize Firebase (modular)
initializeApp(firebaseConfig);
const _auth = getAuth();

// Initialize Firebase UI (non modular)
firebase.initializeApp(firebaseConfig);
let _firebaseUI;

// ========== FIREBASE AUTH ========== //
// Listen on authentication state change

onAuthStateChanged(_auth, user => {
	console.log(user);
	if (user) {
		userAuthenticated(user);
	} else {
		// User is signed out
		if (location.hash === "#/medlemmer" || location.hash === "#/login") {
			userNotAuthenticated();
		}
	}
});

function userAuthenticated(user) {
	appendUserData(user);
}

function userNotAuthenticated() {
	navigateTo("#/login");

	// Firebase UI configuration
	const uiConfig = {
		credentialHelper: firebaseui.auth.CredentialHelper.NONE,
		signInOptions: [
			firebase.auth.EmailAuthProvider.PROVIDER_ID,
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.FacebookAuthProvider.PROVIDER_ID
		],
		signInSuccessUrl: "#/medlemmer"
	};
	// Init Firebase UI Authentication
	if (!_firebaseUI) {
		_firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());
	}
	_firebaseUI.start("#firebaseui-auth-container", uiConfig);
	// showLoader(false);
}
// ----------------------------------- login bage - det LM prøver på slut --------------------------------- //

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
// document.querySelector("#btn-login").onclick = () => login();
// document.querySelector("#btn-logout").onclick = () => logout();
// document.querySelector("#btn-signup").onclick = () => signup();
window.navigateTo = path => navigateTo(path);

// =================================================== Navigation =====================================================
//adgang til hamburger og nav-menu class
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

//add en event lisenter til hamburger
hamburger.addEventListener("click", () => {
	//activer classen der ændre mine bar til et X og den class der viser menuen
	hamburger.classList.toggle("active");
	navMenu.classList.toggle("active");
});

//Søger for at nav lukker sig og bliver "normal" når man klikker på et link.
document.querySelectorAll(".nav-link").forEach(n =>
	n //add en eventlistener
		.addEventListener("click", () => {
			//click event, der vil fjerne active class
			hamburger.classList.remove("active");
			navMenu.classList.remove("active");
		})
);



