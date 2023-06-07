var data = {
    grid: [
        {
            title: "Catégorie 1",
            type: "extended",
            children: [
                {
                    disabled: true,
                    icon:"icon1.jpg",
                    title: "titre 1",
                    text: "lorem ipsum, text de description",
                }, 
                {
                    icon: "icon2.jpg",
                    title: "titre 2",
                    disabled: true,
                },
                {
                    icon: "icon3.jpg",
                    title: "titre 3",
                    text: "lorem ipsum, text de description",
                },
                {
                    icon: "icon3.jpg",
                    title: "titre 3",
                    text: "lorem ipsum, text de description",
                },
                {
                    icon: "icon3.jpg",
                    title: "titre 3",
                    text: "lorem ipsum, text de description",
                },
            ],
        },
        {
            title: "Catégorie 2",
            type: "compact",
            children: [
                {
                    icon: "icon3.jpg",
                    title: "titre 3",
                    actionType :"link",
                    action: "https://www.google.fr",
                },
                {
                    icon: "icon3.jpg",
                    title: "titre 3",
                    actionType :"process",
                    action: "process1",
                },
            ],
        },
        {
            title: "Catégorie 3",
            type: "extended",
            children: [
                {
                    icon: "icon1.jpg",
                    title: "titre 1",
                    text: "lorem ipsum, text de description",
                }, 
            ],
        },
    ]
}


export function buildLogicMatrix() {
    var matrix = [];
    for (var i = 0; i < data.grid.length; i++) {
        matrix.push([-1]);
        var row = [];
        for (var j = 0; j < data.grid[i].children.length; j++) {
            if (data.grid[i].children[j].disabled) {
                row.push(0);
            } else {
                row.push(1);
            }
        }
        matrix.push(row);
    }
    return matrix;
}
