const gameBoard = (function() {
    const board = ['X', 'O', 'X', 'O'];

    const render = () => {
        const gameSquares = document.querySelectorAll('.game-square');
        for (let i in board.length){
            console.log('hello');
            gameSquares[i].textContent = board[i];
            console.log(gameSquares[i]);
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
