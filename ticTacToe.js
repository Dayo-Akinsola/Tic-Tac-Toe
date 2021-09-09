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

const Player = (mark) => {

    const getMark = () => mark;
    
    let round = 1;

    const _roundCount = () => round++;

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
                if (!Array.from(square.classList).includes('cross') && !Array.from(square.classList).includes('nought')){
                    _playRound(square, opponent);
                    _roundCount();
                }
            })
        })
    }
    
    return{
        playerMove,
        round,
        getMark,
    }
}

const player1 = Player('cross');
const player2 = Player('nought');

const displayController = (() => {

    const simulateGame = () => {
    }

    return {
        simulateGame,
    }
})();

player1.playerMove(player2);



