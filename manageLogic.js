var i = 0;
var j = 0;

function initPosition(matrix) {
    //flaten matrix
    for (var x = 0; x < matrix.length; x++) {
        for (var y = 0; y < matrix[x].length; y++) {
            if (matrix[x][y] === 1) {
                [i, j] = [x, y];
                return [i, j];
            }
        }
    }
    throw new Error('matrix dont contain available cell');
}

//TODO: definition des evenements commun changement de column et changement de row

function navigationSpatiale(matrix, event, onEvent) {
    var numColumns = matrix[i].length;
    let numRows = matrix.length;
    var oldindex = i;
    var oldjindex = j;
    var direction = null;
    switch (event.keyCode) {
        case 37: // Flèche gauche
            // if (!(j > 0)) break;
            do {
                j = j - 1;
            } while ((j >= 0) && (matrix[i][j] !== 1));

            if (j < 0) {
                i = oldindex;
                j = oldjindex
            } else {
                direction = 'left';
                onEvent(i, j, direction);
            }
            break;
        case 38: // Flèche haut
            // if (!(i < 0))break;
            console.log(i, j);
            do {
                i = i - 1;
                if (i < 0) break;
                if (matrix[i].includes(1)) {
                    j = matrix[i].indexOf(1);
                    break;
                }
            } while (matrix[i][j] !== 1);
            console.log(i, j);

            if ((i < 0)) {
                i = oldindex;
                j = oldjindex
            } else {
                direction = 'up';
                onEvent(i, j, direction);
                if (oldjindex < j) {

                    onEvent(i, j, 'right');
                } else if (oldjindex > j) {
                    onEvent(i, j, 'left');
                }
            }

            break;
        case 39: // Flèche droite
            do {

                j = j + 1;

            } while ((j < numColumns) && (matrix[i][j] === 0) || (matrix[i][j] === -1));
            if (j > numColumns - 1) {
                i = oldindex;
                j = oldjindex
            } else {
                direction = 'right';
                onEvent(i, j, direction);

            }

            break;
        case 40: // Flèche bas
            do {
                i = i + 1;
                if (i >= numRows) break;
                if (matrix[i].includes(1)) {
                    j = matrix[i].indexOf(1);



                    break;
                }
            } while (matrix[i][j] !== 1);
            if (i >= numRows) {
                i = oldindex;
                j = oldjindex
            } else {
                direction = 'down';
                onEvent(i, j, direction);
                if (oldjindex < j) {

                    onEvent(i, j, 'right');
                } else if (oldjindex > j) {
                    onEvent(i, j, 'left');
                }
            }

            break;
    }
    return [i, j];
}
