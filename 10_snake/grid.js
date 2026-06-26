// ----------------------------------------------------
// The game board is a 36 × 36 grid.
//
// Coordinates start at 1 instead of 0.
//
// (1,1) ------------------> x
//   |
//   |
//   |
//   ▼
//   y
//
// Bottom-right corner:
//
// (36,36)
// ----------------------------------------------------
const GRID_SIZE = 36;

// ----------------------------------------------------
// Generates a random position inside the grid.
//
// Example:
//
// x = 15
// y = 8
//
// Returns:
//
// {
//   x: 15,
//   y: 8
// }
// ----------------------------------------------------
export function randomGridPosition() {
  return {
    // Math.random()
    //
    // Generates a decimal number
    // between 0 and 1.
    //
    // Example:
    //
    // 0.273
    // 0.914
    // 0.105
    x: Math.floor(Math.random() * GRID_SIZE) + 1,

    y: Math.floor(Math.random() * GRID_SIZE) + 1,
  };
}

// ----------------------------------------------------
// Checks whether a position has left the game board.
//
// Returns:
//
// true  -> outside
// false -> still inside
// ----------------------------------------------------
export function outsideGrid(position) {
  return (
    // Too far left.
    position.x < 1 ||
    // Too far right.
    position.x > GRID_SIZE ||
    // Above the board.
    position.y < 1 ||
    // Below the board.
    position.y > GRID_SIZE
  );
}
