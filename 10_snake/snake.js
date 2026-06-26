import { getInputDirection } from "./input.js";

// Snake moves 10 grid cells every second.
export const SNAKE_SPEED = 10;

// ----------------------------------------------------
// Every object inside this array is one body segment.
//
// Index
//
// 0 = Head
// 1 = Body
// 2 = Body
// 3 = Tail
//
// Example:
//
// [
//   {x:11,y:11},
//   {x:10,y:11},
//   {x:9,y:11},
// ]
//
// Visualization:
//
// □ □ □
//
// Head ---> Tail
// ----------------------------------------------------
const snakeBody = [{ x: 11, y: 11 }];

// Number of body segments waiting to be added.
let newSegments = 0;

export function update() {
  // Add any queued body segments first.
  addSegments();

  // Get the current movement direction.
  //
  // Example:
  //
  // {x:1,y:0}
  //
  // means:
  //
  // ---->
  const inputDirection = getInputDirection();

  // ----------------------------------------------------
  // BODY FOLLOWING
  //
  // This loop starts from the tail
  // and works backwards.
  //
  // Example:
  //
  // Before
  //
  // Index
  //
  // 0   1   2
  //
  // □ → □ → □
  //
  // Coordinates
  //
  // 11 10 9
  //
  // Tail copies Body
  //
  // 11 10 10
  //
  // Body copies Head
  //
  // 11 11 10
  //
  // Only AFTER this
  // does the head move.
  //
  // Final
  //
  // 12 11 10
  //
  // □ □ □
  // ----------------------------------------------------
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    // Spread operator
    //
    // WRONG
    //
    // snakeBody[i+1] = snakeBody[i]
    //
    // Both variables would point
    // to the SAME object.
    //
    // RIGHT
    //
    // { ...snakeBody[i] }
    //
    // Creates a completely NEW object.
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  // Move only the HEAD.
  //
  // Example:
  //
  // Direction
  //
  // {x:1,y:0}
  //
  // Before
  //
  // x = 11
  //
  // After
  //
  // x = 12
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
  // Draw every body segment.
  //
  // snakeBody
  //
  // [
  //  □
  //  □
  //  □
  // ]
  //
  // becomes
  //
  // HTML
  //
  // <div class="snake"></div>
  // <div class="snake"></div>
  // <div class="snake"></div>
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");

    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;

    snakeElement.classList.add("snake");

    gameBoard.appendChild(snakeElement);
  });
}

export function expandSnake(amount) {
  // Don't immediately add body parts.
  //
  // Instead,
  // remember how many need
  // to be added next update.
  //
  // Eat Food
  //
  // newSegments = 2
  newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
  // some()
  //
  // Returns true immediately
  // if ONE segment matches.
  //
  // Head
  // Body
  // Body
  // Tail
  //
  // Stops searching as soon
  // as it finds a match.
  return snakeBody.some((segment, index) => {
    // Sometimes we don't want to compare
    // the head against itself.
    //
    // Example:
    //
    // Head == Head
    //
    // Always true.
    //
    // Skip it.
    if (ignoreHead && index === 0) return false;

    return equalPosition(segment, position);
  });
}

export function getSnakeHead() {
  // Head is always index 0.
  //
  // □ □ □ □
  //
  // ^
  // Head
  return snakeBody[0];
}

export function snakeIntersection() {
  // Check if the head touches
  // ANY body segment.
  //
  // □ □ □
  //     □
  // □ □ □
  //     ^
  //
  // Head hits body.
  return onSnake(snakeBody[0], { ignoreHead: true });
}

// Compare two grid positions.
function equalPosition(pos1, pos2) {
  // Same x
  //
  // and
  //
  // Same y
  //
  // means
  //
  // Same square.
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
  // Example:
  //
  // newSegments = 2
  //
  // Tail
  //
  // □ □ □
  //
  // Add two more
  //
  // □ □ □ □ □
  //
  // Both new segments start
  // at the current tail position.
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({
      ...snakeBody[snakeBody.length - 1],
    });
  }

  // Reset queue.
  newSegments = 0;
}
