
function orderItems(infos) {
    return new Promise(function (resolve, reject) {
        var myURl = "https://hospitality.ansetech.com:7443/api/hotels_www/"+infos.hotelId+"/rooms/"+infos.userId +"/billing";
        
        var cartItemsLocal = 
        cartItems.map(function (item) {
            
            return {
                "product":item.title,
                "qty":1,
                "price":parseInt(item.price),
            }
        });
        //  [{"product":"produit","price":"10","qty":"2"},
        //  {"product":"produit0","price":"5","qty":"1"}];
        var requestBody = "command="+ encodeURIComponent(JSON.stringify(cartItemsLocal));

        var xhr = new XMLHttpRequest();
        xhr.open('POST',myURl,true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + infos.token);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        xhr.onload = function () {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                resolve(response);
            } else {
                reject(new Error('Failed to retrieve messages. Status: ' + xhr.status));
            }
        };

        xhr.onerror = function () {
            reject(new Error('Error niling.'));
        };

        xhr.send(requestBody);
    });
}


// To be tested 
function getBilling(infos) {
    return new Promise(function (resolve, reject) {
        var myURl = "https://hospitality.ansetech.com:7443/api/hotels_www/"+infos.hotelId+"/rooms/"+infos.userId +"/getRoomBillings";
        


        var xhr = new XMLHttpRequest();
        xhr.open('GET',myURl,true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + infos.token);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        xhr.onload = function () {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                resolve(response);
            } else {
                reject(new Error('Failed to retrieve messages. Status: ' + xhr.status));
            }
        };

        xhr.onerror = function () {
            reject(new Error('Error niling.'));
        };

        xhr.send();
    });
}

