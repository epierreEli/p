var messageList = []; // Initialize an empty array
let focusedIndexMsg = 0;
let matrixMsg = [];

function getMesg() {
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
                        id: message._id,
                        content: message.content,
                        img: message.linked_image,
                        date: message.creationDate
                    };

                    ar.push(message); // Add each message to the array
                    console.log("each message");
                    console.log(message.creationDate);

                });

                messageList = [...ar]

                console.log(messageList);
                renderMessages(); //render the message list
                focusOnFirstElement();
                // Populate the message matrix
                matrixMsg = populateMessageMatrix();

                console.log("================================");
                console.log(matrixMsg);

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
        containerMsg.tabIndex = 0;
        containerMsg.focus();
    }

    readMsg();

}


// Assign containerMsg variable here
var containerMsg = document.getElementById('containerMsg');


function showMessage() {
    containerMsg.style.display = 'flex';
    getMesg();


    // Remove the event listener using the stored event handler function
    document.removeEventListener("keydown", keydownHandler);


    // Add event listener after defining containerMsg
    containerMsg.addEventListener('keydown', handleArrowKeysMsg);

    readMsg();


}

function hideMessage() {

    const msgItemsElement = document.getElementById('messages');
    msgItemsElement.innerHTML = "";

    containerMsg.style.display = 'none';

    document.addEventListener('keydown', keydownHandler);

    containerMsg.removeEventListener("keydown", handleArrowKeysMsg);
}

function renderMessages() {
    var messagesElement = document.getElementById('messages');

    messagesElement.innerHTML = ''; // Clear the existing items


    messageList.forEach((item) => {
        // Create a list item for messages
        const li = document.createElement('li');
        li.tabIndex = 0; // Add tabindex to make it focusable

        // Create an image element
        const img = document.createElement('img');
        img.src = './unreadmsg.png'; // Replace with the actual path to the image
        img.alt = item.content; // Set the alt text for accessibility
        img.style.height = '20px';
        img.style.width = '20px';

        const img2 = document.createElement('img');


        img2.src = logoicon.getAttribute('src');
        img2.alt = item.content; // Set the alt text for accessibility
        img2.style.height = '40px';
        img2.style.width = '40px';


        // Create a span element for the item details
        const span = document.createElement('span');
        span.style.fontSize = '20px';
        span.innerText = item.content;
        //sauvegarde de la date pour y acceder apres 
        li.setAttribute('date', item.creationDate);

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

        li.style.width = '90%';
        li.style.height = '90px';
        li.style.overflow = 'hidden';



        // Append the list item to the messages list
        messagesElement.appendChild(li);
        // matrice.appendChild([li]);


    });

    // Update the message matrix
    // matrixMsg = populateMessageMatrix();
}


function populateMessageMatrix() {
    const msgItemsElement = document.getElementById('messages');
    const msgItems = msgItemsElement.querySelectorAll('li'); // Get all the list items


    // Create a matrix with the elements
    matrixMsg = Array.from(msgItems);
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
        // matrixMsg[focusedIndexMsg].querySelector('img').src = '';
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
        // matrixMsg[focusedIndexMsg].querySelector('img').src = '';
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

function readMsg() {
    const MsgTextContainer = document.getElementById("textMsgContainer");
    MsgTextContainer.style.border = "1px solid";
    const MsgDate = document.getElementById('dateMsg');
  
    var currentMsg = document.activeElement;
    var spanElement = currentMsg.querySelector('span');
    spanElement.style.display.maxWidth = "50%";
  
    if (spanElement) {
      const messageWidth = spanElement.offsetWidth;
      const messageHeight = spanElement.offsetHeight;
  
      // Check if the bubble container already exists
      const bubbleContainer = MsgTextContainer.querySelector('.bubbleContainer');
      if (bubbleContainer) {
        // If it exists, update the message content inside the existing bubble container
        const messagePara = bubbleContainer.querySelector('p');
        messagePara.innerText = spanElement.innerText;
  
        // Adjust the bubble container's width and height based on the content size
        bubbleContainer.style.width = `${messageWidth + 20}px`; // Add some padding to the width
        bubbleContainer.style.height = `${messageHeight + 20}px`; // Add some padding to the height
      } else {
        // If it doesn't exist, create a new bubble container
        const bubbleContainer = document.createElement('div');
        bubbleContainer.className = 'bubbleContainer';
        bubbleContainer.style.position = 'relative';
        bubbleContainer.style.left = '20px';
        bubbleContainer.style.top = '50px';
        bubbleContainer.style.display = 'inline-block';
        bubbleContainer.style.width = `${messageWidth + 20}px`; // Add some padding to the width
        bubbleContainer.style.height = `${messageHeight + 20}px`; // Add some padding to the height
        bubbleContainer.style.borderRadius = '15px'; // Add rounded border
  
        // Style the bubble with other CSS properties as needed
        bubbleContainer.style.backgroundColor = '#f5f5f5';
        bubbleContainer.style.padding = '10px';
  
        // Create a paragraph to display the message content
        const messagePara = document.createElement('p');
        messagePara.innerText = spanElement.innerText;
        bubbleContainer.appendChild(messagePara);
  
        // Replace the previous content with the bubble container
        MsgTextContainer.innerHTML = ''; // Clear the container
        // MsgTextContainer.appendChild(MsgDate);
        MsgTextContainer.appendChild(bubbleContainer);
      }
  
      // Update other message details if needed
      MsgDate.innerHTML = currentMsg.getAttribute('date').replace("T", " ").slice(0, 16);
      MsgDate.style.position = 'relative';
      MsgDate.style.left = '50px';
    }
  }
  