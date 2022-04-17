class Div {
    static count = 0;

    constructor(text) {
        Div.count++;
        this.createDiv(text);
    }

    appendDiv() {
        document.querySelector('.list').append(this.divElement);
    }

    createDiv(text) {
        this.divElement = document.createElement('div');
        this.divElement.classList += "added";
        this.divElement.id = Div.count.toString();

        this.styleDiv();

        this.dragDiv();
        
        this.pElement = new P(text).pElement;
        this.imgElement = new Img().imgElement;

        this.divElement.append(this.pElement);
        this.divElement.append(this.imgElement);
    }

    styleDiv() {
        this.divElement.style.margin = "auto";
        this.divElement.style.position = "relative";
        this.divElement.style.width = "286px";
        this.divElement.style.height = "40px";
        this.divElement.style.border = "2px solid #C4C4C4";
        this.divElement.style.borderRadius = "5px";
    }

    dragDiv() {
        this.divElement.draggable = true;
        this.divElement.addEventListener('drop', event => {
            event.preventDefault();
            var data = event.dataTransfer.getData("text");
            document.querySelector('.list').insertBefore(document.getElementById(data), event.target);
        });
        this.divElement.addEventListener('dragover', event => {
            event.preventDefault();
        });
        this.divElement.addEventListener('dragstart', event => {
            event.dataTransfer.setData("text", event.target.id);
        });
    }
}

class P {
    constructor(text) {
        this.createP(text);
    }

    createP(text) {
        this.pElement = document.createElement('p');
        this.pElement.innerText = text;

        this.styleP();
    }

    styleP() {
        this.pElement.style.width = "282px";
        this.pElement.style.margin = "8px 0";
        this.pElement.style.border = "none";
    }
}

class Img {
    constructor() {
        this.createImg();
    }

    createImg() {
        this.imgElement = document.createElement('img');
        this.imgElement.classList += "delete";
        this.imgElement.addEventListener('click', event => {
            event.target.parentElement.remove();
        });
        this.imgElement.src = "images/delete.png";
        this.imgElement.alt = "delete";

        this.styleImg();
    }

    styleImg() {
        this.imgElement.style.position = "absolute";
        this.imgElement.style.top = "8px";
        this.imgElement.style.right = "8px";
    }
}

document.querySelector('.button-main').addEventListener('click', _ => {
    const input = document.querySelector('input');
    if (input.value != "") {
        const div = new Div(input.value.toString());
        div.appendDiv();

        document.querySelector('.buttons').style.paddingBottom = "15px";

        input.value = "";
    }
});

function reverse(arr) {
    let temp, n = arr.length;
    for (let i = 0; i < n/2; i++) {
        temp = arr[n - 1 - i];
        arr[n - 1 - i] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

function sort(array, direction) {
    if (direction == false) return reverse(array);
    array = array.sort();
    return array;
}

document.querySelector('.sort').addEventListener('click', event => {
    const sortElement = event.target;
    let array = new Array();
    const added = document.querySelectorAll('.added p'); 
    added.forEach(element => {
        array.push(element.innerText);
    });
    let sortedArray = new Array();
    switch (sortElement.dataset.sorted) {
        case "start":
            sortedArray = sort(array, true);
            sortElement.dataset.sorted = "increasing";
            break;
        case "decreasing":
            sortedArray = sort(array, true);
            sortElement.dataset.sorted = "increasing";
            sortElement.src = "images/sort-down-hover.png";
            break;
        case "increasing":
            sortedArray = sort(array, false);
            sortElement.dataset.sorted = "decreasing";
            sortElement.src = "images/sort-up-hover.png";
            break;
    };
    added.forEach((element, index) => {
        element.innerText = sortedArray[index];
    });
});

document.querySelector('.sort').addEventListener('mouseover', event => {
    const sortElement = event.target;
    let source = sortElement.src.toString();
    source = source.slice(0, source.length - 4) + "-hover.png";
    sortElement.src = source;
});

document.querySelector('.sort').addEventListener('mouseout', event => {
    const sortElement = event.target;
    source = sortElement.src.toString();
    source = source.slice(0, source.length - 10) + ".png";
    sortElement.src = source;
});


document.querySelector('.del-inp').addEventListener('click', event => {
    event.target.parentElement.querySelector('input').value = "";
})