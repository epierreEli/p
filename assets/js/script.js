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
    cityTag=city.innerText;
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
// getWeather();

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
var main = document.getElementsByTagName("main")[0];
var mainTitle=document.getElementById("mainTitle");
var category;
var nbCategoryTotal;
var itemInCategory;
var nbItemInCategory;
var categorySelected=0;
var itemSelected=0;
var categoryWidth;
var scrollLeftLength;
var scrollMaxGauche;
var scrollAt=0;
var styleMainTitle;
var hauteurMainTitle;
var categoryTitle;
var styleCategoryTitle;
var hauteurCategoryTitle;
var styleCategory;
var hauteurCategory;
var scrollHautLength;
var scrollMaxHaut;
var scrollHaut=0;
var bgUrl;
var itemDetails=false;
var imageFS=false;
var videoFS=false;

function navInit(){
    body.focus();
    category=document.getElementsByClassName("category");
    nbCategoryTotal=category.length;
    itemInCategory=category[0].getElementsByClassName("item");
    nbItemInCategory=itemInCategory.length;
    
    // $("#itemSetting").css("-webkit-filter","brightness(100%)");
    // $("#itemSetting").find(".item").eq(0).css("border","5px solid white")
    $(".category").eq(0).css("-webkit-filter","brightness(100%)");
    itemInCategory[0].style.border=" 5px solid white";
    // category[0].style.filter="brightness()";
    // category[0].classList.add("categorySelected");

    // console.log("category = "+categorySelected+"; item ="+itemSelected+"; toggle ="+toggleSetting);

    main.scrollTop=0;
    category[0].scrollLeft=0;
    categoryWidth=getComputedStyle(category[0]).width;
    scrollLeftLength=$(".category").eq(1).find(".item").eq(1).position().left;
    scrollMaxGauche=category[0].scrollWidth-category[0].clientWidth; 
    // console.log("width = "+categoryWidth);
    // console.log("Scroll Max = "+scrollMaxGauche);
    // console.log("scroll = "+scrollLeftLength);
    // console.log("scrollAt = "+scrollAt);
    // console.log("main.scrollHeight = "+main.scrollHeight+"; main.clientHeight = "+main.clientHeight);
    
    styleMainTitle=window.getComputedStyle(mainTitle);
    hauteurMainTitle=mainTitle.offsetHeight+parseInt(styleMainTitle.marginTop)+parseInt(styleMainTitle.marginBottom);
    // console.log("height tot title = "+hauteurMainTitle);
    categoryTitle=document.getElementsByTagName("h3")[0];
    styleCategoryTitle=window.getComputedStyle(categoryTitle);  
    hauteurCategoryTitle=categoryTitle.offsetHeight+parseInt(styleCategoryTitle.marginTop)+parseInt(styleCategoryTitle.marginBottom);
    // console.log(categoryTitle.offsetHeight/2)
    // console.log("height tot h2 = "+hauteurCategoryTitle);
    styleCategory=window.getComputedStyle(category[1]);  
    hauteurCategory=category[1].offsetHeight+parseInt(styleCategory.marginTop)+parseInt(styleCategory.marginBottom);
    // console.log("height tot cat = "+hauteurCategory);
    scrollHautLength=hauteurCategoryTitle-parseInt(styleCategoryTitle.marginTop)+hauteurCategory;
    // console.log("height tot = "+scrollHautLength);
    // console.log(hauteurMainTitle+(hauteurCategoryTitle-10)/2+hauteurCategory);
    scrollMaxHaut=main.scrollHeight-main.clientHeight;

    // console.log("active element");
    // console.log(document.activeElement);
}



onkeydown = function(evt){
    // document.getElementById("title").innerHTML="evt.key = "+evt.key+"; evt.keyCode = "+evt.keyCode;
    if (!itemDetails){
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
                if (categorySelected>=1){
                    updateBG(categorySelected-1,itemSelected );
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
                        console.log("changement bgimage0 cat0");
                        bgUrl =`https://hospitality.ansetech.com/host/files/images/pages/${infos.pages[0].contents[0].image}`
                        body.style.backgroundImage= "url("+bgUrl+")";
                    }
                    else {
                        scrollHaut-=scrollHautLength;
                        $("main").animate({'scrollTop':scrollHaut},100);
                        updateBG(categorySelected-1,itemSelected );
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
                if (categorySelected>=1){
                    updateBG(categorySelected-1,itemSelected );
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
                        updateBG(categorySelected-1,itemSelected );
                    }
                }
                break;
            case 13: // ok
                if (categorySelected==0 && itemSelected==3){
                    console.log("Netflix");
                    // categoryTitle.innerHTML="Netflix";
                    goToURL("www.netflix.com/fr");
                }
                if (categorySelected==0 && itemSelected==4){
                    console.log("video");
                    afficheVideoFS();
                }
                if (categorySelected>=1){
                    console.log("affichage item");
                    afficheItem(categorySelected, itemSelected);
                }
                break;
            case 461: // retour (461=> tv // 8=>ordi)
                window.location.reload();
                break;
        };
    }
    else{
        switch(evt.keyCode){
            case 13:
                console.log("img FS");
                afficheImageFS();
                break;
            case 8:
                if (imageFS){
                    document.getElementsByClassName("imgFullScreen")[0].remove();
                    imageFS=false;
                }
                else if (videoFS){
                    document.getElementsByClassName("imgFullScreen")[0].remove();
                    videoFS=false;
                    itemDetails=false;
                } 
                else{
                    document.getElementsByClassName("itemSelected")[0].remove();
                    itemDetails=false;
                }
                break;
            case 461:
                if (imageFS){
                    document.getElementsByClassName("imgFullScreen")[0].remove();
                    imageFS=false;
                }
                else if (videoFS){
                    document.getElementsByClassName("imgFullScreen")[0].remove();
                    videoFS=false;
                    itemDetails=false;
                } 
                else {
                    document.getElementsByClassName("itemSelected")[0].remove();
                    itemDetails=false;
                }
                break;
        }
    }
    
    console.log("category = "+categorySelected+"; item ="+itemSelected);
    console.log("itemDetails = "+itemDetails);
    // console.log("scrollAt="+scrollAt+"; scrollMaxGauche="+scrollMaxGauche);
    // console.log("scrollHaut="+scrollHaut+"; scrollMaxHaut="+scrollMaxHaut);
    // console.log(item);
    // console.log(document.activeElement);
}

var test=document.getElementsByClassName("category")[0].getElementsByClassName("item")[4].getElementsByTagName("video")[0];
// test.setAttribute("src","./assets/img/210530_clip_radio-star_12s.mp4");
// test.setAttribute("autoplay","true");


function updateBG(categorySelected,itemSelected){
    var url = infos.pages[categorySelected].contents[itemSelected].image
    bgUrl =`https://hospitality.ansetech.com/host/files/images/pages/${url}`;
    console.log(bgUrl);
    document.body.style.backgroundImage = "url("+bgUrl+")";
}

function  afficheItem(categorySelected,itemSelected){
    var path=infos.pages[categorySelected-1].contents[itemSelected];
    var newSection=document.createElement('section');
    newSection.className="itemSelected";
    var newDiv=document.createElement('div');
    newDiv.className="itemSelectedImage";
    var newArticle=document.createElement('article');
    newArticle.className="itemSelectedText";

    var newImg=document.createElement('img');
    newImg.setAttribute('src',`https://hospitality.ansetech.com/host/files/images/pages/${path.image}`);
    var newInput=document.createElement('input');
    newInput.type="button";
    newInput.value="Agrandir";
    newDiv.appendChild(newImg);
    newDiv.appendChild(newInput);
    newSection.appendChild(newDiv);

    var newTitle=document.createElement('div');
    var newH2=document.createElement('h2');
    newH2.innerHTML=path.title;
    newTitle.appendChild(newH2);
    newArticle.appendChild(newTitle);
    var newP=document.createElement('p');
    newP.innerHTML=path.text;
    newArticle.appendChild(newP);
    newSection.appendChild(newArticle);

    main.appendChild(newSection);
    itemDetails=true;
}

function afficheImageFS(){
    var path=infos.pages[categorySelected-1].contents[itemSelected];
    console.log(path.image);
    var newDiv=document.createElement('div');
    newDiv.className="imgFullScreen";
    newDiv.style.backgroundImage="url("+`https://hospitality.ansetech.com/host/files/images/pages/${path.image}`+")";
    main.appendChild(newDiv);
    imageFS=true;
}

function afficheVideoFS(){
    var newDiv=document.createElement('div');
    newDiv.className="imgFullScreen";
    var newVideo=document.createElement("video");
    newVideo.setAttribute("id", "video2");
    newVideo.setAttribute("src","./assets/img/210530_clip_radio-star_12s.mp4");
    newVideo.setAttribute("controls autoplay","");
    newDiv.appendChild(newVideo);
    main.appendChild(newDiv);
    itemDetails=true;
    videoFS=true;
}

function goToURL(url){
    // open in new tab
    //window.open('https://'+url, '_blank').focus();
    window.location.href = 'http://'+url;
}

function logIn(email, password) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "https://hospitality.ansetech.com/api/auth/local",
            type: "POST",
            data: {
                email: email,
                password: password,
            },
            beforeSend: () => { },
            success: (data) => resolve(data),
            error: (err) => reject(err),
        });
    });
}

function getUser(userId) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: `https://hospitality.ansetech.com:7443/api/users/${userId}`,
            type: "GET",
            headers: { Authorization: "Bearer " + infos.token },
            success: (data) => resolve(data.user[0]),
            error: (err) => reject(err),
        });
    });
}

function getHotel(hotelId) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: `https://hospitality.ansetech.com:7443/api/hotels/${hotelId}`,
            type: "GET",
            headers: { Authorization: "Bearer " + infos.token },
            success: (data) => resolve(data.hotel[0]),
            error: (err) => reject(err),
        });
    });
}

function getPages(hotelId) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: `https://hospitality.ansetech.com:7443/api/pages/fr/${hotelId}`,
            type: "GET",
            headers: { Authorization: "Bearer " + infos.token },
            success: (data) => resolve(data),
            error: (err) => reject(err),
        });
    });
}

function afficheCategory(pages){
    for (let i = 0; i < pages.length; i++) {
        const cat=pages[i];
        const categoryItem=cat.contents;
        var newH3=document.createElement('h3');
        var newSection=document.createElement('section');
        newH3.innerHTML=cat.title;
        newSection.className="category";
        document.getElementsByClassName("container")[0].appendChild(newH3);
        document.getElementsByClassName("container")[0].appendChild(newSection);
        for (let j = 0; j < categoryItem.length; j++) {
            var newSpan=document.createElement('span');
            var newDiv=document.createElement('div');
            var url=`https://hospitality.ansetech.com/host/files/images/pages/${categoryItem[j].image}`;
            newSpan.innerHTML=categoryItem[j].title;
            newDiv.appendChild(newSpan);
            newDiv.className="item";
            newDiv.style.backgroundImage = "url("+url+")";
            document.getElementsByClassName("category")[i+1].appendChild(newDiv);         
        }
    }
    navInit();
}

let infos={};
var logo=document.getElementById("logo");
logIn("chambre1@snow-chill2.com","abcd1234").then((data)=>{
    infos['token']=data.token;
    infos["userId"]=data.userId;
    infos["hotelId"]=data.owner;
    Promise.all([getUser(infos.userId),
                getHotel(infos.hotelId)]
    ).then((res)=>{
        infos["userInfos"]=res[0];
        infos["hotelInfos"]=res[1];
        client.innerHTML=infos.userInfos.clientName;
        city.innerHTML=infos.hotelInfos.city;
        nameHotel.innerHTML=infos.hotelInfos.name;
        getWeather();
        logo.setAttribute('src',`https://hospitality.ansetech.com/host/${infos.hotelInfos.picturePath}`);   
        getPages(infos.hotelId).then((pages)=>{
            infos["pages"]=pages;
            const url =`https://hospitality.ansetech.com/host/files/images/pages/${pages[0].contents[0].image}`
            body.style.backgroundImage= "url("+url+")";
            afficheCategory(infos.pages);
        });
        console.log(infos);
    })
})

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



