// X code: &#10539;
// O code: &#79;

const gameBoard = (function() {
    const board = [];
    const gameSquares = document.querySelectorAll('.game-square');

    const render = (square) => {
            square.innerHTML = board[board.length - 1];
    }

    return {
        render,
        board,
        gameSquares,
    };
})();

const Player = (name) => {
    const _playerName = name;

    let round = 1;

    const _roundCount = () => round++;

    const _playRound = (square) => {
        switch(round % 2 === 1){
            case true:
                gameBoard.board.push('&#10539;');
                gameBoard.render(square);
                break;
            case false:
                gameBoard.board.push('&#79;');
                gameBoard.render(square);
            }
        
    }

    const playerMove = (mark) => {
        gameBoard.gameSquares.forEach(square => {
            square.addEventListener('click', () => {
                square.classList.add(mark);
                _playRound(square);
                _roundCount();
            })
        })
    }
    
    return{
        playerMove,
    }
}

const player1 = Player('Player 1');
const player2 = Player('Player 2');

const displayController = (() => {

    const simulateGame = () => {
        
    }

    return {
        simulateGame,
    }
})();

player1.playerMove('cross');
player2.playerMove('nought');






