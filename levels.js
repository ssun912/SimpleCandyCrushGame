var levelList = {};
var levelNum;
var totalLevelNum = 5;

function setUpAllLevels() {
    var level1 = createLevel(6, 6, 3, 6, 1000);
    levelList[1] = level1; 
    var level2 = createLevel(7, 7, 5, 7, 2000);
    levelList[2] = level2;
    var level3 = createLevel(8, 8, 6, 8, 3000);
    levelList[3] = level3;
    var level4 = createLevel(8, 8, 10, 9, 4000);
    levelList[4] = level4;
    var level5 = createLevel(8, 8, 15, 10, 5000);
    levelList[5] = level5;
}

function createLevel(w, h, m, n, s) {    
    var levelObject = {
        width: w,
        height: h,
        moves: m,
        fruitNum: n,
        passScore: s,
        size: w*h
    }
    return levelObject;
}

function startLevel(i) {    
    startPlay = false;
    var bar = document.getElementById("progressbar");   
    bar.innerHTML = "";
    bar.appendChild(createProgressBar(levelList[i].moves));

    if(interval1 != null & interval2 !=null) {
        clearInterval(interval1);
        clearInterval(interval2);
    }
 
    var grid = document.getElementById("grid");
    
    score = 0;    
    grid_height = levelList[i].height;
    grid_width = levelList[i].width;
    grid_size = levelList[i].size;

    fillFunctionButtons(i);

    grid.innerHTML = "";
    grid = fillMatrix(i);
    setStatusTextSmall(i, score);
    clearInterval();
}

function levelClear(levelNum) {    
    if(progress > 0) {              // bonus points for remaining moves
        score+=600*progress;
        setStatusTextSmall(levelNum, score, "Loading next level...");
    }    
    totalScore += score;    

    //document.getElementById("buttonInfo").disabled = true;
    document.getElementById("button2").disabled = true;
    document.getElementById("button3").disabled = true;

    setLevelGraphic ("congrat.gif", 900, 500);
    if(levelNum < 5)    setStatusText("Congratulations!!! Level Up!!!");       
    else switchText("Congratulations!!! You cleared all the levels!!!");

    if(levelNum < totalLevelNum) setTimeout(startLevel, 2500, levelNum += 1);
}

function levelFailed() {
    totalScore += score;
    document.getElementById("button2").disabled = true;
    document.getElementById("button3").disabled = true;
    switchText("You Failed..."); 
}


