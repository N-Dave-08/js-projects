import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

// ------------------------------------------------------
// Create the very first food when the game starts.
//
// Instead of hardcoding a position,
// we immediately generate a random one.
//
// Example:
//
// Food
//
// ⭐
//
// could appear anywhere on the board.
// ------------------------------------------------------
let food = getRandomFoodPosition();

// Every food eaten grows the snake
// by two body segments.
const EXPANSION_RATE = 2;

export function update() {
  // ------------------------------------------------------
  // Check if the snake's head is touching the food.
  //
  // Snake Head
  //
  // □
  //
  // ⭐
  //
  // Same position?
  //
  // Yes
  //
  // Eat food.
  // ------------------------------------------------------
  if (onSnake(food)) {
    // Tell snake.js to grow.
    expandSnake(EXPANSION_RATE);

    // Generate a brand new food position.
    food = getRandomFoodPosition();
  }
}

export function draw(gameBoard) {
  // Create the HTML element for the food.
  const foodElement = document.createElement("div");

  // Position it inside the CSS Grid.
  //
  // Example:
  //
  // x = 12
  // y = 8
  //
  // places the food at
  // column 12, row 8.
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;

  foodElement.classList.add("food");

  gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
  let newFoodPosition;

  // ------------------------------------------------------
  // Keep generating random positions until
  // we find one that isn't occupied
  // by the snake.
  //
  // This guarantees food never appears
  // inside the snake.
  // ------------------------------------------------------
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }

  return newFoodPosition;
}
