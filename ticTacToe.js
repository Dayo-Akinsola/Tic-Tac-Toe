// X code: &#10539;
// O code: &#79;

const gameBoard = (function() {
    const board = [];
    const gameSquares = document.querySelectorAll('.game-square');

    const render = () => {
        for (let i = 0; i < board.length; i++){
            board[i] === '&#10539;' ? gameSquares[i].classList.add = 'cross' : gameSquares[i].classList.add = 'nought'; 
            gameSquares[i].innerHTML = board[i];
        }
    }

    return {
        render,
        board,
        gameSquares,
    };
})();

const player = (name) => {
    const _playerName = name;

    const playerMove = () => {
        gameBoard.board.push('X');
        console.log(gameBoard.board);
    }
    
    return{
        playerMove,
    }
}

const displayController = (() => {
    const gameFlow = null;

    return {
        gameFlow,
    }
})();


const player1 = player('Player 1');
player1.playerMove();
gameBoard.render();
