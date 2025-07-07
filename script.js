//increment try after clicking enter
let iTryCount = 1;
let iCurrentCol = 1;
let iMaxCols = 5;
let iMaxTrys = 6;
let sEnteredWord = new Array();
function fillTheBox(data) {
    // console.log('key press [' + data.key + ']');
    let key = data.key.toUpperCase()
    if (/^[A-Z]$/.test(key)) {
        console.log(key);
        updateCell(key);
    } else if (key === "BACKSPACE") {
        deleteLetter();
    } else if (key === "ENTER") {
        submitGuess();
    }

}
function updateCell(key) {
    if (iTryCount <= iMaxTrys && iCurrentCol <= iMaxCols) {
        $('.row_' + iTryCount + ' .col_' + iCurrentCol).html(key)
        sEnteredWord.push(key);
        console.log(sEnteredWord);
        iCurrentCol++;
        currentIndex()
    }
    
}

function deleteLetter() {
    if (iTryCount >= 1 && iCurrentCol >= 1) {
        iCurrentCol--;
        $('.row_' + iTryCount + ' .col_' + iCurrentCol).html('')
        sEnteredWord.pop();
        console.log(sEnteredWord);
        currentIndex()
    }
}
function submitGuess(){
    if (iCurrentCol==iMaxCols){
        //verify if word exist
        console.log(sEnteredWord);
        console.log(sEnteredWord.join(''));
        iTryCount++;
        iCurrentCol=1;
    }

    
}
function currentIndex() {
    console.log('row_' + iTryCount + ' .col_' + iCurrentCol);
    
}

$('body').keydown(fillTheBox);



