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

    const getMark = () => mark;
    
    let round = 1;

    const _roundCount = () => {
        round++;
        return round;
    }

    const _playRound = (square, opponent) => {
        switch(round % 2 === 1){
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

    const playerMove = (opponent) => {
        gameBoard.gameSquares.forEach(square => {
            square.addEventListener('click', () => {
                if (!Array.from(square.classList).includes('cross') && !Array.from(square.classList).includes('nought') && round <=9){
                    _playRound(square, opponent);
                    _roundCount();

                    if (gameBoard.winnerCheck('cross') === 'cross') displayController.winnerDeclaration('Cross');
                    if (gameBoard.winnerCheck('nought') === 'nought') displayController.winnerDeclaration('Nought');
                    
                }

                if (round === 10 && gameBoard.winnerCheck(mark) === undefined) displayController.drawDeclaration();  
            })
        })
    }
    
    return{
        playerMove,
        round,
        getMark,
    }
}

const displayController = (() => {
    
    const _result = document.querySelector('.result');

    const drawDeclaration = () => {
        _result.textContent = "It is a draw!";
    }

    const winnerDeclaration = (mark) => {
        _result.textContent = `${mark} is the winner!`;
    }

    return{
        drawDeclaration,
        winnerDeclaration,
    }

})();

const player1 = Player('cross');
const player2 = Player('nought');   

player1.playerMove(player2);

