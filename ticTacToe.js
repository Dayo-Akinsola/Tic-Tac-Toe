// X code: &#10539;
// O code: &#79;

const gameBoard = (function() {
    const board = [];
    const gameSquares = document.querySelectorAll('.game-square');

    const render = (square) => {
        square.innerHTML = board[board.length - 1];
    }


    // These functions check if there are three noughts or crosses in a row.
    const _vertWinnerCheck = (mark) => {
        for (let i = 0; i < 3; i ++){
            if (Array.from(gameSquares[i].classList).includes(mark) 
            && Array.from(gameSquares[i + 3].classList).includes(mark) 
            && Array.from(gameSquares[i + 6].classList).includes(mark)){
                return mark;
            }
        }
    }

    const _horWinnerCheck = (mark) => {
        for (let i = 0; i < 9; i += 3){
            if(Array.from(gameSquares[i].classList).includes(mark) 
            && Array.from(gameSquares[i + 1].classList).includes(mark) 
            && Array.from(gameSquares[i + 2].classList).includes(mark)){
                return mark;
            }
        }
    }

    const _diagWinnerCheck = (mark) => {
        if (Array.from(gameSquares[0].classList).includes(mark) 
        && Array.from(gameSquares[4].classList).includes(mark) 
        && Array.from(gameSquares[8].classList).includes(mark)){
            return mark;
        }

        else if (Array.from(gameSquares[2].classList).includes(mark) 
        && Array.from(gameSquares[4].classList).includes(mark) 
        && Array.from(gameSquares[6].classList).includes(mark)){
            return mark;
        } 
    }

    const winnerCheck = (mark) => {
        if (_vertWinnerCheck(mark) === mark 
        || _horWinnerCheck(mark) === mark 
        || _diagWinnerCheck(mark) === mark){
            return mark;
        }
    }

    return {
        render,
        board,
        gameSquares,
        winnerCheck,
    };
})();

const Player = (mark) => {

    const _opponentMode = document.querySelector('select');

    let isComputer = true;

    let gameOver = false;

    const minMax = (position, depth, maximizingPlayer) => {
        if (depth === 0) return position;

        if (maximizingPlayer){
            let maxEval = -Infinity;
            for (let i = 0; i < Array.from(gameBoard.gameSquares).length; i++){
                if (!_isSquareFilled(i)){
                    let eva = minMax(i, depth - 1, true)
                    maxEval = Math.max(maxEval, eva);
                }
            }
            return maxEval;
        }

        else{
            let minEval = Infinity;
            for (let i = 0; Array.from(gameBoard.gameSquares.length); i++){
                if (!_isSquareFilled(i)){
                    let eva = minMax(i, depth - 1, false);
                    minEval = Math.max(minEval, eva); 
                }
            }
            return minEval;
        }
        
    }

    const restart = () => gameOver = false;
    
    const toggleComputer = (player) =>  {
        _opponentMode.addEventListener('change', () => {
            _opponentMode.value === 'friend' ? isComputer = false : isComputer = true;
            displayController.resetGame(player);
            if (isComputer === true && mark === 'nought') computerMove();
        })
        
    }

    const getMark = () => mark;

    const changeMark = () => {
        if (mark === 'cross') mark = 'nought';
        else mark = 'cross';
    } 
    
    //Checks if a square already has a nought or cross in it.
    const _isSquareFilled = (squareIndex) =>{
        if(Array.from(gameBoard.gameSquares[squareIndex].classList).includes('cross') 
        || Array.from(gameBoard.gameSquares[squareIndex].classList).includes('nought')){
            return true;
        }

        return false;
    }

    const _playRound = (square) => {
            switch(gameBoard.board.length % 2 === 0){
                case true:
                    gameBoard.board.push('&#10539;');
                    square.classList.add('cross');
                    gameBoard.render(square);
                    break;
                case false:
                    gameBoard.board.push('&#79;');
                    square.classList.add('nought');
                    gameBoard.render(square);
            }
        
    }

    // Checks if a player has won or if there is a draw after a move has been made.
    const _checkMove = (square) => {
        if (!Array.from(square.classList).includes('cross') 
        && !Array.from(square.classList).includes('nought') 
        && gameBoard.board.length < 9
        && gameOver === false){
            _playRound(square);
            if (gameBoard.winnerCheck('cross') === 'cross') {
                displayController.winnerDeclaration('Cross');
                gameOver = true;
            }
            if (gameBoard.winnerCheck('nought') === 'nought') {
                displayController.winnerDeclaration('Nought');
                gameOver = true;
            }
        }

            if (gameBoard.board.length === 9 && gameBoard.winnerCheck('cross') === undefined 
            && gameBoard.winnerCheck('nought') === undefined) {
                displayController.drawDeclaration(); 
                gameOver = true;
            }
    }

    const friendMode = () => {
        gameBoard.gameSquares.forEach(square => {
            square.addEventListener('click', () => {
                if (isComputer === false) _checkMove(square);
            })
        })
    }

    const computerMove = () => {
        // picks random square on game grid if the the square has already been used the computer picks another one
        let boardPlacement = Math.floor((Math.random() * 9));
        console.log(boardPlacement);
        if(_isSquareFilled(boardPlacement) === true && gameOver === false){
            computerMove();
        }

        _checkMove(gameBoard.gameSquares[boardPlacement]);
    }

    const playerVsComputer = () => {
        gameBoard.gameSquares.forEach(square => {
            square.addEventListener('click', () => {
            if (isComputer === true 
                && _isSquareFilled(Array.from(gameBoard.gameSquares).indexOf(square)) === false 
                && _opponentMode.value === 'easy' || _opponentMode.value === 'medium'){
                if (mark === 'cross'){
                    _checkMove(square);
                    computerMove();
                }
                else{
                    _checkMove(square);
                    computerMove();
                }
                }    
            })
        })
    }

    const playerVsExtreme = () => {
        gameBoard.gameSquares.forEach(square => {
            square.addEventListener('click', () => {
                if (isComputer === true && _opponentMode.value === 'extreme'){
                    _checkMove(square);
                    let computerPlayIndex = minMax(4, 4, true);
                    _checkMove(gameBoard.gameSquares[computerPlayIndex]);
                }
            })
        })
    }

    return{
        friendMode,
        getMark,
        changeMark,
        toggleComputer,
        playerVsComputer,
        isComputer,
        computerMove,
        restart,
        playerVsExtreme,
    }
}

const displayController = (() => {
    
    const _resetButton = document.querySelector('.reset-button');
    const _result = document.querySelector('.result');
    const _markButtons = document.querySelectorAll('.XO-button');

    const drawDeclaration = () => {
        _result.textContent = "It is a draw!";
    }

    const winnerDeclaration = (mark) => {
        _result.textContent = `${mark} is the winner!`;
    }

    const swapMarks = (player, opponent) => {
        _markButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Applies .clicked css settings to a mark button when clicked and applies the settings to
                // the opposite mark on the other side.
                if (!Array.from(button.classList).includes('clicked')){
                    _markButtons.forEach(button => button.classList.remove('clicked'));
                    button.classList.add('clicked');
                    if (button === _markButtons[0]) _markButtons[3].classList.add('clicked');
                    else if (button === _markButtons[1]) _markButtons[2].classList.add('clicked');
                    else if (button === _markButtons[2]) _markButtons[1].classList.add('clicked');
                    else if (button === _markButtons[3]) _markButtons[0].classList.add('clicked');

                    player.changeMark();
                    opponent.changeMark();
                    resetGame(player);
                    if (player.getMark() === 'nought' 
                    && document.querySelector('select').value !== 'friend') 
                    player.computerMove();

                }
            })
        })
    }

    const resetGame = (player) => {
        gameBoard.gameSquares.forEach(square => {
            square.classList.remove('cross'); square.classList.remove('nought');
            square.textContent = '';
        })
        player.restart();
        gameBoard.board.length = 0;
    }

    const resetListener = (player) => {
        _resetButton.addEventListener('click', () => {
            resetGame(player);
            if (player.getMark() === 'nought' 
            && document.querySelector('select').value !== 'friend') 
            player.computerMove();
        })
    }

    return{
        drawDeclaration,
        winnerDeclaration,
        swapMarks,
        resetGame,
        resetListener,
    }

})();

const player1 = Player('cross');
const player2 = Player('nought');   
displayController.swapMarks(player1, player2);
player1.toggleComputer(player1);
displayController.resetListener(player1);

player1.friendMode();
player1.playerVsComputer();
player1.playerVsExtreme();
