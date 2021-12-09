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
	//activer classen der ændre min bar til et X og den class der viser menuen
	hamburger.classList.toggle("active");
	navMenu.classList.toggle("active");
	
});

//Søger for at nav lukker sig og bliver "normal" når man klikker på et link.
document.querySelectorAll(".nav-link").forEach(n =>
	 //add en eventlistener
		n.addEventListener("click", () => {
			//click event, der vil fjerne active class
			hamburger.classList.remove("active");
			navMenu.classList.remove("active");
		})
);





// ===========  hide og show knap til pensum på "for medlemmer" ===========  //
function btn_adult() {
	const x = document.getElementById("adult_pensum");
		if (x.style.display === "block") {
	 		x.style.display = "none";
		} else {
	  		x.style.display = "block";
	  		document.getElementById("children_pensum").style.display = "none";
		}
}

function btn_children() {
	const x = document.getElementById("children_pensum");
		if (x.style.display === "block") {
	  		x.style.display = "none";
		} else {
	  		x.style.display = "block";
	  		document.getElementById("adult_pensum").style.display = "none";
		}
}

document.querySelector("#btn-adult").onclick = () => btn_adult();
document.querySelector("#btn-children").onclick = () => btn_children();

// =  hide og show knap til pensum børne pensum på "for medlemmer" =  //
function btn_belt_children() {
	$("#belt_childrent_hide").toggleClass("open");
	if (!$("#belt_childrent_hide").hasClass("open")) {
		$(".btn_belt_children").text("... Se flere");
	} else {
		$(".btn_belt_children").text("... Se mindre");
	}
};

document.querySelector("#belt_childrent_hide").onclick = () => btn_belt_children();


