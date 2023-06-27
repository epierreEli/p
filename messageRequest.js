function getMessagesNoId(infos) {
    return new Promise(function (resolve, reject) {
        var apiUrl = 'https://hospitality.ansetech.com:7443/api/messagesweb/last';

        var xhr = new XMLHttpRequest();
        xhr.open('GET', apiUrl);
        xhr.setRequestHeader('Authorization', 'Bearer ' + infos.token);

        xhr.onload = function () {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                resolve(response);
            } else {
                reject(new Error('Failed to retrieve messages. Status: ' + xhr.status));
            }
        };

        xhr.onerror = function () {
            reject(new Error('Error retrieving messages.'));
        };

        xhr.send();
    });
}

