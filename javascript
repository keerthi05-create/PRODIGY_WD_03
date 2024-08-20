// script.js
const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';

const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal
    [2, 4, 6]  // Diagonal
];

function checkWinner() {
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (cells[a].classList.contains(currentPlayer) &&
            cells[b].classList.contains(currentPlayer) &&
            cells[c].classList.contains(currentPlayer)) {
            return currentPlayer;
        }
    }
    return [...cells].every(cell => cell.classList.contains('X') || cell.classList.contains('O')) ? 'Draw' : null;
}

function handleClick(event) {
    const cell = event.target;
    if (!cell.classList.contains('X') && !cell.classList.contains('O')) {
        cell.classList.add(currentPlayer);
        const winner = checkWinner();
        if (winner) {
            status.textContent = winner === 'Draw' ? 'It\'s a Draw!' : `${winner} Wins!`;
            cells.forEach(cell => cell.removeEventListener('click', handleClick));
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `${currentPlayer}'s Turn`;
        }
    }
}

function resetGame() {
    cells.forEach(cell => {
        cell.classList.remove('X', 'O');
        cell.addEventListener('click', handleClick);
    });
    currentPlayer = 'X';
    status.textContent = "X's Turn";
}

resetButton.addEventListener('click', resetGame);

board.addEventListener('click', handleClick);

resetGame();
