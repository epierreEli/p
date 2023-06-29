function getMessages(infos) {
    return new Promise(function (resolve, reject) {
        var apiUrl = 'https://hospitality.ansetech.com:7443/api/messagesweb/all_www'
        // all?=2020-06-29T11:20:42:335Z&version=5.621&macaddress=44:d8:78:27:2a:be ';

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

function getlastMessages(infos) {
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



function getMessageByOwnerRecipientAndDate(messages, owner, recipient, date) {
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (
        message.owner === owner &&
        message.recipient.includes(recipient) &&
        new Date(message.creationDate) >= new Date(date)
      ) {
        return message;
      }
    }
    return null; // Message not found
  }
  