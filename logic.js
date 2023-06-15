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
            enterOnElement();
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



function enterOnElement() {
    var activeElement = document.activeElement;
    if (activeElement) {
        activeElement.click(); // Trigger click event on the active element
    }
}