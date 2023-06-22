

// recupere la temperature et l image associe 
function getWeather(cityTag) {
  console.log("citytag = " + cityTag + "; getWeather");

  return new Promise(function(resolve, reject) {
    var url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityTag +
      ",fr&appid=c21a75b667d6f7abb81f118dcf8d4611&units=metric";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          var dataTemp = data.main.temp.toFixed(1);
          const iconUrl =
            "http://openweathermap.org/img/wn/" +
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


function getCurrentDateTime(callback) {
  set();
  setInterval(() => {
    set();
  }, 60000);

  function set() {
    const currentDate = new Date();

    const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    };
    const formattedDate = currentDate.toLocaleDateString('fr-FR', options);

    const formattedTime = currentDate.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });

    callback(formattedDate, formattedTime);
  }
}


function logIn(email, password) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://hospitality.ansetech.com/api/auth/local", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.statusText);
        }
      }
    };
    xhr.onerror = function () {
      reject("Network error");
    };
    var data = JSON.stringify({ email: email, password: password });
    xhr.send(data);
  });
}


function getUser(userId, infos) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `https://hospitality.ansetech.com:7443/api/users/${userId}`);
    xhr.setRequestHeader("Authorization", "Bearer " + infos.token);
    xhr.onload = function () {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        resolve(response.user[0]);
      } else {
        reject(new Error("Request failed with status: " + xhr.status));
      }
    };
    xhr.onerror = function () {
      reject(new Error("Request failed"));
    };
    xhr.send();
  });
}


function getHotel(hotelId, infos) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `https://hospitality.ansetech.com:7443/api/hotels/${hotelId}`);
    xhr.setRequestHeader("Authorization", "Bearer " + infos.token);
    xhr.onload = function () {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        resolve(response.hotel[0]);
      } else {
        reject(new Error("Request failed with status: " + xhr.status));
      }
    };
    xhr.onerror = function () {
      reject(new Error("Request failed"));
    };
    xhr.send();
  });
}

function getPages(hotelId, infos) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    var url = "https://hospitality.ansetech.com:7443/api/pages/fr/" + hotelId;

    xhr.open("GET", url);
    xhr.setRequestHeader("Authorization", "Bearer " + infos.token);
    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));

      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onerror = function () {
      reject("An error occurred during the request.");
    };
    xhr.send();
  });
}



// focntion permmettant de prendre les info recuperer dans la backend et de le mettre sous forme de data struturé
function convertData(inputData) {
  var data = {
    grid: []
  };

  for (var i = 0; i < inputData.length; i++) {
    var category = inputData[i];
    var categoryItem = {
      title: category.title,
      roomService: category.roomService,
      type: "extended",
      children: []
    };
    //test
    //console.log(category);

    for (var j = 0; j < category.contents.length; j++) {
      var content = category.contents[j];
      var childItem = {
        icon: content.image,
        title: content.title
        
      };

      if (content.text) {
        childItem.text = content.text;
      }

      categoryItem.children.push(childItem);
    }

    data.grid.push(categoryItem);
  }

  return data;
}
