// Gestion du login
var modal = document.getElementById("loginModal");


// Function to open the modal for the login
function openModal() {

    modal.style.display = "block";


}
// Function to close the modal for the login
function closeModal() {


    modal.style.display = "none";



}

// info contiendra le token d acces et tous les autre infos necesssaires 
let infos = {};
const cityString = document.querySelector("#city");
const logoicon = document.querySelector("#logo");
const client = document.querySelector("#client");
const nameHotelstring = document.querySelector("#nameHotel");
let indexedMatrix;

function login() {
    // "chambre1@snow-chill2.com", "abcd1234"
    // "chambre102@ibisavignoncentregare2.com", "abcd1234"
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    logIn(username, password).then((data) => {

        showLoadingIndicator()
        closeModal();
        infos['token'] = data.token;
        infos["userId"] = data.userId;
        infos["hotelId"] = data.owner;

        Promise.all([getUser(infos.userId, infos), getHotel(infos.hotelId, infos)])
            .then((res) => {
                infos["userInfos"] = res[0];
                infos["hotelInfos"] = res[1];
                client.innerHTML = infos.userInfos.clientName;
                city.innerHTML = infos.hotelInfos.city;
                nameHotel.innerHTML = infos.hotelInfos.name;


                logo.setAttribute('src', `https://hospitality.ansetech.com/host/${infos.hotelInfos.picturePath}`);

                getPages(infos.hotelId, infos).then((pages) => {
                    infos["pages"] = pages;
                    //

                    console.log(infos.pages);
                    //construction des elements 

                    indexedMatrix = buildPannel(convertData(infos.pages).grid);
                    hideLoadingIndicator();



                    console.log(indexedMatrix);



                    const first=indexedMatrix.first().first();
                    first.focus();
                
                    const backgroundImage=first.getAttribute('icon');
                    const body=document.querySelector("body");
                    body.style.backgroundImage = "url(" + backgroundImage + ")";



                });

                console.log(infos);
            });
    });

}

// loading indicator functions
function showLoadingIndicator() {
    document.getElementById("loading-container").style.display = "flex";
}

function hideLoadingIndicator() {
    document.getElementById("loading-container").style.display = "none";
}


