const gameBoard = (function() {
    const board = ['&#10539;', '&#79;', '&#10539;', '&#79;', '&#10539;', '&#79;', '&#10539;', '&#10539;', '&#79;'];

    const render = () => {
        const gameSquares = document.querySelectorAll('.game-square');
        for (let i = 0; i < board.length; i++){
            board[i] === '&#10539;' ? gameSquares[i].classList.add = 'cross' : gameSquares[i].classList.add = 'nought'; 
            gameSquares[i].innerHTML = board[i];
        }
    }

    return {
        render,
    };
})();

const player = (name) => {
    const playerName = name;

    return{
        playerName,
    }
}

const displayController = (() => {
    const gameFlow = null;

    return {
        gameFlow,
    }
})();

gameBoard.render();
