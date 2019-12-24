startPlay = false;

function buttonClicked(i, j, levelNum) { //this is where you should start
    startPlay = true;
    setStatusText(getFruit(i,j) + " (" + i + ", " + j + ") pressed");
    clickHistory.push(i*grid_height + j);
    var img1 = document.getElementById("img_" + getRow(clickHistory[0]) + "_" + getColumn(clickHistory[0]));
    img1.style.border = "3px solid #006600";

    if(clickHistory.length == 2) {    
        var img2=document.getElementById("img_" + getRow(clickHistory[1]) + "_" + getColumn(clickHistory[1]));
        img2.style.border = "3px solid #006600";

        if (condition() == true)  {
            progress-=1;
            setProgressBar(progress, levelNum);
            swapFruit(clickHistory[0], clickHistory[1]);
            setTimeout(quickScan, 200, levelNum);
        }
        else setStatusText("Invaid move!"); 

        setTimeout(function(){    
            img1.style.border = "none";    
            img2.style.border = "none"; }, 500);
        clickHistory = [];
    } 
 
}

function condition() {
    var i1 = getRow(clickHistory[0]);
    var j1 = getColumn(clickHistory[0]);
    var i2 = getRow(clickHistory[1]);
    var j2 = getColumn(clickHistory[1]);

    if (clickHistory[0] == clickHistory[1]) return false;
    if (Math.abs(i1 - i2) == 1 && (j1 == j2)) {    // top or down
        return true;
    }
    if (Math.abs(j1 - j2) == 1 && (i1 == i2)) {    // left or right
        return true;
    }
    return false;
}


