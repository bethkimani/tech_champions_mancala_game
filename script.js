document.addEventListener('DOMContentLoaded', function () {
    // Game state: 12 pits and 2 stores
    let pits = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
    let stores = [0, 0];
    let currentPlayer = 0; // 0 for player 1, 1 for player 2
  
    // Update the board display
    function updateBoard() {
      // Update the pits based on their IDs
      for (let i = 0; i < 6; i++) {
        document.getElementById('p1-pocket' + (i + 1)).textContent = pits[i]; // Player 1's pockets
        document.getElementById('p2-pocket' + (6 - i)).textContent = pits[i + 6]; // Player 2's pockets
      }
      document.getElementById('store1').textContent = stores[0]; // Player 1's store
      document.getElementById('store2').textContent = stores[1]; // Player 2's store
    }
  
    // Player makes a move
    function moveStones(pitIndex) {
      let stones = pits[pitIndex];
      if (stones === 0) return; // Cannot move if pit is empty
      pits[pitIndex] = 0;
      let currentIndex = pitIndex;
  
      // Distribute stones to the next pits
      while (stones > 0) {
        currentIndex = (currentIndex + 1) % 12; // Move to the next pit
        pits[currentIndex]++;
        stones--;
      }
  
      // Capture rule: If you end in an empty pit on your side, capture the stones opposite
      if (currentPlayer === 0 && currentIndex < 6 && pits[currentIndex] === 1) {
        let oppositePit = 11 - currentIndex;
        stores[0] += pits[oppositePit] + 1; // Add captured stones and the one in the current pit
        pits[oppositePit] = 0;
        pits[currentIndex] = 0;
      } else if (currentPlayer === 1 && currentIndex >= 6 && pits[currentIndex] === 1) {
        let oppositePit = 11 - currentIndex;
        stores[1] += pits[oppositePit] + 1; // Add captured stones and the one in the current pit
        pits[oppositePit] = 0;
        pits[currentIndex] = 0;
      }
  
      // Check for extra turn if you end in your store
      if (currentPlayer === 0 && currentIndex === 5) {
        alert("Player 1 gets an extra turn!");
        return;
      } else if (currentPlayer === 1 && currentIndex === 11) {
        alert("Player 2 gets an extra turn!");
        return;
      }
  
      // Check for end game
      if (checkEndGame()) {
        declareWinner();
      } else {
        switchPlayer();
      }
  
      updateBoard();
    }
  
    // Switch players after a move
    function switchPlayer() {
      currentPlayer = currentPlayer === 0 ? 1 : 0;
      alert("Player " + (currentPlayer + 1) + "'s turn");
    }
  
    // Check if the game has ended (when all pits on one side are empty)
    function checkEndGame() {
      let player1Empty = pits.slice(0, 6).every(pit => pit === 0);
      let player2Empty = pits.slice(6).every(pit => pit === 0);
      return player1Empty || player2Empty;
    }
  
    // Declare the winner based on the number of stones in the stores
    function declareWinner() {
      alert("Game Over!");
      let player1Score = stores[0] + pits.slice(0, 6).reduce((a, b) => a + b, 0);
      let player2Score = stores[1] + pits.slice(6).reduce((a, b) => a + b, 0);
  
      if (player1Score > player2Score) {
        alert("Player 1 Wins!");
      } else if (player1Score < player2Score) {
        alert("Player 2 Wins!");
      } else {
        alert("It's a Tie!");
      }
  
      // Reset the game after declaring the winner
      resetGame();
    }
  
    // Reset the game
    function resetGame() {
      pits = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
      stores = [0, 0];
      currentPlayer = 0;
      updateBoard();
    }
  
    // Add event listeners to the pits
    for (let i = 0; i < 6; i++) {
      document.getElementById('p1-pocket' + (i + 1)).addEventListener('click', function () {
        if (currentPlayer === 0) {
          moveStones(i);
        }
      });
      
      document.getElementById('p2-pocket' + (6 - i)).addEventListener('click', function () {
        if (currentPlayer === 1) {
          moveStones(i + 6);
        }
      });
    }
  
    updateBoard(); // Initial update
  });
  