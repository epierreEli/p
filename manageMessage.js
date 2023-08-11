var messageList = []; // Initialize an empty array
let focusedIndexMsg = 0;
let matrixMsg = [];



function getMsg() {
    // retreive the messages from the api
    getMessages(infos)
        .then(function (data) {

            let ar = [];


            // This date should be updated with each check
            const date = infos.userInfos.checkInDate;
            var filteredMessages = getMessagesByOwnerRecipientAndDate(data, infos.hotelId, infos.userId, date);


            if (filteredMessages.length > 0) {
                filteredMessages.forEach(message => {

                    var messageObject = {
                        _id: message._id,
                        content: message.content,
                        linked_image: message.linked_image,
                        creationDate: message.creationDate,
                        // state indiquera  si le message est lu ou non :  0 non lu et 1 lu 
                        status: "0"
                    };



                    ar.push(messageObject); // Add each message to the array



                });

                messageList = [...ar]
                console.log(messageList);

                //this array will ben used for comparison after 
                Message_ListforNotifications = messageList;

                renderMessages(); //render the message list
                focusOnFirstElement();
                // Populate the message matrix
                matrixMsg = populateMessageMatrix();



            } else {
                console.log("No messages found after the specified date.");
            }
        })
        .catch(function (error) {
            console.error('Error retrieving messages:', error);
        });
}

function focusOnFirstElement() {

    const firstMsgItem = document.getElementById('messages').querySelector('li'); // Get the first list item

    if (firstMsgItem) {
        firstMsgItem.focus(); // Focus on the first list item
    } else {

        // TO DO S IL LE MESAGGE EST VIDE IL NE FOCUS PAS SUR LE COINTANER DONC ON PEUX PLUS SORTIR
        const msgtitle = document.getElementById("titlespan");
        msgtitle.focus();
    }

    readMsg();

}



// Assign containerMsg variable here
var containerMsg = document.getElementById('containerMsg');

var Message_ListforNotifications = [];

function showMessage() {
    containerMsg.style.display = 'flex';
    getMsg();


    // Remove the event listener using the stored event handler function
    document.removeEventListener("keydown", keydownHandler);


    // Add event listener after defining containerMsg
    document.addEventListener('keydown', handleArrowKeysMsg);

    readMsg();

    // reinitialize the icon of the msg notif icon 
    hideNotifCircle();

    // si la date de check in n est pas la meme on efface les messaget dans la memoire et la date de check de check in 
    if (infos.userInfos.checkInDate !== localStorage.getItem("checkInDate")) {

        // console.log("checkInDate in memory: " +localStorage.getItem("checkInDate"));
        // console.log("checkInDate: " + infos.userInfos.checkInDate);
        localStorage.setItem("checkInDate", "");
        localStorage.setItem("messageList", "");

    }


}

function hideMessage() {
    console.log(MixedMessagessavedNew);
    localStorage.setItem("messageList", JSON.stringify(MixedMessagessavedNew));
    localStorage.setItem("checkInDate", infos.userInfos.checkInDate);
    console.log("message sauvegarder");


    const msgItemsElement = document.getElementById('messages');
    msgItemsElement.innerHTML = "";

    containerMsg.style.display = 'none';

    document.addEventListener('keydown', keydownHandler);

    document.removeEventListener("keydown", handleArrowKeysMsg);
}


setInterval(MsgNotification, 30000); // 60000 milliseconds = 1 minute

function showNotifCircle(numberOfNewMessages) {
    document.getElementById("circleIN").style.display = "flex";
    document.getElementById("textIn").innerHTML = numberOfNewMessages;

}
function hideNotifCircle() {
    document.getElementById("circleIN").style.display = "none";
}


function MsgNotification() {
    // Assuming `getlastMessages()` is an asynchronous function that returns a Promise
    getlastMessages(infos).then(function (data) {
        // Parse the data received from getlastMessages() into a JavaScript object
        const lastmessages = data;

        // Get the saved message list from the localStorage and parse it
        const mysavedmessageList = JSON.parse(localStorage.getItem("messageList"));

        if (mysavedmessageList && mysavedmessageList.length > 0  /*&& messageList.length > mysavedmessageList.length*/) {

            // on regarde si les deux dernier messages (memoire et reception ) sont differents 
            if (mysavedmessageList[mysavedmessageList.length - 1]._id !== lastmessages[0]._id) {
                //detection d un changement dans les messages 
                // mise a jour de la base de messages (meesageList) et comparaison avec les messages dans la memoire
                getMsg();
                let numberOfSimilarMsg = 0;
                let numberOfNewMessages = 0;

                for (let i = 0; i < messageList.length; i++) {
                    let foundMatch = false;

                    for (let j = 0; j < mysavedmessageList.length; j++) {
                        if (mysavedmessageList[j]._id === messageList[i]._id) {
                            numberOfSimilarMsg++; // Increment if _id matches in both arrays
                            foundMatch = true;
                            break; // No need to continue searching for the same message
                        }
                    }

                    if (!foundMatch) {
                        numberOfNewMessages++; // Increment if no match was found in mysavedmessageList
                    }
                }

                if (numberOfNewMessages > 0) showNotifCircle(numberOfNewMessages);

            }
            else {
                console.log("No new message");
            }


        } else if ((mysavedmessageList.length = 0) && lastmessages.length > 0) {
            getMsg();

            numberOfNewMessages = messageList.length;
            showNotifCircle(numberOfNewMessages);
            // document.getElementById("msgImageNotif").src = "./NEWMSG.png"

        }
        else {
            console.log("No saved messages  no new msg .");
            console.log(messageList);
        }
    }).catch(function (error) {
        console.error("Error retrieving messages:", error);
    });
}



var MixedMessagessavedNew = [];


//  dans la construction du message(Dom) on essaie de concatener le messages dans la memoir et le messages recuperer
function renderMessages() {



    const mysavedmessageList = JSON.parse(localStorage.getItem("messageList"));
    console.log("saved message");
    console.log(mysavedmessageList);

    if (mysavedmessageList && mysavedmessageList.length > 0/* && messageList.length > mysavedmessageList.length*/) {
        MixedMessagessavedNew = [];



        // pour pouvoir gere les messages effacer on va d avbord verifier qu il sont dans la liste de larecption avant de le garder
        for (let k = 0; k < mysavedmessageList.length; k++) {
            
            for (let v = 0; v < messageList.length; v++) {

                if (mysavedmessageList[k]._id === messageList[v]._id) {
                
                    MixedMessagessavedNew.push(mysavedmessageList[k]);
                }
                
            }
        
         
        }
        console.log("gnfnnfidnfinfn");
        console.log(MixedMessagessavedNew);
        
        const length = MixedMessagessavedNew.length 
        for (let i = length; i < messageList.length; i++) {


            MixedMessagessavedNew.push(messageList[i]);
        }
        
        console.log("gnfnnfidnfinfn");
        console.log(MixedMessagessavedNew);


    }
    else if (mysavedmessageList.length == 0) {
        MixedMessagessavedNew = messageList;

    }
    else {
        MixedMessagessavedNew = mysavedmessageList;

    }

    var messagesElement = document.getElementById('messages');

    messagesElement.innerHTML = ''; // Clear the existing items


    MixedMessagessavedNew.forEach((item) => {
        // Create a list item for messages
        const li = document.createElement('li');
        li.tabIndex = 0; // Add tabindex to make it focusable

        // Create an image element
        const img = document.createElement('img');


        // condition apres lecture 
        if (item.status && item.status === "1") img.src = './read.png';
        else if (item.status && item.status === "0") img.src = './unreadmsg.png';

        img.alt = item.content; // Set the alt text for accessibility
        img.style.height = '20px';
        img.style.width = '20px';

        const img2 = document.createElement('img');


        img2.src = logoicon.getAttribute('src');
        img2.alt = item.content; // Set the alt text for accessibility
        img2.style.height = '50px';
        img2.style.width = '50px';


        // Create a span element for the item details
        const span = document.createElement('span');
        span.innerText = item.content;
        span.style.fontSize = '20px';

        // condition aprs lecture a ajoute ici 
        if (item.status === "0") span.style.fontWeight = 'bold';

        //sauvegarde de la date pour y acceder apres 
        li.setAttribute('date', item.creationDate);


        if (item.linked_image) li.setAttribute('msgimage', JSON.stringify(item.linked_image));




        li.setAttribute('id', item._id);



        span.style.color = 'white';

        li.style.alignItems = 'center';
        li.style.justifyContent = 'space-between';


        // Append the image and span to the list item
        li.appendChild(img2);
        li.appendChild(span);

        const mydiv = document.createElement('div');
        const date = document.createElement('span');
        date.className = 'date';
        date.innerHTML = item.creationDate.split('T')[1].slice(0, 5);;
        date.style.fontSize = '10px';
        mydiv.appendChild(date);
        mydiv.appendChild(img);

        mydiv.style.alignItems = 'right';

        li.appendChild(mydiv);

        li.style.width = '100%';
        li.style.height = '90px';
        li.style.overflow = 'hidden';



        // Append the list item to the messages list
        messagesElement.appendChild(li);



    });

}


function populateMessageMatrix() {
    const msgItemsElement = document.getElementById('messages');
    const msgItems = msgItemsElement.querySelectorAll('li'); // Get all the list items


    // Create a matrix with the elements
    matrixMsg = Array.from(msgItems);
    // Add the list items as separate elements

    return matrixMsg;
}

// Function to handle going up to the previous element
function goUpMsg() {
    if (focusedIndexMsg > 0) {
        focusedIndexMsg--;
    } else {
        focusedIndexMsg = matrixMsg.length - 1;
    }


    if (matrixMsg[focusedIndexMsg]) {
        matrixMsg[focusedIndexMsg].focus();
        readMsg();
    }
}

// Function to handle going down to the next element
function goDownMsg() {
    if (focusedIndexMsg < matrixMsg.length - 1) {
        focusedIndexMsg++;
    } else {
        focusedIndexMsg = 0;
    }


    if (matrixMsg[focusedIndexMsg]) {
        matrixMsg[focusedIndexMsg].focus();

        readMsg();
    }
}

// Function to handle arrow key navigation
function handleArrowKeysMsg(event) {
    if (event.keyCode === 38) {
        goUpMsg();
    } else if (event.keyCode === 40) {
        goDownMsg();
    }
    else if (event.keyCode === 461 || event.keyCode === 8) {
        hideMessage();
    }
}
var imageUrls = [];
/*
function createBubbleForImage(imageUrls) {
    const MsgTextContainer = document.getElementById("textMsgContainer");
    // If it doesn't exist, create a new bubble container
   let bubbleContainerImg=MsgTextContainer.querySelector(".bubImgContainer");
    
    if (bubbleContainerImg) {
        
        for (let i = 0; i < imageUrls.length; i++) {

            const image = document.createElement('img');
            image.src = imageUrls[i];
            image.style.height = '100px';
            image.style.width = '100px';


            bubbleContainerImg.appendChild(image);

        }

    } else {

        const bubbleContainerImg = document.createElement('div');
        bubbleContainerImg.className = 'bubbleContainerImg';
        bubbleContainerImg.style.position = 'relative';
        bubbleContainerImg.style.left = '20px';
        bubbleContainerImg.style.top = '50px';
        bubbleContainerImg.style.display = 'inline-block';
        bubbleContainerImg.style.margin = '5px';
        // Create a paragraph to display the message content

        for (let i = 0; i < imageUrls.length; i++) {

            const image = document.createElement('img');
            image.src = imageUrls[i];
            image.style.height = '100px';
            image.style.width = '100px';


            bubbleContainerImg.appendChild(image);

        }

    }



    //  bubbleContainer.style.width = `${messageWidth + 20}px`; // Add some padding to the width
    //     bubbleContainer.style.height = `${messageHeight + 20}px`; // Add some padding to the height
    //     bubbleContainer.style.borderRadius = '15px'; // Add rounded border

    // // Style the bubble with other CSS properties as needed
    bubbleContainerImg.style.backgroundColor = '#f5f5f5';
    // bubbleContainer.style.padding = '10px';


    MsgTextContainer.appendChild(bubbleContainerImg);


}*/


function readMsg() {
    const MsgTextContainer = document.getElementById("textMsgContainer");
    const MsgDate = document.getElementById('dateMsg');

    var currentMsg = document.activeElement;
    var spanElement = currentMsg.querySelector('span');


    //    mise a jour du tabbleau en mettant que le message st lu ou non 
    for (var j = 0; j < MixedMessagessavedNew.length; j++) {

        if (currentMsg.getAttribute('id') === MixedMessagessavedNew[j]._id) {
            MixedMessagessavedNew[j].status = "1";

        }

    }


    if (currentMsg.getAttribute('msgimage')) {

        //onn vide le tableau d image avant de le reremplir 
        imageUrls = [];
        const msgImageString = currentMsg.getAttribute('msgimage');
        const imageObj = JSON.parse(msgImageString);

        for (let i = 0; i < imageObj.length; i++) {
            var url = `http://hospitality.ansetech.com/host/files/images/${imageObj[i]}`
            imageUrls.push(url);
        }
    }





    if (spanElement) {
        // efffet visuel de text lu 
        spanElement.style.fontWeight = "normal";
        currentMsg.querySelectorAll('img')[1].src = "./read.png";

        const messageText = spanElement.innerText;
        const messageWidth = spanElement.offsetWidth;
        const messageHeight = spanElement.offsetHeight;
        

        // Check if the bubble container already exists
        const bubbleContainer = MsgTextContainer.querySelector('.bubbleContainer');
        if (bubbleContainer) {
            // If it exists, update the message content inside the existing bubble container
            const messagePara = bubbleContainer.querySelector('p');
            messagePara.innerText = messageText;


        } else {
            // If it doesn't exist, create a new bubble container
            const bubbleContainer = document.createElement('div');
            bubbleContainer.className = 'bubbleContainer';
            bubbleContainer.style.position = 'relative';
            bubbleContainer.style.left = '20px';
            bubbleContainer.style.top = '50px';
            bubbleContainer.style.display = 'inline-block';

            // bubbleContainer.style.wordWrap= "break-word";
            // Create a paragraph to display the message content
            const messagePara = document.createElement('p');
            messagePara.innerText = messageText; // Use the stored message text

            bubbleContainer.style.borderRadius = '15px'; // Add rounded border

            // Style the bubble with other CSS properties as needed
            bubbleContainer.style.backgroundColor = '#f5f5f5';
            bubbleContainer.style.padding = '10px';


            bubbleContainer.appendChild(messagePara);

            // Replace the previous content with the bubble container
            MsgTextContainer.innerHTML = ''; // Clear the container
            // MsgTextContainer.appendChild(MsgDate);
            MsgTextContainer.appendChild(bubbleContainer);
        }


        // createBubbleForImage(imageUrls);

        // Update other message details if needed
        MsgDate.innerHTML = currentMsg.getAttribute('date').replace("T", " ").slice(0, 16);
        MsgDate.style.position = 'relative';
        MsgDate.style.left = '50px';
    }
}
