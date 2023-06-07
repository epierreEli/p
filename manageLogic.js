var i = 0;
var j = 0;

export function navigationSpatiale(matrice, event) {
    var numColumns = matrice[i].length;
    var numRows = matrice.length;
    switch (event.keyCode) {
        case 37: // Flèche gauche
            if ((j > 0)) {
                j = j - 1;
            }
            break;
        case 38: // Flèche haut
            if (i > 0) {
                i = i - 1;
            }
            break;
        case 39: // Flèche droite
            if (j < numColumns - 1) {
                j = j + 1;
            }
            break;
        case 40: // Flèche bas
            if (i < numRows - 1) {
                i = i + 1;
            }
            break;
    }
    return [i, j];
}
