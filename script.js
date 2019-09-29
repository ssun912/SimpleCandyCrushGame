var clickHistory = [];
var progress = 0;
var grid_width;     // = j   // = column
var grid_height;    // = i   // = row
var grid_size = grid_height*grid_width;     // = k
var score = 0;
var totalScore = 0;


function setup() { //initialize everything
    setBackground();
    fillStatusText();
    setUpAllLevels();
    startLevel(1);
    setStatusText("Loaded succesfully!", "text-bold" );
}

function createRow(className) {
    var rowDiv = document.createElement("div");
    if (className == null) {
        rowDiv.className = "row";
    }
    else {
        rowDiv.className = "row " + className;
    }
    return rowDiv;
}

function getFruit(i, j) {
    var img = document.getElementById("img_" + i + "_" + j);
    return img.getAttribute("alt");
}

function getFruitbyNum(k) {
    var i = getRow(k);
    var j = getColumn(k);
    var img = document.getElementById("img_" + i + "_" + j);
    return img.getAttribute("alt");
}

function getButtonText(i, j) {
    var text = document.getElementById("text_" + i + "_" + j);
    return text.innerHTML;
}

function getRandomNumber(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function getRow(gridNum) {
    return Math.floor(gridNum / grid_width);
}

function getColumn(gridNum) {
    if(gridNum == 0) return 0;
    return Math.floor(gridNum % grid_width);
}

function getGridNum(i, j) {
    return i*grid_height+j;
}

function swapFruit(num1, num2) {
    var i1 = getRow(num1);
    var j1 = getColumn(num1);
    var i2 = getRow(num2);
    var j2 = getColumn(num2);

    var fruitA = getFruit(i1, j1);
    var fruitB = getFruit(i2, j2);  
    setFruit(i1, j1, fruitB);
    setFruit(i2, j2, fruitA);
}


// ==================================== Function Buttons ==========================================

function refreshBroad(levelNum) { //sample function 1 - for function button 
    if(progress-2 < 0) setStatusText("Not encough moves to refresh broad!");
    else {
        progress-=2; 
        setProgressBar(progress, levelNum);
        for (i = 0; i < grid_height; i++) {
            for (j = 0; j < grid_width; j++) {
                setFruit(i, j, setRandomFruits(levelList[levelNum].fruitNum));
            }
        }
        quickScan(levelNum);
    }   
}

function cancelClick() {
    if(clickHistory[0] != null) {
        var img=document.getElementById("img_" + getRow(clickHistory[0]) + "_" + getColumn(clickHistory[0]));
        img.style.border = 'none'; 
        clickHistory = [];
        setStatusText("Move cancelled.");
    }    
}
