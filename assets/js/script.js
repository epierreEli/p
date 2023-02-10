console.log("reload");

// var start=document.getElementById("homepage");
// setTimeout(() => {
//     start.style.display="none";
//   }, 3000)


var clientTag= "Mr MAC Adam";
var cityTag="Toulon";
var client=document.getElementById("client");
var city=document.getElementById("city");
client.innerHTML=clientTag;
city.innerHTML=cityTag;

// Météo

var temp=document.getElementById("weather");
var iconWeather=document.getElementById("iconWeather");
var icon=["http://openweathermap.org/img/wn/01d@2x.png",
          "http://openweathermap.org/img/wn/02d@2x.png",
          "http://openweathermap.org/img/wn/03d@2x.png",
          "http://openweathermap.org/img/wn/04d@2x.png",
          "http://openweathermap.org/img/wn/09d@2x.png",
          "http://openweathermap.org/img/wn/10d@2x.png",
          "http://openweathermap.org/img/wn/11d@2x.png",
          "http://openweathermap.org/img/wn/13d@2x.png",
          "http://openweathermap.org/img/wn/50d@2x.png"
        ]
function getWeather() {
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+cityTag+",fr&appid=c21a75b667d6f7abb81f118dcf8d4611&units=metric"

    $.get(url, callBackGetSuccess).done(function() {
        console.log( "second success" );
      })
      .fail(function() {
        console.log( "error" );
      })
      .always(function() {
        console.log( "finished" );
      });
}
var callBackGetSuccess = function(data) {
    var dataTemp=data.main.temp.toFixed(1);
    temp.innerHTML =dataTemp+" °C";
    console.log("weather : "+data.weather[0].main);
    iconWeather.setAttribute("src","http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png");
}
getWeather();


// Heure + Date

var time = document.getElementById("time");
var dateLocal=document.getElementById("date");
var options={ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//function who update the time 
function updateTime(){ 
    var date = new Date(); 
    var hours = date.getHours(); 
    var minutes = date.getMinutes(); 
    var seconds = date.getSeconds(); 
    time.innerHTML = ((hours < 10) ? "0" : "") + hours + ((minutes < 10) ? ":0" : ":") + minutes + ((seconds < 10) ? ":0" : ":") + seconds; 
    dateLocal.innerHTML=date.toLocaleDateString('fr-FR',options);
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
var categoryWidth=getComputedStyle(category[categorySelected]).width;
var scrollLenght=$(".category").eq(0).find(".item").eq(1).position().left.toFixed(0);
var scrollMax=category[0].scrollLeftMax;
var scrollAt=0;

category[0].focus();
console.log(document.activeElement);
console.log("width = "+categoryWidth);
console.log("Scroll Max = "+category[categorySelected].scrollLeftMax);
console.log("scroll = "+scrollLenght);
category[categorySelected].scrollLeft=0;
itemInCategory[itemSelected].style.border=" 5px solid white";
// console.log("category = "+categorySelected+"; item ="+itemSelected+"; toggle ="+toggleSetting);

onkeydown = function(evt){
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
            }
            break;
        case 38: // up
            if(categorySelected==0){
                itemInCategory[itemSelected].style.border=" 5px solid rgb(174,90,33)";
                document.getElementById("itemSetting").style.border=" 5px solid white";
                document.getElementById("itemSetting").focus();
                toggleSetting=true;
                categorySelected=-1;
            }
            if (categorySelected-1>=0){
                itemInCategory[itemSelected].style.border=" 5px solid rgb(174,90,33)";
                categorySelected--;
                itemInCategory=category[categorySelected].getElementsByClassName("item");
                nbItemInCategory=itemInCategory.length;
                itemSelected=0;
                itemInCategory[itemSelected].style.border=" 5px solid white";
                category[categorySelected].focus();
                category[categorySelected].scrollLeft=0;
                scrollAt=0;
                scrollMax=category[categorySelected].scrollLeftMax;
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
                        category[categorySelected].focus();
                        category[categorySelected].scrollLeft=0;
                        scrollAt=0;
                        scrollMax=category[categorySelected].scrollLeftMax;
                    }   
            break;
        case 13:
            break;
        case 8:
            break;
    };
    // console.log("category = "+categorySelected+"; item ="+itemSelected+"; toggle ="+toggleSetting);
    console.log("scrollAt="+scrollAt+"; scrollMax="+scrollMax);
    // console.log(item);
    // console.log(document.activeElement);
    // if (!toggleSetting){
    //     console.log("Scroll left = "+category[categorySelected].scrollLeft);
    // }
    
}    