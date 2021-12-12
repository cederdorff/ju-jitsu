import { navigateTo } from "./router.js";

window.navigateTo = path => navigateTo(path);

// =================================================== Navigation =====================================================
//adgang til hamburger og nav-menu class
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const subscribeBtn =  document.querySelector(".lil-button");

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
async function getUserData(){
	const authUser =_auth.currentUser;
	const docRef = doc(_userRef, authUser.uid);
	const docsnap = await getDoc(docRef);
	const userData = docSnap.data();

	return {
		...authUser,
		...userData
	};
}

async function appendUserData() { //ligger i firebase auth under userAuthenticated
	const user = await getUserData();
	document.querySelector("#name").value = user.name || user.displayName;
	document.querySelector("#mail").value = user.email;
	document.querySelector("#phone").value = user.phone || "";
	document.querySelector("#beltType").value = user.beltTye || "";
	document.querySelector("#imagePreview").src = user.img || "img/placeholder.jpg";
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
