// Definition de la navigation sur le login
const emailblock = document.getElementById('username');
emailblock.tabIndex = 0;
const passwordblock = document.getElementById('password');
passwordblock.tabIndex = 1;
const loginButton = document.getElementById('loginButton');

document.addEventListener('keydown', arrowLoginKeyHandler);
loginButton.focus();

function arrowLoginKeyHandler(event) {
// suite testttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt
// var eventCOde=document.getElementById('eventCode');
// eventCOde.innerHTML=event.keyCode ;
    console.error("eventCO")
    if (event.keyCode === 38) {
        // Up arrow key logic
        if (document.activeElement === loginButton) {
            passwordblock.focus(); // Focus on the password block
        } else if (document.activeElement === passwordblock) {
            emailblock.focus(); // Focus on the email block
        } else if (document.activeElement === emailblock) {
            loginButton.focus(); // Focus on the login button
        }
    } else if (event.keyCode === 40) {
        // Down arrow key logic
        if (document.activeElement === emailblock) {
            passwordblock.focus(); // Focus on the password block
        } else if (document.activeElement === passwordblock) {
            loginButton.focus(); // Focus on the login button
        } else if (document.activeElement === loginButton) {
            emailblock.focus(); // Focus on the email block
        }
    } else if (event.keyCode === 13) {
        // Down arrow key logic
        console.log("13 selected")
        loginButton.click(); // Click
    }
}


loginButton.addEventListener("click", function(event) {
    console.log("click emulated");

}); //
