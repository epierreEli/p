console.clear();
console.log("reload");

// var start=document.getElementById("homepage");
// setTimeout(() => {
//     start.style.display="none";
//   }, 3000)

var clientTag= "Mr MAC Adam";
var client=document.getElementById("client");
client.innerHTML=clientTag;

// var iconLangue=["https://cdn-icons-png.flaticon.com/512/330/330490.png", // fr
//                 "https://cdn-icons-png.flaticon.com/512/330/330425.png", // en
//                 "https://cdn-icons-png.flaticon.com/512/330/330523.png", // de
//                 "https://cdn-icons-png.flaticon.com/512/330/330672.png", // it
//                 "https://cdn-icons-png.flaticon.com/512/330/330557.png", // es
//                ]

// Météo

var cityTag="Toulon";
var city=document.getElementById("city");
city.innerHTML=cityTag;
var temp=document.getElementById("weather");
var iconWeather=document.getElementById("iconWeather");
// var icon=["http://openweathermap.org/img/wn/01d@2x.png", // Clear sky
//           "http://openweathermap.org/img/wn/02d@2x.png", // Few clouds 
//           "http://openweathermap.org/img/wn/03d@2x.png", // Scattered clouds 
//           "http://openweathermap.org/img/wn/04d@2x.png", // Broken clouds 
//           "http://openweathermap.org/img/wn/09d@2x.png", // Shower rain 
//           "http://openweathermap.org/img/wn/10d@2x.png", // Rain
//           "http://openweathermap.org/img/wn/11d@2x.png", // Thunderstorm 
//           "http://openweathermap.org/img/wn/13d@2x.png", // Snow
//           "http://openweathermap.org/img/wn/50d@2x.png"  // Mist
//         ]
function getWeather() {
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+cityTag+",fr&appid=c21a75b667d6f7abb81f118dcf8d4611&units=metric"
    $.get(url, callBackGetSuccess).done(function() {
        // console.log( "second success" );
      })
      .fail(function() {
        console.log( "error" );
      })
      .always(function() {
         console.log( "update weather finished" );
      });
}
var callBackGetSuccess = function(data) {
    var dataTemp=data.main.temp.toFixed(1);
    temp.innerHTML =dataTemp+" °C";
    // console.log("City : "+data.name+"; weather : "+data.weather[0].main);
    iconWeather.setAttribute("src","http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png");
}
getWeather();
setInterval(getWeather,3600000);


// Heure + Date

var time = document.getElementById("time");
var dateLocal=document.getElementById("date");
var updateDate=true;
var updateHeure=true;
var options={ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
function updateTime(){ 
    var date = new Date(); 
    var hours = date.getHours(); 
    var minutes = date.getMinutes(); 
    var seconds = date.getSeconds(); 
    var largeurClient;
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
        time.innerHTML = ((hours < 10) ? "0" : "") + hours + ((minutes < 10) ? ":0" : ":") + minutes;
        updateHeure=false;
    }
    else{
        if(seconds==59){
            updateHeure=true;
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
var categorySelected=0;
var itemInCategory=category[categorySelected].getElementsByClassName("item");
var nbItemInCategory=itemInCategory.length;
var itemSelected=0;
var toggleSetting=false


itemInCategory[itemSelected].style.border=" 5px solid white";
// console.log("active element");
// console.log(document.activeElement);
// console.log("category = "+categorySelected+"; item ="+itemSelected+"; toggle ="+toggleSetting);

var main = document.getElementsByTagName("main")[0];
main.scrollTop=0;
category[0].scrollLeft=0;
var categoryWidth=getComputedStyle(category[categorySelected]).width;
var scrollLeftLength=$(".category").eq(0).find(".item").eq(1).position().left;
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
var styleCategory=window.getComputedStyle(category[0]);  
var hauteurCategory=category[0].offsetHeight+parseInt(styleCategory.marginTop)+parseInt(styleCategory.marginBottom);
// console.log("height tot cat = "+hauteurCategory);
var scrollHautLength=hauteurCategoryTitle-parseInt(styleCategoryTitle.marginTop)+hauteurCategory;
// console.log("height tot = "+scrollHautLength);
// console.log(hauteurMainTitle+(hauteurCategoryTitle-10)/2+hauteurCategory);
var scrollMaxHaut=main.scrollHeight-main.clientHeight;
var scrollHaut=0;


onkeydown = function(evt){
    document.getElementById("title").innerHTML="evt.key = "+evt.key+"; evt.keyCode = "+evt.keyCode;
    switch(evt.keyCode){
        case 37: // left
            if(itemSelected-1>=0 && toggleSetting==false){
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
            if(categorySelected==0){
                itemInCategory[itemSelected].style.border=" 5px solid rgb(174,90,33)";
                document.getElementById("itemSetting").style.border=" 5px solid white";
                toggleSetting=true;
                categorySelected=-1;
                console.log("settings");
            }
            if (categorySelected-1>=0){
                itemInCategory[itemSelected].style.border=" 5px solid rgb(174,90,33)";
                categorySelected--;
                itemInCategory=category[categorySelected].getElementsByClassName("item");
                nbItemInCategory=itemInCategory.length;
                itemSelected=0;
                itemInCategory[itemSelected].style.border=" 5px solid white";
                category[categorySelected].scrollLeft=0;
                scrollAt=0;
                scrollMaxGauche=category[categorySelected].scrollWidth-category[categorySelected].clientWidth;
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
            if(itemSelected+1<nbItemInCategory && toggleSetting==false){
                itemInCategory[itemSelected].style.border=" 5px solid rgb(174,90,33)";
                itemSelected++;
                itemInCategory[itemSelected].style.border=" 5px solid white";
                scrollAt+=scrollLeftLength;             
                $(".category").eq(categorySelected).animate({'scrollLeft':scrollAt},100);
            }
            break;
        case 40: // down
            if(toggleSetting==true){
                document.getElementById("itemSetting").style.border=" 5px solid rgb(174,90,33)";
                toggleSetting=false;
            }
            if (categorySelected+1<nbCategoryTotal){
                itemInCategory[itemSelected].style.border=" 5px solid rgb(174,90,33)";
                categorySelected++;
                itemInCategory=category[categorySelected].getElementsByClassName("item");
                nbItemInCategory=itemInCategory.length;
                itemSelected=0;
                itemInCategory[itemSelected].style.border=" 5px solid white";
                category[categorySelected].scrollLeft=0;
                scrollAt=0;
                scrollMaxGauche=category[categorySelected].scrollWidth-category[categorySelected].clientWidth; 
                if (categorySelected==1){
                    scrollHaut=hauteurMainTitle+(hauteurCategoryTitle-parseInt(styleCategoryTitle.marginTop))/2+hauteurCategory;
                    $("main").animate({'scrollTop':scrollHaut},100);
                }
                else if (categorySelected>=1){
                    scrollHaut+=scrollHautLength;
                    $("main").animate({'scrollTop':scrollHaut},100);
                }
            }
            
            break;
        case 13: // ok
            break;
        case 8: // retour (461=> tv // 8=>ordi)
            break;
    };
    // console.log("category = "+categorySelected+"; item ="+itemSelected+"; toggle ="+toggleSetting);
    // console.log("scrollAt="+scrollAt+"; scrollMaxGauche="+scrollMaxGauche);
    // console.log("scrollHaut="+scrollHaut+"; scrollMaxHaut="+scrollMaxHaut);
    // console.log(item);
    // console.log(document.activeElement);
}    