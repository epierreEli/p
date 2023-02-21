console.clear();
console.log("reload");
console.log();

// var start=document.getElementById("homepage");
// setTimeout(() => {
//     start.style.display="none";
//   }, 3000)

var client=document.getElementById("client");
var nameHotel=document.getElementById("name");

// var iconLangue=["https://cdn-icons-png.flaticon.com/512/330/330490.png", // fr
//                 "https://cdn-icons-png.flaticon.com/512/330/330425.png", // en
//                 "https://cdn-icons-png.flaticon.com/512/330/330523.png", // de
//                 "https://cdn-icons-png.flaticon.com/512/330/330672.png", // it
//                 "https://cdn-icons-png.flaticon.com/512/330/330557.png", // es
//                ]


// Météo
var city=document.getElementById("city");
var temp=document.getElementById("weather");
var iconWeather=document.getElementById("iconWeather");
var cityTag="Toulon";
// var icon=["https://openweathermap.org/img/wn/01d@2x.png", // Clear sky
//           "https://openweathermap.org/img/wn/02d@2x.png", // Few clouds 
//           "https://openweathermap.org/img/wn/03d@2x.png", // Scattered clouds 
//           "https://openweathermap.org/img/wn/04d@2x.png", // Broken clouds 
//           "https://openweathermap.org/img/wn/09d@2x.png", // Shower rain 
//           "https://openweathermap.org/img/wn/10d@2x.png", // Rain
//           "https://openweathermap.org/img/wn/11d@2x.png", // Thunderstorm 
//           "https://openweathermap.org/img/wn/13d@2x.png", // Snow
//           "https://openweathermap.org/img/wn/50d@2x.png"  // Mist
//         ]
function getWeather() {
    console.log("citytag = "+cityTag+"; getWeather");
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityTag},fr&appid=c21a75b667d6f7abb81f118dcf8d4611&units=metric`;
    $.get(url).done(function(data){
                  var dataTemp=data.main.temp.toFixed(1);
                  temp.innerHTML =dataTemp+" °C";
                  iconWeather.setAttribute("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
              })
              .fail(function() {
                  console.log( "error" );
              })
              .always(function() {
                  console.log( "update weather finished" );
              });
}
getWeather();

// Heure + Date

var time = document.getElementById("time");
var dateLocal=document.getElementById("date");
var updateDate=true;
var updateHeure=true;
var updateMeteo=false
var options={ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
function updateTime(){ 
    var date = new Date(); 
    var hours = date.getHours(); 
    var minutes = date.getMinutes(); 
    var seconds = date.getSeconds(); 
    var largeurClient;
    // console.log("updateHeure : "+updateHeure+"; updateMeteo : "+updateMeteo+"; updateDate : "+updateDate);
    if (updateDate){
        dateLocal.innerHTML=date.toLocaleDateString('fr-FR',options);
        updateDate=false;
        largeurClient=document.getElementById("info").offsetWidth;
        $("#location").css("width",largeurClient);
    }
    else {
        if (hours==23 && minutes==59 && seconds==59){
            updateDate=true;
        }
    }
    if(updateHeure){
        time.innerHTML = ((hours < 10) ? "0" : "") + hours + ((minutes < 10) ? ":0" : ":") + minutes+ ((seconds < 10) ? ":0" : ":") + seconds;
        // updateHeure=false;
    }
    else{
        if(seconds==59){
            updateHeure=true;
        }
    }
    if(updateMeteo){
        getWeather();
        updateMeteo=false;
    }
    else{
        if(seconds==59){
            updateMeteo=true;
        }
    }
} 
updateTime();
setInterval(updateTime, 1000);



// Nav Spacial du bled  

var body=document.getElementsByTagName("body")[0];
body.focus();
var category=document.getElementsByClassName("category");
var nbCategoryTotal=category.length;
var itemInCategory=category[0].getElementsByClassName("item");
var nbItemInCategory=itemInCategory.length;
var categorySelected=0;
var itemSelected=0;

// Init Nav
// $("#itemSetting").css("-webkit-filter","brightness(100%)");
// $("#itemSetting").find(".item").eq(0).css("border","5px solid white")
$(".category").eq(0).css("-webkit-filter","brightness(100%)");
itemInCategory[0].style.border=" 5px solid white";
// category[0].style.filter="brightness()";
// category[0].classList.add("categorySelected");

// console.log("category = "+categorySelected+"; item ="+itemSelected+"; toggle ="+toggleSetting);

var main = document.getElementsByTagName("main")[0];
main.scrollTop=0;
category[0].scrollLeft=0;
var categoryWidth=getComputedStyle(category[0]).width;
var scrollLeftLength=$(".category").eq(1).find(".item").eq(1).position().left;
var scrollMaxGauche=category[0].scrollWidth-category[0].clientWidth;
var scrollAt=0;
// console.log("width = "+categoryWidth);
// console.log("Scroll Max = "+scrollMaxGauche);
// console.log("scroll = "+scrollLeftLength);
// console.log("scrollAt = "+scrollAt);
// console.log("main.scrollHeight = "+main.scrollHeight+"; main.clientHeight = "+main.clientHeight);
var mainTitle=document.getElementById("mainTitle");
var styleMainTitle=window.getComputedStyle(mainTitle);
var hauteurMainTitle=mainTitle.offsetHeight+parseInt(styleMainTitle.marginTop)+parseInt(styleMainTitle.marginBottom);
// console.log("height tot title = "+hauteurMainTitle);
var categoryTitle=document.getElementsByTagName("h3")[0];
var styleCategoryTitle=window.getComputedStyle(categoryTitle);  
var hauteurCategoryTitle=categoryTitle.offsetHeight+parseInt(styleCategoryTitle.marginTop)+parseInt(styleCategoryTitle.marginBottom);
// console.log(categoryTitle.offsetHeight/2)
// console.log("height tot h2 = "+hauteurCategoryTitle);
var styleCategory=window.getComputedStyle(category[1]);  
var hauteurCategory=category[1].offsetHeight+parseInt(styleCategory.marginTop)+parseInt(styleCategory.marginBottom);
// console.log("height tot cat = "+hauteurCategory);
var scrollHautLength=hauteurCategoryTitle-parseInt(styleCategoryTitle.marginTop)+hauteurCategory;
// console.log("height tot = "+scrollHautLength);
// console.log(hauteurMainTitle+(hauteurCategoryTitle-10)/2+hauteurCategory);
var scrollMaxHaut=main.scrollHeight-main.clientHeight;
var scrollHaut=0;

console.log("active element");
console.log(document.activeElement);


onkeydown = function(evt){
    document.getElementById("title").innerHTML="evt.key = "+evt.key+"; evt.keyCode = "+evt.keyCode;
    switch(evt.keyCode){
        case 37: // left
            if(itemSelected-1>=0){
                itemInCategory[itemSelected].style.border=" 5px solid rgb(174,90,33)";
                itemSelected--;
                itemInCategory[itemSelected].style.border=" 5px solid white";
                scrollAt-=scrollLeftLength;
                if (scrollAt<scrollMaxGauche){
                    $(".category").eq(categorySelected).animate({'scrollLeft':scrollAt},100);
                }
                else{
                    $(".category").eq(categorySelected).animate({'scrollLeft':scrollMaxGauche},100);
                }
            }
            break;
        case 38: // up
            if (categorySelected-1>=0){
                itemInCategory[itemSelected].style.border=" 5px solid rgb(174,90,33)";
                $(".category").eq(categorySelected).css("-webkit-filter","brightness(20%)");
                categorySelected--;
                $(".category").eq(categorySelected).css("-webkit-filter","brightness(100%)");
                itemInCategory=category[categorySelected].getElementsByClassName("item");
                nbItemInCategory=itemInCategory.length;
                itemSelected=0;
                itemInCategory[itemSelected].style.border=" 5px solid white";
                scrollAt=0;
                category[categorySelected].scrollLeft=0;
                category[categorySelected].scrollWidth-category[categorySelected].clientWidth;
                if (categorySelected==0){
                    scrollHaut=0;
                    $("main").animate({'scrollTop':scrollHaut},100);
                }
                else {
                    scrollHaut-=scrollHautLength;
                    $("main").animate({'scrollTop':scrollHaut},100);
                }
            }
            break;
        case 39: // right
            if(itemSelected+1<nbItemInCategory){
                itemInCategory[itemSelected].style.border=" 5px solid rgb(174,90,33)";
                itemSelected++;
                itemInCategory[itemSelected].style.border=" 5px solid white";
                scrollAt+=scrollLeftLength;             
                $(".category").eq(categorySelected).animate({'scrollLeft':scrollAt},100);
            }
            break;
        case 40: // down
            if (categorySelected+1<nbCategoryTotal){
                itemInCategory[itemSelected].style.border=" 5px solid rgb(174,90,33)";
                $(".category").eq(categorySelected).css("-webkit-filter","brightness(20%)");
                categorySelected++;
                $(".category").eq(categorySelected).css("-webkit-filter","brightness(100%)");
                itemInCategory=category[categorySelected].getElementsByClassName("item");
                nbItemInCategory=itemInCategory.length;
                itemSelected=0;
                itemInCategory[itemSelected].style.border=" 5px solid white";
                category[categorySelected].scrollLeft=0;
                scrollAt=0;
                scrollMaxGauche=category[categorySelected].scrollWidth-category[categorySelected].clientWidth; 
                if (categorySelected==1){
                    scrollHaut=hauteurMainTitle-parseInt(styleCategoryTitle.marginTop);
                    $("main").animate({'scrollTop':scrollHaut},100);
                }
                else if (categorySelected>=2){
                    scrollHaut+=scrollHautLength;
                    $("main").animate({'scrollTop':scrollHaut},100);
                }
            }
            break;
        case 13: // ok
            break;
        case 461: // retour (461=> tv // 8=>ordi)
            window.location.reload();
            break;
    };
    // console.log("category = "+categorySelected+"; item ="+itemSelected);
    // console.log("scrollAt="+scrollAt+"; scrollMaxGauche="+scrollMaxGauche);
    // console.log("scrollHaut="+scrollHaut+"; scrollMaxHaut="+scrollMaxHaut);
    // console.log(item);
    // console.log(document.activeElement);
}    


// fetch("http://hospitality.ansetech.com:7001/api/codes_www").then((response) => 
//     response.json()).then((data)=>{
//         console.log("test api");
//         console.log(data[0]);
//     });


// async function loginIn(params){
//     console.log("login fetch")
//     const res = await fetch("https://hospitality.ansetech.com:7443/api/auth/local",
//         {
//             // mode:'no-cors',
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json; charset=UTF-8',
//                 'Accept': 'application/json',
//                 'User-Agent': 'Android Multipart HTTP Client 1.0',
//             },
//             body: JSON.stringify(
//                 {
//                     "email": "chambre1@snow-chill2.com",
//                     "password": "abcd1234",
//                 }
//             )
//         }
//     ).then((response) => response.json());
//     console.log(res);
//     return res;
// }
// let i=0;
// function loginInJQuery(params) {
//     console.log("login jQuery");
//     return $.ajax({
//         url: "https://hospitality.ansetech.com:7443/api/auth/local",
//         type: 'POST',
//         // headers: {
//         //     'Content-Type': 'application/json; charset=UTF-8',
//         //     'Accept': 'application/json',
//         // },
//         // headers: { 'Access-Control-Allow-Origin': '*' },
//         crossDomain: true,
//         data:{
//             "email": "chambre1@snow-chill2.com",
//             "password": "abcd1234",
//         },
//         dataType: 'json',
        
//     })
//     .done((response) => {
//         console.log(response);
//         city.innerHTML="request Fini";
//         client.innerHTML=response.userId;
//         return response;
//     })
//     .fail((response)=>{
//         // console.log(response);
//         client.innerHTML=JSON.stringify(response);
//         city.innerHTML="ERROR";
//         // i+=1;
//         // loginInJQuery();
//     })
//     .always((response)=> {
//         // console.log(response);
//         nameHotel.innerHTML="Login jQuery";
//     })
// };
// loginInJQuery();


// function zFitness(param){
//     $.ajax({
//         url:"https://hospitality.ansetech.com:7443/api/zfitness/videos",
//         type:'GET'
//     })
//     .done((response)=>{
//         console.log(response);
//         document.getElementById("title").innerHTML="zfitness = "+response.success;
//     })
//     .fail((response)=>{
//         // console.log(response);
//         cldocument.getElementById("title").innerHTML=JSON.stringify(response);
//         // i+=1;
//         // loginInJQuery();
//     })
//     .always((response)=> {
//         // console.log(response);
//     })
// }
// zFitness();

function testLogin(params){
    $.ajax({
		method : "POST",
		// contentType : 'application/json; charset=utf-8',
		// dataType : 'json',
		// crossDomain : true,
		url : 'https://reqres.in/api/login',
		data :{
            "email": "eve.holt@reqres.in",
            "password": "cityslicka",
		}
	})
    .done((response)=>{
        console.log(response);
        client.innerHTML=JSON.stringify(response);
    })
    .fail((response)=>{
        console.log(response);
        client.innerHTML=JSON.stringify(response);
        city.innerHTML="Error"
    })
    .always((response)=>{})
}
testLogin();

// function loginInJQueryNoPort(params) {
//     console.log("login jQuery NO PORT");
//     city.innerHTML="request NO PORT";
//     return $.ajax({
//         url: "https://hospitality.ansetech.com/api/auth/local",
//         method: 'POST',
//         // headers: {
//         //     'Content-Type': 'application/json; charset=UTF-8',
//         //     'Accept': 'application/json',
//         // },
//         data:{
//             "email": "chambre1@snow-chill2.com",
//             "password": "abcd1234",
//         },
//         //dataType: 'json',
//     })
//     .done((response) => {
//         console.log(response);
//         city.innerHTML="request Fini";
//         client.innerHTML=response.userId;
//         return response;
//     })
//     .fail((response)=>{
//         // console.log(response);
//         client.innerHTML=JSON.stringify(response);
//         // city.innerHTML="ERROR";
//         categoryTitle.innerHTML="ERROR";
//         // i+=1;
//         // loginInJQuery();
//     })
//     .always((response)=> {
//         // console.log(response);
//         nameHotel.innerHTML="ALWAYS";
//     })
// };
// setInterval(loginInJQueryNoPort,10000);


// async function LoginInTestPost(params){
//     const res = await fetch("https://reqres.in/api/login",
//             {
//                 method: 'POST',
//                 data:
//                     {
//                         "email": "eve.holt@reqres.in",
//                         "password": "cityslicka",
//                     }
//             }
//     ).then((response) =>console.log(response));
//     console.log(res);
//     // city.innerHTML="Reques"
//     return res;
// }
// LoginInTestPost();

// function loginInXHR(params){
//     console.log("login XHR");
//     const xhr = new XMLHttpRequest();
//     xhr.open("POST", 
//              `https://hospitality.ansetech.com:7443/api/auth/local`,
//               true,
//             );
//     xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
//     xhr.onreadystatechange = function () {
//         city.innerHTML=xhr.readyState;
//         if (xhr.readyState ==4 && xhr.status ==200) {
//             var response = JSON.parse(this.response);
//             console.log(response);
//             // client.innerHTML=response.userId;
//             //Use this sessionId in all other calls
//             // city.innerHTML="Request fini";
//         }
//     }
//     xhr.send('{"email":"chambre1@snow-chill2.com","password":"abcd1234"}');
// }
// loginInXHR();

// function getWeather() {
//     console.log("citytag = "+cityTag+"; getWeather");
//     var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityTag},fr&appid=c21a75b667d6f7abb81f118dcf8d4611&units=metric`;
//     $.get(url).done(function(data){
//         var dataTemp=data.main.temp.toFixed(1);
//         temp.innerHTML =dataTemp+" °C";
//         iconWeather.setAttribute("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
//     })
//       .fail(function() {
//         console.log( "error" );
//       })
//       .always(function() {
//          console.log( "update weather finished" );
//       });
// }

// async function getUser(data) {
//     const res = await fetch(`https://hospitality.ansetech.com:7443/api/users/${data.userId}`,
//         {
//             headers:{
//                 "User-Agent":"MyAgent",
//                 "Authorization": "Bearer "+data.token,
//             }
//         }
//     ).then((response) => response.json());
//     // console.log(res.user[0]);
//     return res.user[0];
// }
// async function getHotel(data,user) {
//     const res = await fetch(`https://hospitality.ansetech.com:7443/api/hotels/${user.hotel_id}`,
//         {
//             headers:{
//                 "User-Agent":"MyAgent",
//                 "Authorization": "Bearer "+data.token,
//             }
//         }
//     ).then((response) => response.json());
//     // console.log(res.hotel[0]);
//     return res.hotel[0];
// }

// async function getPage(data, user){
//     const res = await fetch(`https://hospitality.ansetech.com:7443/api/pages/fr/${user.hotel_id}`,
//         {   
//             // mode:'no-cors',
//             headers:{
//                 "User-Agent":"MyAgent",
//                 "Authorization": "Bearer "+data.token,
//             }
//         }
//     ).then((response) => response.json());
//     // console.log(res);
//     return res;
// }

// function image(hotel){
//     console.log('Affiche')
//     image1.setAttribute('src',`http://hospitality.ansetech.com/host/${hotel.picturePath}`);
//     image2.setAttribute('src',`http://hospitality.ansetech.com/host/files/images/welcome/${hotel.welcomeImage}`)
// }

// function affiche(user){
//     // console.log("affichage");
//     client.innerHTML=user.clientName;
//     // city.innerHTML=hotel.city;
//     // cityTag=hotel.city
//     getWeather();
//     // console.log("nb category : "+page.length);
//     // console.log("cat 1 : "+page[0].title+"; nb item = "+page[0].contents.length);
//     // console.log("item 1 : "+page[0].contents[0].title);
//     // console.log("item 2 : "+page[0].contents[1].title);
//     // console.log("cat 2 : "+page[1].title+"; nb item = "+page[1].contents.length);
//     // console.log("item 1 : "+page[1].contents[0].title);
//     // console.log("item 2 : "+page[1].contents[1].title); 
// }

// function getInfo(params) {
//     console.log("Tentative de connexion");
//     // const data = await loginIn(); 
//     // console.log("Token: "+data.token);
//     const dataJQuery = loginInJQuery();
//     // console.log("dataJQuery");
//     // console.log(dataJQuery);
//     // const dataXHR = loginInXHR();
    
    
//     // console.log("getUser");
//     // const user= await getUser(data); 


//     // console.log("getHotel");
//     // const hotel=await getHotel(data, user);
//     // console.log("getPages");
//     // const page= await getPage(data, user);
    
//     // image(hotel);
//     // affiche(user);
// }

// getInfo();
