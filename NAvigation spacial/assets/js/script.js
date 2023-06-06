    //ce evenement attend l appui sur une fleche
    document.addEventListener("keydown", function(event) {
        var currentElement = document.activeElement;
        var nextElement;
  
        switch(event.keyCode) {
          case 37: // Flèche gauche
            nextElement = currentElement.previousElementSibling;
            break;
          case 38: // Flèche haut
            nextElement = currentElement.parentElement.previousElementSibling;
            break;
          case 39: // Flèche droite
            nextElement = currentElement.nextElementSibling;
            break;
          case 40: // Flèche bas
            nextElement = currentElement.parentElement.nextElementSibling;
            break;
        }
  
        if (nextElement) {
          nextElement.focus();
          nextElement.classList.add("highlighted");
          currentElement.classList.remove("highlighted");
        }
      });