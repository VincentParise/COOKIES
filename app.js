// 1. Récupération des inputs
// 2. Création Cookies
// 3. Affichage Cookies dans info-txt si appui sur le bouton Afficher

const form = document.querySelector("form");
const inputNames = document.querySelectorAll("input");
const infoTxt = document.querySelector('.info-txt');
const display = document.querySelector('.display-cookie-btn');
let nameCookies=[];

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    //Recupération des inputs :
    //console.log(inputNames[0].value + ' '+inputNames[1].value);

    createCookie(inputNames[0].value,inputNames[1].value,60);

    // remise à 0 des inputs pour nouvelles entrées.
    // inputNames[0].value='';    
    // inputNames[1].value=null;
    form.reset();
});

// Function Creation Cookie
function createCookie(name, value, days) {
    nameCookies.push(name);
    let expire = '';
    if (days){
        const date = new Date();
        date.setTime(date.getTime()+days);
        expire=`expires=${date.toUTCString()}`
        //console.log(expire)
    }
    document.cookie=`${name}=${encodeURIComponent(value)}; ${expire}; path=/; secure`;
    //console.log(`${name}=${encodeURIComponent(value)}; ${expire}; path=/; secure`)
    //console.log(nameCookies);
}

display.addEventListener('click',(e)=>{
   
    console.log(getCookie(inputNames[0].value));
    

});

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const [key, value] = cookies[i].split('=');
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;

}
