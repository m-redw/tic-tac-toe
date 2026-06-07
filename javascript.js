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

    const getCell = (x, y) => gameboard[x-1][y-1];

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
    const player1 = prompt('Enter Player 1 name:');
    const player2 = prompt('Enter Player 2 name:');
    let whosTurn = player1;

    const getPlayerNames = () => `${player1} vs ${player2}`;
    const getWhosTurns = () => whosTurn;

    const playRound = (x, y) => {
        if (whosTurn === player1) {
            const filled = gameboard.fillCell(x, y, 'x');
            if (filled) whosTurn = player2;
        } else {
            const filled = gameboard.fillCell(x, y, 'o');
            if (filled) whosTurn = player1;
        }
    };

    return {getPlayerNames, getWhosTurns, playRound};
})();