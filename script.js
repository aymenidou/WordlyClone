//increment try after clicking enter
let iTryCount = 1;
let iCurrentCol = 0;
let iMaxCols = 5;
let iMaxTrys = 6;
let sEnteredWord = new Array();
let sHiddenWord = 'WORLD'

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
    if (iTryCount <= iMaxTrys && iCurrentCol < iMaxCols) {
        iCurrentCol++;
        $('.row_' + iTryCount + ' .col_' + iCurrentCol).html(key)
        sEnteredWord.push(key);
        console.log(sEnteredWord);
        currentIndex()
    }

}

function deleteLetter() {
    if (iTryCount >= 1 && iCurrentCol > 0) {
        $('.row_' + iTryCount + ' .col_' + iCurrentCol).html('')
        iCurrentCol--;
        sEnteredWord.pop();
        console.log(sEnteredWord);
        currentIndex()
    }
}
function submitGuess() {
    if (iCurrentCol == iMaxCols) {
        //verify if word exist
        console.log('submitGuess');
        console.log(sEnteredWord);
        console.log(sEnteredWord.join(''));
        sGuess = sEnteredWord.join('');
        fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + sGuess)
            .then(res => {
                if (!res.ok) {
                    // throw new Error("Word not found");
                    // alert("Word doesn't exist")
                    return res.json();
                }
            })
            .then(data => console.log("Word exists:"))
            .catch((e) => console.log("Word does not exist", e));
        if (sEnteredWord.join('') === sHiddenWord) {
            alert('You win');
        }
        else {
            if (iTryCount == iMaxTrys) {
                alert('you failed the word was : ' + sHiddenWord)
                for (let i = 0; i <= iMaxTrys; i++) {
                    for (let j = 0; j <= iMaxCols; j++) {
                        $('.row_' + i + ' .col_' + j).html('')
                    }

                }
            } else {
                arCorrectIdx = sEnteredWord
                    .map((value, index) => value == sHiddenWord[index] ? index : -1
                    )
                    .filter(index => index != -1).push(index)
                console.log("correct positions :" + arCorrectIdx);

            }
            iTryCount++;
            iCurrentCol = 0;
            sEnteredWord = []
        }
    }


}
function currentIndex() {
    console.log('row_' + iTryCount + ' .col_' + iCurrentCol);

}

$('body').keydown(fillTheBox);
$('#debug').change(function (e) {
    // e.preventDefault();
    console.log(e.target.checked);
    if (e.target.checked) {
        $('.debug').toggleClass('visually-hidden');
        debug_start()
    }
    else {
        $('.debug').toggleClass('visually-hidden');

    }


});

function debug_start() {

    for (let j = 0; j <= iMaxCols; j++) {
        $('.row_0' + ' .col_' + (j + 1)).html(sHiddenWord[j])
        console.log('.row_0' + ' .col_' + (j + 1));

    }



}


