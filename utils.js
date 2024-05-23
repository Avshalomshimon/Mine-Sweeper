'use strict'

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createMat(ROWS, COLS) {
    const mat = []
    for (var i = 0; i < ROWS; i++) {
        const row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function findEmptyPos() {
	// var emptyPoss = [{i:0,j:0},{i:0,j:1}]
	var emptyPoss = []

	for (var i = 0; i < gBoard.length; i++) {
		for (var j = 0; j < gBoard.length; j++) {
			var cell = gBoard[i][j]
			if (!cell.gameElement && cell.type === 'FLOOR') {
				// console.log('cell:', cell)
				var pos = { i: i, j: j }
				emptyPoss.push(pos)
			}
		}
	}
	// console.log('emptyPoss:', emptyPoss)
	var randIdx = getRandomInt(0, emptyPoss.length) // 0 , 1
	// console.log('randIdx:', randIdx)
	var randPos = emptyPoss[randIdx] //{}
	// console.log('randPos:', randPos)
	return randPos
}
function getRandomInt(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}
