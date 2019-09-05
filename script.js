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
        setProgressBar("bar", "bg-danger", progress, levelNum);
        for (i = 0; i < grid_height; i++) {
            for (j = 0; j < grid_width; j++) {
                setFruit(i, j, setRandomFruits(levelList[levelNum].fruitNum));
            }
        }
        quickScan(levelNum);
    }   
}

function cancelClick() {
    var img=document.getElementById("img_" + getRow(clickHistory[0]) + "_" + getColumn(clickHistory[0]));
    img.style.border = 'none'; 
    clickHistory = [];
    setStatusText("Move cancelled.");
}

function infoButton() {

    var infoB = document.getElementById("buttonInfo");
    infoB.className = "btn btn-light btn-lg";
    infoB.innerHTML="";
    infoB.appendChild(document.createTextNode("Resume"));
    infoB.setAttribute("onclick", "resumeGame()");

    var grid = document.getElementById("grid");

    var instBroad = document.createElement("div");
    instBroad.id = "instructionBroad";
    instBroad.style.position = "relative";
    instBroad.style.backgroundColor = "#ffffff";
    instBroad.style.left = "10%";  
    instBroad.style.top = "10%";
    instBroad.style.position = "absolute";
    
    var newText = document.createElement("div");

    var title1 = document.createElement("h2");
    title1.appendChild(document.createTextNode("Instructions:"))
    newText.appendChild(title1); 

    var text = document.createElement("p");
    text.innerText = "\nThis is a simplified Candy Crush/ Bejeweled like game. " +
            "\nLine up three or more in a row/ column to earn points. " + 
            "\nEach fruit worth 100 points. The more fruits you match in a row/ column, the more points you earn. " +
            "\n\nNote that you can keep moving until there are matches." + 
            "\nYou may also choose to \"Refresh Broad\" if you believe that there are no more moves. " + 
            "\n\"Refresh Broad\" will cost 2 moves." +
            "\n\nIf you finish the level with less moves, you will gain extra points. Please use your moves wisely." +
            "\nThere are total 5 levels. Each level has their own target scores and move limits." +
            "\n\nGOOD LUCK and HAVE FUN!!!" + 
            "\n______________________________________________________________________"       
    text.style.wordWrap = "break-word";        
    newText.appendChild(text);
    
    newText.style.padding = "30px 30px 30px 30px";   
    instBroad.appendChild(newText);
    grid.appendChild(instBroad);
}

function resumeGame() {
    var infoB = document.getElementById("buttonInfo");
    infoB.className = "btn btn-info btn-lg";
    infoB.innerHTML="";
    infoB.appendChild(document.createTextNode("Info"));
    infoB.setAttribute("onclick", "infoButton()");

    var instBroad = document.getElementById("instructionBroad");
    instBroad.remove();
}


