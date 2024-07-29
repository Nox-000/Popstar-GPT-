document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const rows = 10;
    const cols = 10;
    const colors = ['#ff6b6b', '#48dbfb', '#1dd1a1', '#feca57', '#5f27cd'];
    let gameState = [];

    function initBoard() {
        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < cols; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener('click', handleCellClick);
                board.appendChild(cell);
                row.push(cell);
            }
            gameState.push(row);
        }
    }

    function handleCellClick(e) {
        const cell = e.target;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const color = cell.style.backgroundColor;
        const toClear = [];

        function dfs(r, c) {
            if (r < 0 || r >= rows || c < 0 || c >= cols) return;
            const targetCell = gameState[r][c];
            if (targetCell.style.backgroundColor !== color || targetCell.classList.contains('empty')) return;
            toClear.push(targetCell);
            targetCell.classList.add('empty');
            dfs(r + 1, c);
            dfs(r - 1, c);
            dfs(r, c + 1);
            dfs(r, c - 1);
        }

        dfs(row, col);

        if (toClear.length > 1) {
            toClear.forEach(cell => {
                cell.style.backgroundColor = 'transparent';
            });
        } else {
            toClear.forEach(cell => {
                cell.classList.remove('empty');
            });
        }

        dropCells();
    }

    function dropCells() {
        for (let c = 0; c < cols; c++) {
            let emptyCells = [];
            for (let r = rows - 1; r >= 0; r--) {
                const cell = gameState[r][c];
                if (cell.classList.contains('empty')) {
                    emptyCells.push(cell);
                } else if (emptyCells.length > 0) {
                    const targetCell = emptyCells.shift();
                    targetCell.classList.remove('empty');
                    targetCell.style.backgroundColor = cell.style.backgroundColor;
                    cell.classList.add('empty');
                    cell.style.backgroundColor = 'transparent';
                    emptyCells.push(cell);
                }
            }
        }
    }

    initBoard();
});