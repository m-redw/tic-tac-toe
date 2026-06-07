function initBoard(board) {
    // Make 2D array for board (3x3)
    // all cells init to empty
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(cell());
        }
    }
}

const cell = function() {
    let value = 'empty';

    const getValue = () => value;
    const markCell = (marker) => {
        value = marker; // x or o determiend by player
    };

    return {getValue, markCell};
};

// There should only be 1 gameboard, so use IIFE
const gameboard = (function() {
    const board = [];
    initBoard(board);
    
    const printBoard = () => {
        const niceBoard = [];
        for (let i = 0; i < 3; i++) {
            niceBoard[i] = [];
            for (let j = 0; j < 3; j++) {
                niceBoard[i].push(board[i][j].getValue());
            }
        }
        return niceBoard;
    };

    const getCell = (x, y) => board[x-1][y-1].getValue();

    const fillCell = (x, y, marker) => {
        const cell = board[x-1][y-1];
        if (cell.getValue() != 'empty') {
            alert('Cell already full! Choose another.')
            return false;
        }
        cell.markCell(marker);
        return true;
    };

    return {printBoard, getCell, fillCell};
})();

const gameManager = (function() {
    const player1 = prompt('Enter Player 1 name:', 'Player 1');
    const player2 = prompt('Enter Player 2 name:', 'Player 2');
    let whosTurn = player1;
    let canPlay = true;

    const getPlayerNames = () => `${player1} vs ${player2}`;
    const getWhosTurns = () => whosTurn;

    const checkWinner = (marker) => {
        // columns and rows
        for (let i = 1; i < 4; i++) {
            if (gameboard.getCell(i,1) === marker && gameboard.getCell(i, 1) === gameboard.getCell(i,2) && gameboard.getCell(i,2) === gameboard.getCell(i,3)) {
                return marker;
            } else if (gameboard.getCell(1,i) === marker && gameboard.getCell(1, i) === gameboard.getCell(2,i) && gameboard.getCell(2,i) === gameboard.getCell(3,i)) {
                return marker;
            }
        }

        // diagnols
        if (gameboard.getCell(1,1) === marker && gameboard.getCell(1, 1) === gameboard.getCell(2,2) && gameboard.getCell(2,2) === gameboard.getCell(3,3)) {
            return marker;
        } else if (gameboard.getCell(1,3) === marker && gameboard.getCell(1, 3) === gameboard.getCell(2,2) && gameboard.getCell(2,2) === gameboard.getCell(3,1)) {
            return marker;
        }

        return 'no winner';
    };

    const switchTurn = () => {
        whosTurn = (whosTurn === player1) ? player2 : player1;
    }

    const playRound = (x, y) => {
        if (canPlay) {
            const marker = (whosTurn === player1) ? 'x' : 'o';

            const filled = gameboard.fillCell(x, y, marker);
            if (filled) {
                const winner = checkWinner(marker);
                if (winner === 'x') {
                    canPlay = false;
                    endGame(player1);
                } else if (winner === 'o') {
                    canPlay = false;
                    endGame(player2);
                } 
                switchTurn();
            }
        }
    };

    const endGame = (player) => {
        displayManager.displayWinner(player);
    };

    const getPlayStatus = () => canPlay;

    return {getPlayerNames, getWhosTurns, playRound, getPlayStatus};
})();

const displayManager = (function() {
    const rows = document.querySelectorAll('.rows');
    
    const initButtons = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('button');
                cell.textContent = gameboard.getCell(i+1, j+1);

                cell.type = 'button';
                cell.addEventListener('click', ()=>{
                    if (gameManager.getPlayStatus() === true) {
                        cell.disabled = true;
                        gameManager.playRound(i+1, j+1);
                        cell.textContent = gameboard.getCell(i+1, j+1);
                    }
                });
                
                rows[i].appendChild(cell);
            }
        }
    };

    const displayWinner = (winner) => {
        const body = document.querySelector('body');
        const winnerText = document.createElement('h2');
        winnerText.textContent = `Congradulations ${winner}! You won!`;
        body.appendChild(winnerText);
    };

    return {initButtons, displayWinner}
})();

displayManager.initButtons();