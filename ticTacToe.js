// X code: &#10539;
// O code: &#79;

const gameBoard = (function() {
    const board = [];
    const gameSquares = document.querySelectorAll('.game-square');

    const render = (square) => {
        square.innerHTML = board[board.length - 1];
        console.log('board module');
        console.log(board);
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

    const _isComputer = false;

    const _toggleComputer = () => {

    }

    const getMark = () => mark;

    const changeMark = () => {
        if (mark === 'cross') mark = 'nought';
        else mark = 'cross';
    } 

    const _playRound = (square, opponent) => {
        if (mark === 'cross'){
            switch(gameBoard.board.length % 2 === 0){
                case true:
                    gameBoard.board.push('&#10539;');
                    square.classList.add(mark);
                    gameBoard.render(square);
                    break;
                case false:
                    gameBoard.board.push('&#79;');
                    square.classList.add(opponent.getMark());
                    gameBoard.render(square);
            }
        }

        else{
            switch(gameBoard.board.length % 2 === 0){
                case true:
                    gameBoard.board.push('&#10539;');
                    square.classList.add(opponent.getMark());
                    gameBoard.render(square);
                    break;
                case false:
                    gameBoard.board.push('&#79;');
                    square.classList.add(mark);
                    gameBoard.render(square);
            }
        }
    }

    const playerMove = (opponent) => {
        gameBoard.gameSquares.forEach(square => {
            square.addEventListener('click', () => {
                if (!Array.from(square.classList).includes('cross') 
                && !Array.from(square.classList).includes('nought') 
                && gameBoard.board.length < 9){
                    _playRound(square, opponent);
                    if (gameBoard.winnerCheck('cross') === 'cross') displayController.winnerDeclaration('Cross');
                    if (gameBoard.winnerCheck('nought') === 'nought') displayController.winnerDeclaration('Nought');
                }

                if (gameBoard.board.length === 9 && gameBoard.winnerCheck('cross') === undefined 
                && gameBoard.winnerCheck('nought') === undefined) displayController.drawDeclaration();  

            })
        })
    }

    return{
        playerMove,
        getMark,
        changeMark,
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
                    gameBoard.gameSquares.forEach(square => {
                        square.classList.remove('cross'); square.classList.remove('nought');
                        square.textContent = '';
                    })
                    gameBoard.board.length = 0;
                }
            })
        })
    }

    const resetGame = () => {
        _resetButton.addEventListener('click', () => {
            gameBoard.gameSquares.forEach(square => {
                square.classList.remove('cross'); square.classList.remove('nought');
                square.textContent = '';
            })
            gameBoard.board.length = 0;
        })
    }

    return{
        drawDeclaration,
        winnerDeclaration,
        swapMarks,
        resetGame,
    }

})();

const player1 = Player('cross');
const player2 = Player('nought');   
displayController.swapMarks(player1, player2);
displayController.resetGame();

player1.playerMove(player2);

