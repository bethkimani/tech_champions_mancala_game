// Game state: 12 pits and 2 stores
let pits = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
let stores = [0, 0];
let currentPlayer = 0; // 0 for player 1, 1 for player 2

// Update the board display
function updateBoard() {
  for (let i = 0; i < 12; i++) {
    document.getElementById('p' + i).textContent = pits[i];
  }
  document.getElementById('store1').textContent = stores[0];
  document.getElementById('store2').textContent = stores[1];
}

// Player makes a move
function moveStones(pitIndex) {
  // (Include the full logic for moving stones here)
}

// (Include other necessary functions here)

// Add event listeners to the pits
for (let i = 0; i < 12; i++) {
  document.getElementById('p' + i).addEventListener('click', function () {
    if ((currentPlayer === 0 && i < 6) || (currentPlayer === 1 && i >= 6)) {
      moveStones(i);
    }
  });
}

updateBoard(); // Initial update
