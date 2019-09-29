var match3Map = {};

function addMatch3(row, col, align, num, fruit) {
    var gridNum = getGridNum(row, col);
    for (i = 0; i < num; i++){
        if (align == "H") match3Map[gridNum+i] = addM3Object(row, col+i, align, num, fruit);
        else match3Map[gridNum+i*grid_width] = addM3Object(row+i, col, align, num, fruit);
    }
}

function addM3Object(row, col, align, num, fruit) {    
    var n = getGridNum(row, col);
    var match3Object = {
        gridNum: n,
        rowNum: row,
        colNum: col,
        direction: align,    // H - horizontal, V - Vertical
        consectiveNum: num,
        type: fruit
    }
    return match3Object;
}

function quickScan(levelNum) {
        document.getElementById("grid").style.pointerEvents = "none";
        document.getElementById("buttonInfo").disabled = true;   
        document.getElementById("button1").disabled = true;        
        document.getElementById("button2").disabled = true;
        document.getElementById("button3").disabled = true;

        setStatusText("Hold on... ");
        var status = false;
        for (k=0; k<grid_size-2; k++) {
            if (getFruitbyNum(k) == getFruitbyNum(k+1) && getFruitbyNum(k) == getFruitbyNum(k+2)) {
                if(getRow(k) == getRow(k+1) && getRow(k) == getRow(k+2)) {         
                    status = true;
                    break;
                }
            }    
        }
        for (k=0; k<grid_size-grid_width*2; k++) {
            if (getFruitbyNum(k) == getFruitbyNum(k+grid_width) && getFruitbyNum(k) == getFruitbyNum(k+grid_width*2)) {      
                status = true;
                break;
            }    
        }

        if (status==true) {
            checkBroad(levelNum);
        return true;
    }
    else {  
        document.getElementById("grid").style.pointerEvents = "auto";
        document.getElementById("buttonInfo").disabled = false;   
        document.getElementById("button1").disabled = false;        
        document.getElementById("button2").disabled = false;
        document.getElementById("button3").disabled = false;            

        setStatusText("You may continue...");            
        if (score < levelList[levelNum].passScore) {            // Score not reached and 
            if(progress <= 0) {                                 // run out of moves  
                document.getElementById("grid").style.pointerEvents = "none";
                levelFailed();
            } 
        }
        else {                                                  // Score reached, Level up
            document.getElementById("grid").style.pointerEvents = "none";
            levelClear(levelNum);
            }
            return false;
        }    
}

function checkBroad(levelNum) {   
    var count = 0; keyI = 0; keyJ = 0;

    //console.log("Checking rows...");
    for(i=0; i< grid_height; i++) {
        count = 0; keyI = 0; keyJ = 0;      // reset for each row check
        for(j=1; j< grid_width; j++) {
            if(getFruit(i, j) == getFruit(i, j-1)) {
                count++;                // add up if there are consective fruits
                keyI = i; keyJ = j-count;                    
                if (j == grid_width-1 && count >=2) addMatch3(keyI, keyJ, "H", count+1, getFruit(keyI, keyJ));
            }             
            else if (count >= 2) {      // a new fruit breaking the consective & more than 3
                addMatch3(keyI, keyJ, "H", count+1, getFruit(keyI, keyJ));
                count = 0;              // reset to 0
            } 
            else count = 0;             // no consective counts before
        }
    }     
        
    //console.log("Checking columns...");
    for(j=0; j< grid_width; j++) {
        count = 0; keyI = 0; keyJ = 0;
        for(i=1; i< grid_height; i++) {
            if(getFruit(i, j) == getFruit(i-1, j)){
                count++; 
                keyI = i-count; keyJ = j;        
                if (i == grid_height-1 && count >=2) addMatch3(keyI, keyJ, "V", count+1, getFruit(keyI, keyJ));
            }             
            else if (count >= 2) {
                addMatch3(keyI, keyJ, "V", count+1, getFruit(keyI, keyJ));
                count = 0;              // reset to 0
            } 
            else count = 0;                
        }            
    }
    for (var i in match3Map) 
        //console.log("Key is: " + i + " | Value is: " + match3Map[i].type + " | " + match3Map[i].direction + " | " + match3Map[i].consectiveNum);
        
    setTimeout(cleanBoard, 500, levelNum);    
    setTimeout(quickScan, 1000, levelNum); 
}


function cleanBoard(levelNum) {
    //console.log("Cleaning board... ");
    for (var k in match3Map) {
        var row = match3Map[k].rowNum;
        var col = match3Map[k].colNum;
        setFruit(row, col, "giphy");
        if(startPlay) {
            score+=100;
            if (match3Map[k].consectiveNum == 4) score+= 100;
            if (match3Map[k].consectiveNum == 5) score+= 200;    
        }
        
        setStatusTextSmall(levelNum, score);

        for(i = row; i >= 0; i--) {
            if (match3Map[k].direction == "H")   {              
                var newRow = i-1;
                var newKey = getGridNum(newRow, col);
                while(newKey in match3Map) {
                    newRow--;
                    newKey = getGridNum(newRow, col);
                }
            }
            else if (match3Map[k].direction == "V") {                                 
                var newRow = i-match3Map[k].consectiveNum;
                var newKey = getGridNum(newRow, col);
                while(newKey in match3Map) {
                    newRow--;
                    newKey = getGridNum(newRow, col);
                }
            }

            if (newRow >= 0) fruit = getFruit(newRow, col);     
            else fruit = setRandomFruits(levelList[levelNum].fruitNum);     // if the row above is negative, set random
            
            setTimeout(setFruit, 300, i, col, fruit);   
        }
    }
    match3Map = {};
}

