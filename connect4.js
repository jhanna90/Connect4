/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */


const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  const arr = [];
  for (let y = 0; y < HEIGHT; y++) {
    arr[y] = null;
    // board.push(Array.from({ length: WIDTH }))
  }
  for (let i = 0; i < HEIGHT; i++) {
    board[i] = [...arr];
  }
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const htmlboard = document.getElementById("board");
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"

  // Clickable area for players to play their piece.
  const top = document.createElement("tr");
  top.setAttribute("id", "click-column");
  // adding click event
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    // creating top row of cells
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    // append to top row
    top.append(headCell);
  }
  // append to top of board
  htmlboard.append(top);

  // main board 
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlboard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
  // TODO: write the real version of this, rather than always returning 0

}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  piece.style.top = -50 * (y + 2);
  const position = document.getElementById(`${y}-${x}`);
  position.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} wins!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie')
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  };

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      //to win horizontally, all y's are the same
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      //to win vertically, all x's are the same
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      // to win diag to the right, x's and y's are all plus 1 every step
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      //to win diag to the left, x's subtract 1 every step and y's plus 1 every step
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      //one way winning is a win
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
  // nobody wins
  return false;
}

makeBoard();
makeHtmlBoard();
