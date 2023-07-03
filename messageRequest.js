 var messageList = []; // Initialize an empty array

function getMesg() {
    // Example usage:
    getMessages(infos)
        .then(function (data) {
            console.log('Retrieved messages:', data);
            // Process the messages further as needed

            // This date should be updated with each check
            const date = infos.userInfos.checkInDate;
            var filteredMessages = getMessagesByOwnerRecipientAndDate(data, infos.hotelId, infos.userId, date);
           

            if (filteredMessages.length > 0) {
                filteredMessages.forEach(message => {

                    var messageObject = {
                        id: message._id,
                        content: message.content,
                        img: message.linked_image
                    };

                    messageList.push(messageObject); // Add each message to the array

                    console.log(message.content);
                });

                console.log(messageList); // Log the complete messageList array
            } else {
                console.log("No messages found after the specified date.");
            }
        })
        .catch(function (error) {
            console.error('Error retrieving messages:', error);
        });
}



// JavaScript code

var messages = [
    { id: 1, content: 'Hello Monsieur je dois vous dire que etc hfhifh', img: 10 },
    { id: 2, content: 'Bienvenue a l hotel j esperes que votre sejour se passrea bien ', img: 20 },
    { id: 3, content: 'Salut tu vas bien j ecris ce mmessage pour tester le ', img: 15 }
];
let focusedIndexMsg = 0;
let matrixMsg = [];


// Assign containerMsg variable here
var containerMsg = document.getElementById('containerMsg');


function showMessage() {
    containerMsg.style.display = 'flex';
    getMesg();
    renderMessages();
    // Populate the message matrix
    matrixMsg = populateMessageMatrix();

    // Add event listener after defining containerMsg
    containerMsg.addEventListener('keydown', handleArrowKeys);
    // Remove the event listener using the stored event handler function
    document.removeEventListener("keydown", keydownHandler);

    const firstMsgItem = document.getElementById('messages').querySelector('li'); // Get the first list item

    if (firstMsgItem) {
        firstMsgItem.focus(); // Focus on the first list item
    }

    readMsg();


}

function hideMessage() {
    containerMsg.style.display = 'none';

    document.addEventListener('keydown', keydownHandler);

    containerMsg.removeEventListener("keydown", handleArrowKeys);
}

function renderMessages() {
    var messagesElement = document.getElementById('messages');
    var unreadMessagesElement = document.getElementById('unreadmessages');

    messagesElement.innerHTML = ''; // Clear the existing items
    unreadMessagesElement.innerHTML = ''; // Clear the existing unread messages

    messagesList[0].forEach((item, index) => {
        // Create a list item for messages
        const li = document.createElement('li');
        li.tabIndex = index; // Add tabindex to make it focusable

        // Create an image element
        const img = document.createElement('img');
        img.src = './msg.png'; // Replace with the actual path to the image
        img.alt = item.content; // Set the alt text for accessibility
        img.style.height = '20px';
        img.style.width = '20px';

        console.log(item);
        console.log(messageList);


        // Create a span element for the item details
        const span = document.createElement('span');
        span.style.fontSize = '20px';
        span.innerText = item.content;


        // Append the image and span to the list item
        li.appendChild(img);
        li.appendChild(span);

        li.style.width = '90%';
        li.style.height = 'wrap-content';
        li.style.overflow = 'hidden';



        // Append the list item to the messages list
        messagesElement.appendChild(li);

        // Create a list item for unread messages
        const unreadLi = document.createElement('li');
        unreadLi.tabIndex = index; // Add tabindex to make it focusable

        // Create an image element for unread messages
        const unreadImg = document.createElement('img');
        unreadImg.src = './msgunread.png'; // Replace with the actual path to the image
        unreadImg.alt = item.content; // Set the alt text for accessibility
        unreadImg.style.height = '20px';
        unreadImg.style.width = '20px';

        // Create a span element for the item details in unread messages
        const unreadSpan = document.createElement('span');
        unreadSpan.style.fontSize = '20px';
        unreadSpan.innerText = item.content;

        unreadLi.style.width = '90%';
        unreadLi.style.height = 'wrap-content';
        unreadLi.style.overflow = 'hidden';

        // Append the image and span to the list item
        unreadLi.appendChild(unreadImg);
        unreadLi.appendChild(unreadSpan);

        // Append the list item to the unread messages list
        unreadMessagesElement.appendChild(unreadLi);
    });

    // Update the message matrix
    // matrixMsg = populateMessageMatrix();
}


function populateMessageMatrix() {
    const msgItemsElement = document.getElementById('messages');
    const msgItems = msgItemsElement.querySelectorAll('li'); // Get all the list items
    const msgItemsEl = document.getElementById('unreadmessages');
    const msgItemsUnread = msgItemsEl.querySelectorAll('li'); // Get all the list items

    // Create a matrix with the elements
    matrixMsg = [...msgItems, ...msgItemsUnread];
    console.log(matrixMsg); // Add the list items as separate elements

    return matrixMsg;
}

// Function to handle going up to the previous element
function goUpMsg() {
    if (focusedIndexMsg > 0) {
        focusedIndexMsg--;
    } else {
        focusedIndexMsg = matrixMsg.length - 1;
    }
    console.log(matrixMsg);
    console.log(focusedIndexMsg);
    if (matrixMsg[focusedIndexMsg]) {
        matrixMsg[focusedIndexMsg].focus();
        matrixMsg[focusedIndexMsg].querySelector('img').src = 'msg.png';
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
        matrixMsg[focusedIndexMsg].querySelector('img').src = 'msg.png';
        readMsg();
    }
}

// Function to handle arrow key navigation
function handleArrowKeys(event) {
    if (event.keyCode === 38) {
        goUpMsg();
    } else if (event.keyCode === 40) {
        goDownMsg();
    }
    else if (event.keyCode === 8) {
        hideMessage();
    }
}

function readMsg() {
    const MsgContent = document.getElementById('MsgContent');
    var currentMsg = document.activeElement;
    var spanElement = currentMsg.querySelector('span');
    if (spanElement) {
        MsgContent.innerHTML = spanElement.innerText;
    }
}

