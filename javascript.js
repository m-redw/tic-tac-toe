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

    return {printBoard};
})();