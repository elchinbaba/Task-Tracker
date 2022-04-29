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
        this.delImgElement = new deleteImg().imgElement;
        this.editImgElement = new editImg().imgElement;

        this.divElement.append(this.pElement);
        this.divElement.append(this.delImgElement);
        this.divElement.append(this.editImgElement);
    }

    styleDiv() {
        this.divElement.style.margin = "auto";
        this.divElement.style.position = "relative";
        this.divElement.style.width = "286px";
        this.divElement.style.height = "40px";
        this.divElement.style.border = "2px solid #C4C4C4";
        this.divElement.style.borderRadius = "5px";
        this.divElement.style.marginBottom = "3px";
    }

    dragDiv() {
        this.divElement.draggable = true;
        this.divElement.addEventListener('drop', event => {
            event.preventDefault();
            var data = event.dataTransfer.getData("text");
            if (event.target.parentElement.classList[0] == "added")
                document.querySelector('.list').insertBefore(document.getElementById(data), event.target.parentElement);
            else 
                document.querySelector('.list').insertBefore(document.getElementById(data), event.target);
        });
        
        this.divElement.addEventListener('dragover', event => {
            event.preventDefault();
        });
        this.divElement.addEventListener('dragstart', event => {
            event.dataTransfer.setData("text", event.target.id);
        });
    }

    static drag() {
        document.querySelector('.container').addEventListener('drop', event => {
            var data = event.dataTransfer.getData("text");
            if (event.target == document.querySelector('.container')) document.getElementById(data).remove();
        });
        document.querySelector('.container').addEventListener('dragover', event => {
            event.preventDefault();
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
        this.pElement.style.height = "40px";
        this.pElement.style.marginTop = "8px";
        this.pElement.style.border = "none";
        this.pElement.style.paddingLeft = "3px";
    }
}

class Img {
    constructor() {
        this.createImg();
    }

    createImg() {
        this.imgElement = document.createElement('img');

        this.styleImg();
    }

    styleImg() {
        this.imgElement.style.position = "absolute";
        this.imgElement.style.top = "8px";
    }
}

class deleteImg extends Img {
    constructor() {
        super();
    }

    createImg() {
        super.createImg();
        
        this.imgElement.classList += "delete";
        this.imgElement.addEventListener('click', event => {
            event.target.parentElement.remove();
        });
        this.imgElement.src = "images/delete.png";
        this.imgElement.alt = "delete";
    }

    styleImg() {
        super.styleImg();
        this.imgElement.style.right = "8px";
    }
}

class editImg extends Img {
    constructor() {
        super();
    }

    createImg() {
        this.imgElement = document.createElement('img');
        this.imgElement.classList += "edit";
        this.imgElement.addEventListener('click', event => {
            const pElement = event.target.parentElement.querySelector('p');
            pElement.innerText = "";
            const input = document.createElement('input');
            pElement.style.marginTop = "0";
            pElement.append(input);
            input.addEventListener('keypress', event => {
                if (event.key == "Enter") {
                    pElement.innerText = input.value;
                    pElement.style.marginTop = "8px";
                    input.remove();
                }
            })
        });
        this.imgElement.src = "images/edit.png";
        this.imgElement.alt = "edit";

        this.styleImg();
    }

    styleImg() {
        super.styleImg();
        this.imgElement.style.right = "30px";
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

Div.drag();