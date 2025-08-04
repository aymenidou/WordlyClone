let iTryCount = 1;
let iCurrentRow = 0;
let iCurrentCol = 0;
let iMaxCols = 5;
let iMaxRows = 6;
let iMaxTrys = 6;
let sEnteredWord = new Array();
let sHiddenWord = 'WORLD'

function generateGrid(iRows, iCols, sBoardClass) {
    for (let i = 0; i < iRows; i++) {
        const rowDiv = document.createElement('div')
        rowDiv.classList = 'row row_' + i + ' d-flex justify-content-center'
        for (let j = 0; j < iCols; j++) {
            const colDiv = document.createElement('div')
            
            colDiv.classList = 'col_' + j + ' box'
            // colDiv.innerText = i + ';' + j
            rowDiv.append(colDiv)
            $('.' + sBoardClass).append(rowDiv);
        }
    }

}
function fillTheBox(data) {
    // console.log('key press [' + data.key + ']');
    let key = data.key.toUpperCase()
    if (/^[A-Z]$/.test(key)) {
        // console.log(key);
        updateCell(key);
    } else if (key === "BACKSPACE") {
        deleteLetter();
    } else if (key === "ENTER") {
        submitGuess();
    }

}
function updateCell(key) {
    if (iTryCount <= iMaxTrys && iCurrentCol < iMaxCols) {
        $('.row_' + iCurrentRow + ' .col_' + iCurrentCol).html(key)
        $('.row_' + iCurrentRow + ' .col_' + iCurrentCol).addClass('filled')
        iCurrentCol++;
        sEnteredWord.push(key);
        console.log(sEnteredWord);
        currentIndex()
    }

}

function deleteLetter() {
    if (iTryCount >= 1 && iCurrentCol > 0) {
        iCurrentCol--;
        $('.row_' + iCurrentRow + ' .col_' + iCurrentCol).html('')
        $('.row_' + iCurrentRow + ' .col_' + iCurrentCol).removeClass('filled')
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
        // fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + sGuess)
        //     .then(res => {
        //         if (!res.ok) {
        //             // throw new Error("Word not found");
        //             // alert("Word doesn't exist")
        //             return res.json();
        //         }
        //     })
        //     .then(data => console.log("Word exists:"))
        //     .catch((e) => console.log("Word does not exist", e));
        if (sEnteredWord.join('') === sHiddenWord) {
            for (let i = 0; i < iMaxCols; i++) {
                $('.row_' + iCurrentRow + ' .col_' + i).addClass('green');
            }
            // alert('You win');
        }
        else {
            if (iTryCount == iMaxTrys) {
                alert('you failed the word was : ' + sHiddenWord)
                $('.boardgame  .box').removeClass(['green', 'yellow', 'filled']);
                $('.boardgame  .box').text('');
                iCurrentRow = 0;
                iCurrentCol = 0;
                iTryCount = 1;
                return;
            } else {
                let arHiddenWord = sHiddenWord.split('')
                sEnteredWord
                    .map((value, index) => value == arHiddenWord[index] ? index : -1
                    )
                    .filter(index => index != -1)
                    .map((value, index) => {
                        $('.row_' + iCurrentRow + ' .col_' + (value)).addClass('green');
                        console.log('correct letter ' + value);
                        sEnteredWord[value] = ''
                        arHiddenWord[value] = ''
                    })
                console.log('sEnteredWord', sEnteredWord);

                sEnteredWord.findIndex((value, index) => {
                    if (value === '') return; // Skip already matched
                    const iHiddenIndex = arHiddenWord.indexOf(value);
                    console.log();
                    if (iHiddenIndex !== -1) {

                        $('.row_' + iCurrentRow + ' .col_' + (index)).addClass('yellow');
                        console.log('val', value, 'index', index);
                        sEnteredWord[index] = ''
                        arHiddenWord[iHiddenIndex] = ''
                    }
                })

                console.log("sEnteredWord :", sEnteredWord);

            }
            iTryCount++;
            iCurrentCol = 0;
            iCurrentRow++;
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
        $('.debug.row_0' + ' .col_' + j).html(sHiddenWord[j])
        console.log('.row_0' + '.col_' + j);
    }
}



generateGrid(iMaxRows, iMaxCols, 'boardgame')