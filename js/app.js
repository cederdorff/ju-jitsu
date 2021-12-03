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
 // ----------------------------------- login bage - det LM prøver på start --------------------------------- //

 // Instialize Firebase
firebaseConfig.initializeApp(firebaseConfig);

//===== FIREBASE AUTH =====//
firebaseConfig.auth().onAuthStateChanged(function(user) {
	if (user) {
		userAuthenticated(user);
	} else {
		userNotAuthenticated();
	}
});
S
function userAuthenticated(user) {
	appendUserData(user);
	showPage("#medlemmer");
}

function userNotAuthenticated() {
	showpage("#loginSite");
}

const uiConfig = {
	credentialHelper: firebaseConfig.auth.credentialHelper.NONE,
	signeInOptions: [
		firebase.signInWithEmailAndPassword
	],
	signInSuccessUrl: "#medlemmer"
}

const ui = new firebaseUi.auth.AuthUI(firebase.auth());
ui.start("#firebaseui-auth-container", uiConfig);

 // ----------------------------------- login bage - det LM prøver på slut --------------------------------- //
// // Initialize Firebase
// initializeApp(firebaseConfig);
// const _auth = getAuth();

// onAuthStateChanged(_auth, user => {
// 	console.log(user);
// 	if (user) {
// 		navigateTo("#/");
// 	} else {
// 		// User is signed out
// 		if (location.hash == "#/signup") {
// 			navigateTo("#/signup");
// 		} else {
// 			navigateTo("#/login");
// 		}
// 	}
// });

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



