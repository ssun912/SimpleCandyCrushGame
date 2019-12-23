var interval1 = null;       // for some texts that have setInterval effects 
var interval2 = null;

function setBackground() {
    document.body.style.backgroundImage = "url('images/freepik1.jpg')";
}


// ===================================== Function Buttons =====================================

function fillFunctionButtons(levelNum) {
    var buttonRow = document.getElementById("functionButtons");
    buttonRow.innerHTML = "";
    var funcBtnRow = createRow("justify-content-md-center");

    var infoBtn = createButton("Info", "btn btn-info");
    infoBtn.id = "buttonInfo";
    infoBtn.dataset.toggle = "modal";
    infoBtn.dataset.target = "#instrBroad";

    var restartGame = createButton("Restart Game", "btn btn-danger", "startLevel(1)");
    restartGame.id = "button1";
    var restartLevel = createButton("Refresh Broad", "btn btn-warning", "refreshBroad(" + levelNum + ")");
    restartLevel.id = "button2";
    var cancelButton = createButton("Cancel Move", "btn btn-success", "cancelClick()");
    cancelButton.id = "button3";

    funcBtnRow.appendChild(infoBtn);
    funcBtnRow.appendChild(document.createTextNode( '\u00A0\u00A0' ) );
    funcBtnRow.appendChild(restartGame);
    funcBtnRow.appendChild(document.createTextNode( '\u00A0\u00A0' ) );
    funcBtnRow.appendChild(restartLevel);
    funcBtnRow.appendChild(document.createTextNode( '\u00A0\u00A0' ) );
    funcBtnRow.appendChild(cancelButton);
    
    funcBtnRow.style.padding ="20px 10px 10px 10px";
    buttonRow.appendChild(funcBtnRow);
    return funcBtnRow;
}

function createButton(buttonText, styleClass, functionName) {
    var button = document.createElement("button");
    button.className = styleClass;
    button.appendChild(document.createTextNode(buttonText));
    button.setAttribute("onclick", functionName);
    return button;
}

function setButtonText(i, j, text) {
    var button = document.getElementById("text_" + i + "_" + j);
    button.innerHTML = text;
}


// ======================================== Progress Bar =======================================

function createProgressBar(num) {
    var progessRow = createRow("progress");
    if(grid.offsetWidth <= 576) w = grid.offsetWidth + "px";
        else w = (grid.offsetWidth-window.innerWidth*3/7) + "px";
        
    progessRow.style.width = w;
    progress = num;
    var bar = document.createElement("div");
    bar.className = "progress-bar progress-bar-striped bg-danger progress-bar-animated";
    bar.role = "progressbar";
    bar.style.width = "100%";
    bar.innerHTML = num + " Moves";
    bar.id = "bar";
    
    progessRow.appendChild(bar);
    return progessRow;
}

function setProgressBar(value, levelNum) {
    var bar = document.getElementById("bar");
    bar.style.width = value/levelList[levelNum].moves *100 + "%";
    bar.innerHTML = value + " Moves";
}


// ========================================== Grid ==================================================

function fillMatrix(levelNum) {
    var grid = document.getElementById("grid");
    for (i = 0; i < grid_height; i++) {
        var newRow = createRow("justify-content-md-center");
        for (j = 0; j < grid_width; j++) {
            newRow.appendChild(createDefaultFruit(i, j, levelNum));
        }
        grid.appendChild(newRow);
    }
       
    grid.style.width = "100%";
    grid.style.height = "100%";
    quickScan(levelNum);       
    return grid;
}

function createDefaultFruit(i, j, levelNum) {
    var button = document.createElement("div");
    button.className = "thumbnail";
    button.onclick = function(){buttonClicked(i, j, levelNum);};

    //the image part
    var img = document.createElement("img");
    var fruit = setRandomFruits(levelList[levelNum].fruitNum);
    img.id = "img_" + i + "_" + j;
    img.setAttribute("src", "images/" + fruit + ".png");
    img.setAttribute("alt", fruit);
    var grid = document.getElementById("grid");
    var w;
    if(grid.offsetWidth <= 576) w = grid.offsetWidth/levelList[levelNum].width + "px";
        else w = (grid.offsetWidth-window.innerWidth*3/7)/levelList[levelNum].width + "px";
    img.style.width = w;     
    img.style.height = w;
    img.style.padding = "5px";

    //the text part
    var text = document.createElement("label");
    text.setAttribute("class", "caption unselectable");
    text.id = "text_" + i + "_" + j;

    button.appendChild(img);
    button.appendChild(text);
    return button;
}

function setFruit(i, j, fruit) {
    var button = document.getElementById("img_" + i + "_" + j);
    button.setAttribute("src", "images/" + fruit + ".png");
    button.setAttribute("alt", fruit);
}

function setRandomFruits(num) {
    var random = Math.floor(Math.random() * num);
    if (random < 1) return "apple";
    else if (random < 2) return "orange";
    else if (random < 3) return "banana";
    else if (random < 4) return "lemon";
    else if (random < 5) return "cherries";
    else if (random < 6) return "grapes";
    else if (random < 7) return "pineapple";
    else if (random < 8) return "strawberry";
    else if (random < 9) return "watermelon";
    return "blueberries";
}


// ====================================== Level Transition =========================================

function setLevelGraphic(imgName, w, h) {
    var grid = document.getElementById("grid");
    var textImg = document.createElement("img");
    var newRow = createRow("justify-content-md-center");
    textImg.setAttribute("src", "images/" + imgName);
    //textImg.setAttribute("width", w);
    //textImg.setAttribute("height", h);
    newRow.appendChild(textImg);
    grid.innerHTML = ""; 
    grid.appendChild(newRow);
}


// ========================================= Text ============================================

function switchText(text) {
    setStatusText(text);
    interval1 = setInterval(setStatusText, 2000, "Your total score = " + totalScore);
    interval2 = setInterval(setStatusText, 3000, text);
}

function fillStatusText() {
    var headDiv = document.getElementById("messages");
    var infoTextRow = createRow("justify-content-md-center");
    infoTextRow.id = "infoText"; //set id of this element so we can change it later
    headDiv.appendChild(infoTextRow);
}

function setStatusText(text) {
    var textDiv = document.getElementById("infoText");
    var newText = document.createElement("p");
    newText.appendChild(document.createTextNode(text));
    newText.style.fontSize = "x-large";
    newText.style.fontFamily = "Roboto Mono";
    if (text == "Congratulations!!! Level Up!!!" || text == "You Failed..." || text == "Congratulations!!! You cleared all the levels!!!") {
        newText.style.fontWeight = "1000";
        newText.style.color = "#ff0000";
    }
    textDiv.innerHTML = "";
    textDiv.appendChild(newText);
    textDiv.style.padding ="10px 0px 0px 0px";
}

function setStatusTextSmall(levelNum, score, part2) {
    var textDiv = document.getElementById("infoTextSmall");
    var newText = document.createElement("div");
    if(part2 == null) newText.appendChild(document.createTextNode("Level: " + levelNum + "  |   Target Score: " + levelList[levelNum].passScore + " | "));
    else newText.appendChild(document.createTextNode(part2 + " | "));
    //for(i=0; i<20; i++) newText.appendChild(document.createTextNode("\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0") );
    newText.appendChild(document.createTextNode("Your Score: " + score));
    
    textDiv.innerHTML = "";
    textDiv.style.fontWeight = "700";
    textDiv.appendChild(newText);   
}

