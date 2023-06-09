// recupere la temperature et l image associe 
export async function getWeather (cityTag) {
  console.log("citytag = " + cityTag + "; getWeather");

  return new Promise((resolve, reject) => {
    var url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityTag +
      ",fr&appid=c21a75b667d6f7abb81f118dcf8d4611&units=metric";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          var dataTemp = data.main.temp.toFixed(1);
          const iconUrl =
            "https://openweathermap.org/img/wn/" +
            data.weather[0].icon +
            "@2x.png";

          console.log(dataTemp, iconUrl);

          resolve([iconUrl, dataTemp]);
        } else {
          reject(new Error("Error: " + xhr.status));
        }
        console.log("update weather finished");
      }
    };
    xhr.send();
    console.log("getWeather finished");
  });
}


  function updateTime() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var largeurClient;
  
    if (updateDate) {
      dateLocal.innerHTML = date.toLocaleDateString('fr-FR', options);
      updateDate = false;
      largeurClient = document.getElementById("info").offsetWidth;
      document.getElementById("location").style.width = largeurClient + "px";
    } else {
      if (hours == 23 && minutes == 59 && seconds == 59) {
        updateDate = true;
      }
    }
  
    if (updateHeure) {
      time.innerHTML =
        ((hours < 10) ? "0" : "") + hours +
        ((minutes < 10) ? ":0" : ":") + minutes +
        ((seconds < 10) ? ":0" : ":") + seconds;
    } else {
      if (seconds == 59) {
        updateHeure = true;
      }
    }
  
    if (updateMeteo) {
      getWeather();
      updateMeteo = false;
    } else {
      if (seconds == 59) {
        updateMeteo = true;
      }
    }
  }

  
  function updateBG(categorySelected, itemSelected) {
    var url = infos.pages[categorySelected].contents[itemSelected].image;
    var bgUrl = `https://hospitality.ansetech.com/host/files/images/pages/${url}`;
    console.log(bgUrl);
    document.body.style.backgroundImage = "url(" + bgUrl + ")";
  }
  function afficheImageFS() {
    var path = infos.pages[categorySelected - 1].contents[itemSelected];
    console.log(path.image);
    var newDiv = document.createElement('div');
    newDiv.className = "imgFullScreen";
    newDiv.style.backgroundImage = "url(" + `https://hospitality.ansetech.com/host/files/images/pages/${path.image}` + ")";
    main.appendChild(newDiv);
    imageFS = true;
  }
  
  function afficheVideoFS() {
    var newDiv = document.createElement('div');
    newDiv.className = "imgFullScreen";
    var newVideo = document.createElement("video");
    newVideo.setAttribute("id", "video2");
    newVideo.setAttribute("src", "./assets/img/210530_clip_radio-star_12s.mp4");
    newVideo.autoplay = true;
    newVideo.loop = true;
    newDiv.appendChild(newVideo);
    main.appendChild(newDiv);
    itemDetails = true;
    videoFS = true;
  }
    
  async function logIn(email, password) {
    try {
      const response = await fetch("https://hospitality.ansetech.com/api/auth/local", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  async function getUser(userId) {
    try {
      const response = await fetch(`https://hospitality.ansetech.com:7443/api/users/${userId}`, {
        headers: { Authorization: "Bearer " + infos.token },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      const data = await response.json();
      return data.user[0];
    } catch (error) {
      throw error;
    }
  }
  
  async function getHotel(hotelId) {
    try {
      const response = await fetch(`https://hospitality.ansetech.com:7443/api/hotels/${hotelId}`, {
        headers: { Authorization: "Bearer " + infos.token },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch hotel");
      }
      const data = await response.json();
      return data.hotel[0];
    } catch (error) {
      throw error;
    }
  }
  
  async function getPages(hotelId) {
    try {
      const response = await fetch(`https://hospitality.ansetech.com:7443/api/pages/fr/${hotelId}`, {
        headers: { Authorization: "Bearer " + infos.token },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch pages");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  function afficheCategory(pages) {
    for (let i = 0; i < pages.length; i++) {
      const cat = pages[i];
      const categoryItem = cat.contents;
      var newH3 = document.createElement('h3');
      var newSection = document.createElement('section');
      newH3.innerHTML = cat.title;
      newSection.className = "category";
      document.getElementsByClassName("container")[0].appendChild(newH3);
      document.getElementsByClassName("container")[0].appendChild(newSection);
      for (let j = 0; j < categoryItem.length; j++) {
        var newSpan = document.createElement('span');
        var newDiv = document.createElement('div');
        var url = `https://hospitality.ansetech.com/host/files/images/pages/${categoryItem[j].image}`;
        newSpan.innerHTML = categoryItem[j].title;
        newDiv.appendChild(newSpan);
        newDiv.className = "item";
        newDiv.style.backgroundImage = "url(" + url + ")";
        document.getElementsByClassName("category")[i + 1].appendChild(newDiv);
      }
    }
    navInit();
  }
  
  let infos = {};
  
  (async () => {
    try {
      const loginData = await logIn("chambre1@snow-chill2.com", "abcd1234");
      infos.token = loginData.token;
      infos.userId = loginData.userId;
      infos.hotelId = loginData.owner;
  
      const [user, hotel] = await Promise.all([
        getUser(infos.userId),
        getHotel(infos.hotelId)
      ]);
  
      infos.userInfos = user;
      infos.hotelInfos = hotel;
      client.innerHTML = infos.userInfos.clientName;
      city.innerHTML = infos.hotelInfos.city;
      nameHotel.innerHTML = infos.hotelInfos.name;
      getWeather();
      logo.setAttribute('src', `https://hospitality.ansetech.com/host/${infos.hotelInfos.picturePath}`);
  
      const pages = await getPages(infos.hotelId);
      infos.pages = pages;
      const url = `https://hospitality.ansetech.com/host/files/images/pages/${pages[0].contents[0].image}`;
      body.style.backgroundImage = "url(" + url + ")";
      afficheCategory(infos.pages);
  
      console.log(infos);
    } catch (error) {
      console.error(error);
    }
  })();
  