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
var options={ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//function who update the time 
function updateTime(){ 
    var date = new Date(); 
    var hours = date.getHours(); 
    var minutes = date.getMinutes(); 
    var seconds = date.getSeconds(); 
    var largeurClient;
    time.innerHTML = ((hours < 10) ? "0" : "") + hours + ((minutes < 10) ? ":0" : ":") + minutes + ((seconds < 10) ? ":0" : ":") + seconds; 
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
    
} 
//each second call the function updateTime 
setInterval(updateTime, 1000);



// Nav Spacial du bled  

var category=document.getElementsByClassName("category");
var nbCategoryTotal=category.length;
var categorySelected=0;
var itemInCategory=category[categorySelected].getElementsByClassName("item");
var nbItemInCategory=itemInCategory.length;
var itemSelected=0;
var toggleSetting=false

itemInCategory[itemSelected].style.border=" 5px solid white";
var test=document.getElementsByClassName("container")[0];
console.log(test);
console.log("active element");
console.log(document.activeElement);
// console.log("category = "+categorySelected+"; item ="+itemSelected+"; toggle ="+toggleSetting);


category[0].scrollLeft=0;
var categoryWidth=getComputedStyle(category[categorySelected]).width;
var scrollLenght=$(".category").eq(0).find(".item").eq(1).position().left;
// var scrollLenght=parseInt($('.item').eq(1).css("width"))+parseInt($('.item').eq(1).css("margin-right"));
var scrollMax=category[0].scrollWidth-category[0].clientWidth;
var scrollAt=0;
console.log("width = "+categoryWidth);
console.log("Scroll Max = "+scrollMax);
console.log("scroll = "+scrollLenght);
console.log("scrollAt = "+scrollAt);

var body = document.getElementsByTagName("body");
console.log(body[0]);
console.log("height body.scrollHeight = "+body[0].scrollHeight+"; doby.clientHeight = "+body[0].clientHeight);
var headerHeight=document.getElementById("header").offsetHeight;
console.log("headerHeight = "+headerHeight);
// $('main').css("top",headerHeight);


onkeydown = function(evt){
    document.getElementById("title").innerHTML="evt.key = "+evt.key+"; evt.keyCode = "+evt.keyCode;
    switch(evt.keyCode){
        case 37: // left
            if(itemSelected-1>=0 && toggleSetting==false){
                itemInCategory[itemSelected].style.border=" 5px solid rgb(174,90,33)";
                itemSelected--;
                itemInCategory[itemSelected].style.border=" 5px solid white";
                scrollAt-=scrollLenght;
                if (scrollAt<scrollMax){
                    $(".category").eq(categorySelected).animate({'scrollLeft':scrollAt},100);
                }
                else{
                    $(".category").eq(categorySelected).animate({'scrollLeft':scrollMax},100);
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
                scrollMax=category[categorySelected].scrollWidth-category[categorySelected].clientWidth;
            }
            break;
        case 39: // right
            if(itemSelected+1<nbItemInCategory && toggleSetting==false){
                itemInCategory[itemSelected].style.border=" 5px solid rgb(174,90,33)";
                itemSelected++;
                itemInCategory[itemSelected].style.border=" 5px solid white";
                scrollAt+=scrollLenght;             
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
                    scrollMax=category[categorySelected].scrollWidth-category[categorySelected].clientWidth;
                    $(".container").animate({'scrollTop':200},100);
            }
            break;
        case 13:
            break;
        case 8:
            break;
    };
    // console.log("category = "+categorySelected+"; item ="+itemSelected+"; toggle ="+toggleSetting);
    // console.log("scrollAt="+scrollAt+"; scrollMax="+scrollMax);
    // console.log(item);
    // console.log(document.activeElement);
}    