// ========== imports ==========

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

import { getFirestore, collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";

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

// reference to darabase
const _db = getFirestore();
// reference to users collection in database
const _usersRef = collection(_db, "users");

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

function userNotAuthenticated() {
    // Firebase UI configuration
    const uiConfig = {
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
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
    if (path === "#/medlemmer" && !_auth.currentUser) {
        path = "#/login";
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

window.navigateTo = path => navigateTo(path);

// =================================================== Navigation =====================================================
//adgang til hamburger og nav-menu class
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const subscribeBtn = document.querySelector(".lil-button");

//add en event lisenter til hamburger
hamburger.addEventListener("click", () => {
    //activer classen der ændre mine bar til et X og den class der viser menuen
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    subscribeBtn.classList.toggle("hide");
});

//Søger for at nav lukker sig og bliver "normal" når man klikker på et link.
document.querySelectorAll(".nav-link").forEach(link =>
    //add en eventlistener
    link.addEventListener("click", () => {
        //click event, der vil fjerne active class
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        subscribeBtn.classList.add("hide");
    })
);

//highlighter den side man er på
// const header = document.getElementById("nav-menu");
// const  navt = header.getElementsByClassName(".nav-item");
// for (var i = 0; i < navt.length; i++) {
// 	navt[i].addEventListener("click", function() {
// 	const  current = document.getElementsByClassName("active");
//   current[0].className = current[0].className.replace(" active", "");
//   this.className += " active";
//   });
// }

// =======================================  hide og show knap til pensum på "for medlemmer" ==========================================  //
function btn_adult() {
    const x = document.getElementById("adult_pensum");
    if (x.style.display === "block") {
        x.style.display = "none";
        document.getElementById("btn-adult").classList.remove("active-btn");
    } else {
        x.style.display = "block";
        document.getElementById("children_pensum").style.display = "none";
        document.getElementById("btn-children").classList.remove("active-btn");
        document.getElementById("btn-adult").classList.add("active-btn");
    }
}

function btn_children() {
    const x = document.getElementById("children_pensum");
    if (x.style.display === "block") {
        x.style.display = "none";
        document.getElementById("btn-children").classList.remove("active-btn");
    } else {
        x.style.display = "block";
        document.getElementById("adult_pensum").style.display = "none";
        document.getElementById("btn-adult").classList.remove("active-btn");
        document.getElementById("btn-children").classList.add("active-btn");
    }
}

document.querySelector("#btn-adult").onclick = () => btn_adult();
document.querySelector("#btn-children").onclick = () => btn_children();

// document.querySelector("#btn-adult").onclick = () => btn_adult();
// document.querySelector("#btn-children").onclick = () => btn_children();

// =  hide og show knap til pensum børne pensum på "for medlemmer" =  //
// function btn_belt_children.click(() =>{
// 	$(".belt_childrent_hide").toggleClass("open");
// 	if (!$(".belt_childrent_hide").hasClass("open")) {
// 		$(".btn_belt_children").text("... Se flere");
// 	} else {
// 		$(".btn_belt_children").text("... Se mindre");
// 	}
// });

// ===========  scrool to top på "for medlemmer" i bunden ===========  //
function to_top() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

document.querySelector("#to-top").onclick = () => to_top();

// ===========  Rediger bruger ===========  //
async function getUserData() {
    const authUser = _auth.currentUser;
    const docRef = doc(_usersRef, authUser.uid);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();

    return {
        ...authUser,
        ...userData
    };
}

async function appendUserData() {
    //ligger i firebase auth under userAuthenticated
    const user = await getUserData();
    document.querySelector("#name").value = user.name || user.displayName;
    document.querySelector("#mail").value = user.email;
    document.querySelector("#phone").value = user.phone || "";
    document.querySelector("#beltType").value = user.beltTye || "";
    document.querySelector("#imagePreview").src = user.img || "img/placeholder.png";
}

async function updateUser() {
    // showLoader(true);
    const userToUpdate = {
        name: document.querySelector("#name").value,
        mail: document.querySelector("#mail").value,
        phone: document.querySelector("#phone").value,
        beltType: document.querySelector("#beltType").value,
        img: document.querySelector("#imagePreview").src
    };
    const userRef = doc(_usersRef, _auth.currentUser.uid);
    await setDoc(userRef, userToUpdate, { merge: true });
    // showLoader(false);
}

// =========== attach events =========== //
document.querySelector("#btn-adult").onclick = () => btn_adult();
document.querySelector("#btn-children").onclick = () => btn_children();
window.updateUser = () => updateUser();
document.querySelector("#btn-logout").onclick = () => logout();
