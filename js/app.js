import { navigateTo } from "./router.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import {
	getAuth,
	onAuthStateChanged,
	signOut
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

import {
    getFirestore,
    collection
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";


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
		userNotAuthenticated();
		if (location.hash === "#/medlemmer" || location.hash === "#/login") {
			navigateTo("#/login");
		}
	}
});

function userAuthenticated(user) {
	appendUserData(user);
	navigateTo("#/medlemmer");
}

function appendUserData(user) {
	console.log(user);
}

function userNotAuthenticated() {

	// Firebase UI configuration
	const uiConfig = {
		credentialHelper: firebaseui.auth.CredentialHelper.NONE,
		signInOptions: [
			firebase.auth.EmailAuthProvider.PROVIDER_ID
		],
		signInSuccessUrl: "#/medlemmer"
	};
	// Init Firebase UI Authentication
	if (!_firebaseUI) {
		_firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());
	}
	_firebaseUI.start("#firebaseui-auth-container", uiConfig);
	//showLoader(false);
}

function logout() {
	signOut(_auth);
}

// ========== Reading from collection (modular v9) ========== //

// reference to darabase
const _db = getFirestore();
// reference to users collection in database
const _usersRef = collection(_db, "users");
let _users = [];


// =========== attach events =========== //
document.querySelector("#btn-logout").onclick = () => logout();
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



