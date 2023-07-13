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
var infos = {};
const cityString = document.querySelector("#city");
const logoicon = document.querySelector("#logo");
const client = document.querySelector("#client");
const nameHotelstring = document.querySelector("#nameHotel");
let indexedMatrix;

function login(user, pass) {
    // "chambre1@snow-chill2.com", "abcd1234"
    // "chambre102@ibisavignoncentregare2.com", "abcd1234"

    logIn(user, pass).then((data) => {

        // Save multiple elements in local storage
        if (user && pass) {
            localStorage.setItem("username", user);
            localStorage.setItem("password", pass);
            console.log("user saved successfully");
        }





        
        closeModal();
        // showWelcomeMessage();
        // setTimeout(hideWelcomeMessage, 2000);

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

                    //construction des elements ****************

                    // Call the buildPannel function with the grid data for the application 
                    //  construction des apllication fixes 
                    const appMatrix = buildAppPannel(gridDataApp);
                    //  construction des elements dynamique 
                    console.log(infos);
                    indexedMatrix = buildPannel(convertData(infos.pages).grid);



                    // console.log(infos);


                    indexedMatrix = [...appMatrix, ...indexedMatrix];

                    const first = indexedMatrix[1][0];

                    playAds(indexedMatrix);
   
                  
                    // wes et the background to be the first element of indexedmatrxi befire we concatanate the two matrix 
                    indexedMatrix[0][0].focus();

                    hideLoadingIndicator();


                });


            
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

