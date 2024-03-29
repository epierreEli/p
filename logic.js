Array.prototype.next = function () {
    if (this[this.currentIndice + 1]) return this[++this.currentIndice];
};
Array.prototype.prev = function () {
    if (this[this.currentIndice - 1]) return this[--this.currentIndice];
};
Array.prototype.first = function () {
    return this[(this.currentIndice = 0)];
};
Array.prototype.last = function () {
    return this[(this.currentIndice = this.length - 1)];
};
Array.prototype.current = function () {
    return this[this.currentIndice];
};
Array.prototype.currentIndice = 0;

//define logicEvents
const logicEvents = {
    ACTION: -1,
    CANT_GO_UP: 0,
    CANT_GO_DOWN: 1,
    CANT_GO_LEFT: 2,
    CANT_GO_RIGHT: 3,
    GO_UP: 4,
    GO_DOWN: 5,
    GO_LEFT: 6,
    GO_RIGHT: 7,
    GO_FIRST: 8,
    GO_LAST: 9,
};



function logicEvent(matrix, keyboardEvent, manageEvent = () => { }) {
    const controles = {
        goUpFirst: goUpFirst,
        goUpLast: goUpLast,
        goDownFirst: goDownFirst,
        goCurrentLeft: goCurrentLeft,
        goCurrentRight: goCurrentRight,
        goCurrentFirst: goCurrentFirst,
        goCurrentLast: goCurrentLast,
    };
    const currentRow = matrix.current();


    switch (keyboardEvent.keyCode) {
        case 38:
            goUpFirst();
            break;
        case 40:
            goDownFirst();
            break;
        case 37:
            goCurrentLeft();
            break;
        case 39:
            goCurrentRight();
            break;
        case 13:
            // gestion de a touvh entrer
            actionOnElement();
            break;
        case 461:
            // nothing
            break;
        default:

            throw new Error("Unknown key");
    }
    event(logicEvents.ACTION);

    function goUpFirst() {
        try {
            matrix.prev().first().focus();
            event(logicEvents.GO_UP);
        } catch (error) {
            event(logicEvents.CANT_GO_UP);
        }
    }

    function goUpLast() {
        try {
            matrix.prev().last().focus();
            event(logicEvents.GO_UP);
        } catch (error) {
            event(logicEvents.CANT_GO_UP);
        }
    }

    function goDownFirst() {
        try {
            matrix.next().first().focus();
            event(logicEvents.GO_DOWN);
        } catch (error) {
            event(logicEvents.CANT_GO_DOWN);
        }
    }

    function goCurrentLeft() {
        try {
            matrix.current().prev().focus();
        } catch (error) {
            event(logicEvents.CANT_GO_LEFT);
        }
    }

    function goCurrentRight() {
        try {
            matrix.current().next().focus();
        } catch (error) {
            event(logicEvents.CANT_GO_RIGHT);
        }
    }

    function goCurrentFirst() {
        matrix.current().first().focus();
        event(logicEvents.GO_FIRST);
    }

    function goCurrentLast() {
        matrix.current().last().focus();
        event(logicEvents.GO_LAST);
    }

    function event(logicEvent) {
        manageEvent(logicEvent, controles);
    }
}

function actionOnElement() {

    var activeElement = document.activeElement;

    //si ce n est pas une application
    if (activeElement.classList.contains('application')) {


        if (activeElement.getAttribute('title') == 'PANIER') {
            showCart();
        }

        if (activeElement.getAttribute('title') == 'PARAMETRES') {

            showSettings();

        }

        if (activeElement.getAttribute('title') == 'MESSAGE') {

           showMessage();

        }


        if (activeElement.getAttribute('title') == 'TV') {
            // test youtube par lien 
            window.open('https://www.youtube.com/', '_blank');
            console.log("YouTube");}

        if (activeElement.getAttribute('title') == 'BILLING') {

                // To do to be replace by show Biling infos 

                showOrderHistory();

            }




        


    }

    else {


        if (!activeElement.classList.contains('video')) {
            // sendDatatoOtherPage(activeElement);
            getDataFromElement(activeElement);
        }



        //si c est une application
    }


}


//gestion de la navigation 
// listen when loading is done and focus on first element with tabindex



// Define the event handler function separately
function keydownHandler(e) {

document.getElementById("eventcode").innerHTML=e.keyCode;
    if ((e.keyCode >= 37 && e.keyCode <= 40) || e.keyCode == 13 || e.keyCode == 8) {
        e.preventDefault();
        // logicEvent(indexedMatrix, e, function (myEvent, controles) {
        //     switch (myEvent) {
        //         case logicEvents.CANT_GO_RIGHT:
        //             // controles.goDownFirst();
        //             break;
        //         case logicEvents.CANT_GO_LEFT:
        //             // controles.goUpLast();
        //             break;
        //     }
        // });
        smoothScrollToElement(document.activeElement);
        // document.activeElement.parentElement.scrollTo(document.activeElement)
        // we want to see the attributes of the active element
    }
}


// TODO: to make the code easier to manage  i will put click  event listener on each element and do an action
// depeding on the situation 

