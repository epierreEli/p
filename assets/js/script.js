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

var weather=document.getElementById("weather");




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
// var maxwidth=category[categorySelected].scrollLeftMax;
// console.log(maxwidth);
// var test=category[0].getElementsByClassName("item")[0].classList.add("itemSelect");
category[0].focus();
console.log(document.activeElement);
console.log("width = "+categoryWidth);
console.log("scroll = "+category[categorySelected].scrollLeft)
category[categorySelected].scrollLeft=0;
console.log(itemInCategory[0]);
itemInCategory[0].classList.add("itemSelect");
console.log(itemInCategory[0].style);
// itemInCategory[itemSelected].classList.add("itemSelect");
// itemInCategory[itemSelected].style.border=" 5px solid white";
// console.log("category = "+categorySelected+"; item ="+itemSelected+"; toggle ="+toggleSetting);

onkeydown = function(evt){
    switch(evt.keyCode){
        case 37: // left
            if(itemSelected-1>=0 && toggleSetting==false){
                itemInCategory[itemSelected].style.border=" 5px solid rgb(174,90,33)";
                itemSelected--;
                itemInCategory[itemSelected].style.border=" 5px solid white";
                category[categorySelected].scrollLeft-=142;
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
            }
            
            break;
        case 39: // right
            if(itemSelected+1<nbItemInCategory && toggleSetting==false){
                itemInCategory[itemSelected].style.border=" 5px solid rgb(174,90,33)";
                itemSelected++;
                itemInCategory[itemSelected].style.border=" 5px solid white";
                category[categorySelected].scrollLeft+=142;
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
                    }   
            break;
        case 13:
            break;
        case 8:
            break;
    };
    console.log("category = "+categorySelected+"; item ="+itemSelected+"; toggle ="+toggleSetting);
    console.log(document.activeElement);
    console.log("Scroll left = "+category[categorySelected].scrollLeft);
}    