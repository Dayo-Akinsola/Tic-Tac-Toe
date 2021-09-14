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

        else if (board.length === 9) return 'draw';
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

            if (gameBoard.winnerCheck(mark) === 'draw') {
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
        let boardPlacement; 
        _opponentMode.value === 'extreme' ? boardPlacement = 0 : boardPlacement = Math.floor((Math.random() * 9));
        if(_isSquareFilled(boardPlacement) === true && gameOver === false){
            computerMove();
        }

        _checkMove(gameBoard.gameSquares[boardPlacement]);
    }

    const playerVsEasy = () => {
        gameBoard.gameSquares.forEach(square => {
            square.addEventListener('click', () => {
            if (isComputer === true 
                && gameOver === false
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

    const _extremeMoveO = () => {
        let bestScore = -Infinity;
        let bestMove;

        for (let i = 0; i < Array.from(gameBoard.gameSquares).length ; i++){
            if (!_isSquareFilled(i) && gameOver === false){
                gameBoard.gameSquares[i].classList.add('cross');
                gameBoard.board.push('&#10539;');

                let value = _miniMax(gameBoard.gameSquares, 0, false);

                gameBoard.gameSquares[i].classList.remove('cross');
                gameBoard.board.pop();

                if (value > bestScore){
                    bestScore = value;
                    bestMove = i;
                }
            }
        }

        _checkMove(gameBoard.gameSquares[bestMove]);
    }

    const _extremeMoveX = () => {
        let bestScore = Infinity;
        let bestMove;

        for (let i = 0; i < Array.from(gameBoard.gameSquares).length ; i++){
            if (!_isSquareFilled(i) && gameOver === false){
                gameBoard.gameSquares[i].classList.add('nought');
                gameBoard.board.push('&#79;');

                let value = _miniMax(gameBoard.gameSquares, 0, true);

                gameBoard.gameSquares[i].classList.remove('nought');
                gameBoard.board.pop();

                if (value < bestScore){
                    bestScore = value;
                    bestMove = i;
                }
            }
        }

        _checkMove(gameBoard.gameSquares[bestMove]);
    }
    
    //If statements handle the computer's first move so there is less work to do in the miniMax algorithm
    const _extremeFirstMoveX = () => {
        if (_isSquareFilled(0) || _isSquareFilled(2) || _isSquareFilled(6) || _isSquareFilled(8))
            _checkMove(gameBoard.gameSquares[4]);

        else if ( _isSquareFilled(5) || _isSquareFilled(7)) _checkMove(gameBoard.gameSquares[8]);

        else if (_isSquareFilled(1)) _checkMove(gameBoard.gameSquares[2]);

        else if (_isSquareFilled(3)) _checkMove(gameBoard.gameSquares[6]);

        else if (_isSquareFilled(4)) _checkMove(gameBoard.gameSquares[0]);
    }

    const _extremeFirstMoveO = () => {
        if (_isSquareFilled(5) || _isSquareFilled(8) || _isSquareFilled(7)) 
            _checkMove(gameBoard.gameSquares[2]);

        else if ( _isSquareFilled(3) || _isSquareFilled(6) || _isSquareFilled(4)) 
            _checkMove(gameBoard.gameSquares[1]);
        
        else if (_isSquareFilled(1) || _isSquareFilled(2)) _checkMove(gameBoard.gameSquares[3]);

    }

    const playerVsExtreme = () => {
        gameBoard.gameSquares.forEach(square => {
            square.addEventListener('click', () => {
                if (isComputer === true && _opponentMode.value === 'extreme' 
                && _isSquareFilled(Array.from(gameBoard.gameSquares).indexOf(square)) === false
                && gameOver === false){
                   if (mark === 'cross'){
                        _checkMove(square);
                        if (gameBoard.board.length === 1) _extremeFirstMoveX();
                        else if (gameBoard.board.length < 9) _extremeMoveX();
                   }

                   else{
                        _checkMove(square);
                        if (gameBoard.board.length === 2) _extremeFirstMoveO();
                        else if (gameBoard.board.length < 9) _extremeMoveO();
                   }
                }
            })
        })
    }

    // Used to score the outcomes of the miniMax algorithm
    let _positionEval = {
        'cross': 1,
        'nought': -1,
        'draw': 0,
    };


    const _miniMax = (position, depth, maximizingPlayer)=> {
        let result;
        if (gameBoard.winnerCheck('cross') === 'cross') result = 'cross';
        else if (gameBoard.winnerCheck('nought') === 'nought') result = 'nought';
        else if (gameBoard.board.length === 9) result = 'draw';
        else result = undefined;

        if (result !== undefined || depth === -1){
            return _positionEval[result];
        }

        if (maximizingPlayer){
            let maxEval = -Infinity;
            for (let i = 0; i < Array.from(gameBoard.gameSquares).length; i++){
                if (!_isSquareFilled(i)){
                    gameBoard.board.push('&#10539;');
                    gameBoard.gameSquares[i].classList.add('cross');

                    let value = _miniMax(gameBoard.gameSquares , depth + 1, false);
                    maxEval = Math.max(maxEval, value);

                    gameBoard.gameSquares[i].classList.remove('cross');
                    gameBoard.board.pop();

                }
            }
            return maxEval;
        }

        else{
            let minEval = Infinity;
            for (let i = 0; i < Array.from(gameBoard.gameSquares).length; i++){
                if (!_isSquareFilled(i)){
                    gameBoard.board.push('&#79;');
                    gameBoard.gameSquares[i].classList.add('nought');

                    let value = _miniMax(gameBoard.gameSquares, depth + 1, true);
                    minEval = Math.min(minEval, value);

                    gameBoard.gameSquares[i].classList.remove('nought');
                    gameBoard.board.pop();


                }
            }
            return minEval;
        }
        
    }

    return{
        friendMode,
        getMark,
        changeMark,
        toggleComputer,
        playerVsEasy,
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
                    if (player.getMark() === 'nought' && document.querySelector('select').value !== 'friend') {
                        player.computerMove();
                    }

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
player1.playerVsEasy();
player1.playerVsExtreme();
