// The direction the player wants to move.
//
// Examples:
//
// Right -> { x: 1, y: 0 }
// Left  -> { x:-1, y: 0 }
// Up    -> { x: 0, y:-1 }
// Down  -> { x: 0, y: 1 }
//
// Start:
//
// Snake is not moving.
let inputDirection = { x: 0, y: 0 };

// Stores the direction used in the LAST update.
//
// This prevents reversing directly
// into the snake's own body.
let lastInputDirection = { x: 0, y: 0 };

// Listen for every keyboard press.
window.addEventListener("keydown", (e) => {
  // e.key contains the pressed key.
  //
  // Example:
  //
  // "w"
  // "a"
  // "s"
  // "d"
  switch (e.key) {
    case "w":
      // If we're already moving vertically,
      // ignore another vertical key.
      //
      // Example:
      //
      // Moving Down
      //
      // ↓
      //
      // Press W
      //
      // ↑
      //
      // Ignore it.
      if (lastInputDirection.y !== 0) break;

      inputDirection = {
        x: 0,
        y: -1,
      };
      break;

    case "s":
      if (lastInputDirection.y !== 0) break;

      inputDirection = {
        x: 0,
        y: 1,
      };
      break;

    case "a":
      // Already moving horizontally?
      //
      // Don't allow Left or Right
      // until the snake changes axis.
      if (lastInputDirection.x !== 0) break;

      inputDirection = {
        x: -1,
        y: 0,
      };
      break;

    case "d":
      if (lastInputDirection.x !== 0) break;

      inputDirection = {
        x: 1,
        y: 0,
      };
      break;
  }
});

// Returns the current direction
// to snake.js.
export function getInputDirection() {
  // Save the direction actually used
  // during this frame.
  lastInputDirection = inputDirection;

  return inputDirection;
}
