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
	navigateTo("#/");
	scrollToTop();
}

function scrollToTop() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}



// =========== attach events =========== //
document.querySelector("#btn-logout").onclick = () => logout();

// ========== Reading from collection (modular v9) ========== //

// >>>>>>>>> dette bruger I ikke, gør I?

// // reference to darabase
// const _db = getFirestore();
// // reference to users collection in database
// const _usersRef = collection(_db, "users");
// let _users = [];


// ========== Router STUFF ========== //

/**
 * All routes of the SPA
 * "path": "id of page in DOM"
 */
 const _routes = {
	"#/": "home",
	"#/login": "login",
	"#/medlemmer": "medlemmer",
	"#/404": "page-404",
	"#/profile": "profile"
};
const _pages = document.querySelectorAll(".page");
const _basePath = location.pathname.replace("index.html", ""); // remove index.html from path
const _navLinks = document.querySelectorAll("nav a");

/**
 * Changing display to none for all pages
 */
function hideAllPages() {
	for (const page of _pages) {
		page.style.display = "none";
	}
}

/**
 * Navigating SPA to specific page by given path
 */
export function navigateTo(path) {
	window.history.pushState({}, path, _basePath + path);
	showPage(path);
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

/**
 * Displaying page by given path
 */
function showPage(path) {
	if(path === "#/medlemmer" && !_auth.currentUser){
		path ="#/login"
	}

	hideAllPages(); // hide all pages
	document.querySelector(`#${_routes[path]}`).style.display = "block"; // show page by given path
	if (path != "#/login" && path != "#/signup") {
		setActiveTab(path);
	}
}

/**
 * sets active menu item by given path
 */
function setActiveTab(path) {
	for (const link of _navLinks) {
		if (path === link.getAttribute("href")) {
			link.classList.add("current");
		} else {
			link.classList.remove("current");
		}
	}
}

/**
 * Attaching event to nav links and preventing default anchor link event
 */
function attachNavLinkEvents() {
	const navLinks = document.querySelectorAll(".nav-link");
	for (const link of navLinks) {
		link.addEventListener("click", function (event) {
			const path = link.getAttribute("href");
			navigateTo(path);
			event.preventDefault();
		});
	}
}

/**
 * Initialising the router, calling attachNavLinkEvents(), popstate event and navigateTo()
 */
function initRouter() {
	attachNavLinkEvents();
	window.onpopstate = () => showPage(location.hash); // change page when using back and forth in browser

	let path = "#/"; // default path
	if (_routes[location.hash]) {
		path = location.hash;
	}
	navigateTo(path);
}

initRouter();

// show and hide tabbar
function showTabbar(show) {
	let tabbar = document.querySelector(".tabbar");
	if (show) {
		tabbar.classList.remove("hide");
	} else {
		tabbar.classList.add("hide");
	}
}
