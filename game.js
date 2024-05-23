'use strict';

var gBoard;
var gLevel;

const gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};

function onInit() {
    gBoard = buildBoard();
    renderBoard(gBoard);
    setMinesNegsCount(gBoard);
}

function buildBoard() {
    const board = createMat(4, 4);
    const mines = '🎃';
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j] = { type: '', gameElement: null };
        }
    }
    board[1][1].type = mines;
    board[2][3].type = mines;
    console.table('board:', board);
    return board;
}

function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '\n<tr>\n';
        for (var j = 0; j < board[i].length; j++) {
            strHTML += `\t<td><button onclick="onCellClicked(this, ${i}, ${j})">${board[i][j].type}</button></td>\n`;
        }
        strHTML += '</tr>';
    }
    console.log(strHTML);
    const elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}


function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j].type === '🎃') {
                continue;
            }
            board[i][j].minesAroundCount = countMinesAroundCell(board, i, j);
        }
    }
}

function countMinesAroundCell(board, cellI, cellJ) {
    var minesCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (board[i][j].type === '🎃') minesCount++;
        }
    }
    console.log(minesCount)
    return minesCount;
}

function onCellClicked(elButton, row, col) {
    const cell = gBoard[row][col];
    if (cell.type === '🎃') {
        elButton.innerHTML = '🎃';
        elButton.classList.add('clicked');
        alert('Game Over!');
        revealBoard();
        return;
    }

    const minesAround = cell.minesAroundCount;
    elButton.innerHTML = minesAround || '';
    elButton.classList.add('clicked');
    elButton.disabled = true;

    if (minesAround === 0) {
        revealAdjacentCells(row, col);
    }

    // gGame.shownCount++;
    checkGameOver();
}

function revealBoard() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            const cell = gBoard[i][j];
            const elButton = document.querySelector(`.board tr:nth-child(${i + 1}) td:nth-child(${j + 1}) button`);
            if (cell.type === '🎃') {
                elButton.innerHTML = '🎃';
            } else {
                elButton.innerHTML = cell.minesAroundCount || '';
            }
            elButton.disabled = true;
        }
    }
}

function revealAdjacentCells(row, col) {
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue;
            if (i === row && j === col) continue;
            const cell = gBoard[i][j];
            const elButton = document.querySelector(`.board tr:nth-child(${i + 1}) td:nth-child(${j + 1}) button`);
            if (!cell.revealed && !cell.type) {
                cell.revealed = true;
                onCellClicked(elButton, i, j);
            }
        }
    }
}
function checkGameOver() {
    if (gGame.shownCount === (gBoard.length * gBoard[0].length - 2)) { 
        alert('Congratulations! You won.');
        revealBoard();
    }
}

