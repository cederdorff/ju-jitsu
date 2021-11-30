// =================================================== Navigation =====================================================
//adgang til hamburger og nav-menu class
const hamburger = document.querySelector(".hamburger"); 
const navMenu = document.querySelector(".nav-menu");

//add en event lisenter til hamburger
hamburger.addEventListener("click", () => { //activer classen der ændre mine bar til et X og den class der viser menuen
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

//Søger for at nav lukker sig og bliver "normal" når man klikker på et link. 
document.querySelectorAll(".nav-link").forEach(n => n. //add en eventlistener
    addEventListener("click", () => { //click event, der vil fjerne active class
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
}))
