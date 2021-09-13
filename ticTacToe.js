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
    
    const toggleComputer = () =>  {
        _opponentMode.addEventListener('change', () => {
            _opponentMode.value === 'friend' ? isComputer = false : isComputer = true;
            displayController.resetGame();
        })
        
    }

    const getMark = () => mark;

    const changeMark = () => {
        if (mark === 'cross') mark = 'nought';
        else mark = 'cross';
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
        && gameBoard.board.length < 9){
            _playRound(square);
            if (gameBoard.winnerCheck('cross') === 'cross') displayController.winnerDeclaration('Cross');
            if (gameBoard.winnerCheck('nought') === 'nought') displayController.winnerDeclaration('Nought');
            }

            if (gameBoard.board.length === 9 && gameBoard.winnerCheck('cross') === undefined 
            && gameBoard.winnerCheck('nought') === undefined) displayController.drawDeclaration(); 
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
        let boardPlacement = Math.floor((Math.random() * 8));
        if(Array.from(gameBoard.gameSquares[boardPlacement].classList).includes('cross') 
        || Array.from(gameBoard.gameSquares[boardPlacement].classList).includes('nought')){
            computerMove();
        }
        _checkMove(gameBoard.gameSquares[boardPlacement]);
    }

    const playerVsComputer = () => {
            gameBoard.gameSquares.forEach(square => {
                square.addEventListener('click', () => {
                if (isComputer === true){
                    if (mark === 'cross'){
                        _checkMove(square);
                        computerMove()
                    }
                    else{
                        computerMove()
                        _checkMove(square);
                        console.log('hello');
                    }
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
                    resetGame();
                    if (player.getMark() === 'nought' && player.isComputer === true) player.computerMove();
                }
            })
        })
    }

    const resetGame = () => {
        gameBoard.gameSquares.forEach(square => {
            square.classList.remove('cross'); square.classList.remove('nought');
            square.textContent = '';
        })
        gameBoard.board.length = 0;
    }

    const resetListener = (player) => {
        _resetButton.addEventListener('click', () => {
            resetGame();
            if (player.getMark() === 'nought' && player.isComputer === true) player.computerMove();
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
player1.toggleComputer();
displayController.resetListener(player1);

player1.friendMode();
player1.playerVsComputer();
