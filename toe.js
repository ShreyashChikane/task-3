const board = document.getElementById('board');
const tiles = Array.from(board.children);
const turn = document.getElementById('turn');
const result = document.getElementById('result');
const restart = document.getElementById('restart');

let currentPlayer = 'X';
let isGameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

const checkWin = (player) => {
	for (let i = 0; i < winningConditions.length; i++) {
		const [a, b, c] = winningConditions[i];
		if (boardState[a] === player && boardState[b] === player && boardState[c] === player) {
			return true;
		}
	}
	return false;
};

const handleTileClick = (e) => {
	if (!isGameActive) return;

	const tileIndex = tiles.indexOf(e.target);
	if (boardState[tileIndex] !== '') return;

	boardState[tileIndex] = currentPlayer;
	e.target.textContent = currentPlayer;

	if (checkWin(currentPlayer)) {
		result.textContent = `${currentPlayer} wins!`;
		isGameActive = false;
	} else if (boardState.every(tile => tile !== '')) {
		result.textContent = 'It\'s a tie!';
		isGameActive = false;
	} else {
		currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
		turn.textContent = `${currentPlayer}'s turn`;
	}
};

tiles.forEach(tile => tile.addEventListener('click', handleTileClick));

restart.addEventListener('click', () => {
	currentPlayer = 'X';
	isGameActive = true;
	boardState = ['', '', '', '', '', '', '', '', ''];
	tiles.forEach(tile => tile.textContent = '');
	turn.textContent = `${currentPlayer}'s turn`;
	result.textContent = '';
});

