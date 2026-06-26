import {
  SNAKE_SPEED,
  update as updateSnake,
  draw as drawSnake,
  getSnakeHead,
  snakeIntersection,
} from "./snake.js";

import { update as updateFood, draw as drawFood } from "./food.js";

import { outsideGrid } from "./grid.js";

// Stores the timestamp of the previous frame.
// Used for calculating delta time.
let lastRenderTime = 0;

// Determines whether the game has ended.
let gameOver = false;

// The HTML element where everything is drawn.
const gameBoard = document.getElementById("game-board");

function main(currentTime) {
  // ---------------- GAME OVER ----------------
  //
  // Once gameOver becomes true,
  // stop updating the game.
  //
  // Browser
  //    |
  //    V
  // main()
  //    |
  // gameOver?
  //    |
  //   Yes
  //    |
  // Restart?
  //
  if (gameOver) {
    if (confirm("You lost. Press OK to restart")) {
      window.location.reload();
    }
    return;
  }

  // -------------------------------------------------
  // requestAnimationFrame creates the GAME LOOP.
  //
  // Browser
  //     |
  //     V
  // main()
  //     |
  // update()
  // draw()
  //     |
  // requestAnimationFrame(main)
  //     |
  // main()
  //     |
  // update()
  // draw()
  //
  // This repeats roughly 60 times every second.
  // -------------------------------------------------
  window.requestAnimationFrame(main);

  // -------------------------------------------------
  // Delta Time
  //
  // Example:
  //
  // Previous Frame = 1000 ms
  // Current  Frame = 1016 ms
  //
  // Difference:
  //
  // 16 ms
  //
  // Convert milliseconds into seconds.
  //
  // 16 / 1000
  // = 0.016
  //
  // Using time instead of frames makes the game
  // run at the same speed on fast and slow PCs.
  // -------------------------------------------------
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

  // -------------------------------------------------
  // Suppose the snake speed is:
  //
  // 10 moves every second
  //
  // Then:
  //
  // 1 / 10
  // = 0.1 seconds
  //
  // If only 0.05 seconds passed,
  // don't update yet.
  //
  // Wait until enough time has passed.
  //
  // Timeline
  //
  // 0.00
  // 0.05 ❌
  // 0.10 ✅ Move
  // 0.20 ✅ Move
  // -------------------------------------------------
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  // Save the current timestamp.
  // Next frame will compare against this.
  lastRenderTime = currentTime;

  // -------------------------------------------------
  // UPDATE
  //
  // Update changes the GAME STATE.
  //
  // Nothing is drawn yet.
  //
  // Snake Position
  // Food Position
  // Game Over?
  //
  // All calculations happen here.
  // -------------------------------------------------
  update();

  // -------------------------------------------------
  // DRAW
  //
  // After updating the game state,
  // render everything on the screen.
  //
  // Game State
  //      |
  //      V
  // Draw Snake
  // Draw Food
  //
  // User now sees the new frame.
  // -------------------------------------------------
  draw();
}

// Start the very first frame.
window.requestAnimationFrame(main);

function update() {
  // Move the snake one grid square.
  updateSnake();

  // Check if food was eaten.
  updateFood();

  // Check wall collision and self collision.
  checkDeath();
}

function draw() {
  // -------------------------------------------------
  // Clear the previous frame.
  //
  // Before:
  //
  // □ □ □
  //
  // If we DON'T clear,
  // the snake leaves trails.
  //
  // □ □ □ □ □ □ □ □
  //
  // Instead,
  // erase everything first.
  // -------------------------------------------------
  gameBoard.innerHTML = "";

  // Draw snake at its NEW position.
  drawSnake(gameBoard);

  // Draw food.
  drawFood(gameBoard);
}

function checkDeath() {
  // -------------------------------------------------
  // Game Over happens if:
  //
  // 1.
  // Snake leaves the board.
  //
  // +-------------+
  // |             |
  // |         □ ->|
  // |             |
  // +-------------+
  //
  // OR
  //
  // 2.
  // Snake hits itself.
  //
  // □ □ □
  //     □
  // □ □ □
  //     ↑
  //     Head
  //
  // If either becomes true,
  // gameOver becomes true.
  // -------------------------------------------------
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
