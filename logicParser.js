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
                    actionType: "link",
                    action: "https://www.google.fr",
                },
                {
                    icon: "icon3.jpg",
                    title: "titre 3",
                    actionType: "process",
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

class Child {
    constructor({ selectionnable = false, clickable = false, disabled = false }) {
        this.selectionnable = selectionnable;
        this.clickable = clickable;
        this.disabled = disabled;
    }

    render() { }
}

class Link extends Child {
    constructor(title, url) {
        super({ selectionnable: true, clickable: true });
        this.title = title;
        this.url = url;
    }

    render() {
        var el = document.createElement("a");
        el.innerText = this.title;
        el.href = this.url;
        return el;
    }
}

class Image extends Child {
    constructor(title, url,width=150,height=100) {
        super({ selectionnable: true });
        this.title = title;
        this.url = url;
        this.width = width;
        this.height = height;
    }
    render(width=this.width,height=this.height) {
        var el = document.createElement("img");
        el.src = this.url;
        el.alt = this.title;
        el.width = width;
        el.height = height;
        el.style.borderRadius = "10px";
        return el;
    }
}

class Vignette extends Image {
    constructor(title, url) {
        super(title, url);
    }
    render() {     
        var container = document.createElement("div");
        container.classList.add("vignette");
        container.style.height = this.height + "px";
        container.style.width = this.width + "px";
        container.style.margin = "10px";

        
        var image = super.render();
        

        var title = document.createElement("p");
        title.innerText = this.title;

        container.appendChild(image);
        container.appendChild(title);

        return container;
    }
}

class Video extends Vignette {
    constructor(title, url, width = 150, height = 100) {
      super(title, url, width, height);
    }
  
    render() {
      var container = document.createElement("div");
      container.classList.add("vignette");
      container.style.height = this.height + "px";
      container.style.width = this.width + "px";
      container.style.margin = "10px";
  
      var video = document.createElement("video");
      video.style.objectFit = "cover";
      video.style.borderRadius = "10px";
      video.src = this.url;
      video.controls = true;
      video.width = this.width;
      video.height = this.height;
      video.autoplay=true;
      video.loop=true;
  
      var title = document.createElement("p");
      title.innerText = this.title;
  
      container.appendChild(video);
      container.appendChild(title);
  
      return container;
    }
  }

  
  
  
class ImageApp extends Child {
    constructor(title, url,width=100,height=100) {
        super({ selectionnable: true });
        this.title = title;
        this.url = url;
        this.width = width;
        this.height = height;
    }
    render(width=this.width,height=this.height) {
        var el = document.createElement("img");
        el.src = this.url;
        el.alt = this.title;
        el.width = width;
        el.height = height;

        return el;
    }
}
class VignetteApp extends ImageApp {
    constructor(title, url) {
        super(title, url);
    }
    render() {     
        var container = document.createElement("div");
        container.classList.add("vignetteApp");
        container.style.height = 50 + "px";
        container.style.width = 50 + "px";
        container.style.margin = "10px";

        
        var image = super.render();
        

        var title = document.createElement("p");
        title.innerText = this.title;

        container.appendChild(image);
        container.appendChild(title);

        return container;
    }
}

function test() {
    var testList =[];

    var link = new Link("Lien vers Google", "https://www.google.fr");
    testList.push(link);

    var image = new Image("Image", "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg");
    testList.push(image);

    var vignette = new Vignette("Vignette test", "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg");
    testList.push(vignette);


    var container = document.createElement("div");
    container.style.display = "flex";
    testList.forEach(element => {
        container.appendChild(element.render());
    });
   
    return container;
}


function buildLogicMatrix() {
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
