// 1. Récupération des inputs
// 2. Création Cookies
// 3. Affichage Cookies dans info-txt si appui sur le bouton Afficher

const cookieForm = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const infoTxt = document.querySelector('.info-txt');
const display = document.querySelector('.display-cookie-btn');
let nameCookies=[];

cookieForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    //Recupération des inputs :
    // On créé un objet Cookie :
    const newCookie ={};

    inputs.forEach(input =>{
        const nameAttribute = input.getAttribute("name");
        // console.log(nameAttribute)
        // console.log(input.value)
        // On rempli l'objet
        newCookie[nameAttribute]=input.value;
        //console.log(newCookie);
    })
    // création de l'argument expires
    newCookie.expires = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
    
    createCookie(newCookie);

    // remise à 0 des inputs pour nouvelles entrées.
     cookieForm.reset();
});

// Function Creation Cookie
function createCookie(newCookie) {
    // Verification si le cookie existe.
    if (doesCookieExiste(newCookie.name)) {
        createToast({name: newCookie.name, state: "modifié",color: "red"});
    } else {
        createToast({name: newCookie.name, state: "créé",color: "green"});
    }

    // Création du cookie avec document.cookie.
    document.cookie=`${encodeURIComponent(newCookie.name)}=${encodeURIComponent(newCookie.value)}; ${newCookie.expires.toUTCString()}; path=/; secure`;
 
}

// Fonction de vérification cookie Existe en fonction du nom dans l'objet
function doesCookieExiste(name){
    // Decomposition de tous les cookies présent: on récupère le nom uniquement des cookies dans un tableau
    // Utilisation regex pour enlever les espaces, split pour créer un tableau en enlevant ;
    // et map pour créer un tableau avec uniquement la 1ere valeur
    const cookies = document.cookie.replace(/\s/g, "").split(";").map(cookie => cookie.split("=")[0]);
    const presence = cookies.find(cookie => cookie === encodeURIComponent(name))
    
    return presence;
}

const toastsContainer=document.querySelector(".toasts-container");

// GESTION CREATION PETIT TOAST EN BAS A DROITE
function createToast({name, state, color}){
    const toastInfo = document.createElement('p');
    toastInfo.className='toast';

    toastInfo.textContent=`Cookie : ${name} ${state}`;
    toastInfo.style.backgroundColor=color;

    toastsContainer.appendChild(toastInfo);

    setTimeout(()=>{
        toastInfo.remove();
    },1500)
}

// GESTION AFFICHAGE
// -----------------
const displayCookieBtn = document.querySelector('.display-cookie-btn');

// On ecoute l'evenement Click sur le bouton Afficher
// On récupère les cookies sous format tableau
displayCookieBtn.addEventListener('click',(e)=>{
    const cookies = document.cookie.replace(/\s/g, "").split(";").map(cookie => cookie.split("="));
    
    //console.log(cookies[0][1]);
    // Creation des éléments Li pour affichage
    createElementLi(cookies);

});

// Creation de l'affichage des Cookies
// On séléectionne l'élément du DOM
const cookiesList = document.querySelector(".cookies-list");

function createElementLi(cookies) {
    // On itère sur chaque élément du tableau cookies
    cookies.forEach( cookie =>{
        const cookieLi = document.createElement('li');
        cookieLi.className="cookie-li";
        const name = decodeURIComponent(cookie[0]);
        cookieLi.innerHTML = `
                <p>Nom : ${name}</p></br>
                <p>Valeur : ${cookie[1]}</p></br>
                <button>X</button>
        `;
        // On séléctionne le bouton créer juste en haut au clic de l'évenement
        cookieLi.querySelector("button").addEventListener('click',(e)=>{
            createToast({name: name, state: "supprimé",color: "blue"});
            document.cookie =`${cookie[0]}=; expires=${new Date(0)}`;
            e.target.parentElement.remove();
        })
        cookiesList.appendChild(cookieLi);
    });
 
}

