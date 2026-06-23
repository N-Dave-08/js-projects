const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.00001;

export default class Ball {
  constructor(ballElem) {
    this.ballElem = ballElem;
    this.reset();
  }

  // Reads the CSS variable --x
  // Example:
  // --x: 50;
  // ball.x -> 50
  get x() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
  }

  // Updates the CSS variable --x
  set x(value) {
    this.ballElem.style.setProperty("--x", value);
  }

  // Reads the CSS variable --y
  get y() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
  }

  // Updates the CSS variable --y
  set y(value) {
    this.ballElem.style.setProperty("--y", value);
  }

  // Returns the ball's actual position and size on screen
  rect() {
    return this.ballElem.getBoundingClientRect();
  }

  reset() {
    // Place ball back at the center
    this.x = 50;
    this.y = 50;

    this.direction = { x: 0.75, y: 0.5 };

    // Generate a random angle.
    //
    //      π/2
    //       ↑
    //       |
    // π <---O---> 0
    //       |
    //       ↓
    //      3π/2
    //
    // cos() -> horizontal movement
    // sin() -> vertical movement
    //
    // Reject directions that are too vertical
    // or too horizontal so the game remains playable.
    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      const heading = randomNumberBetween(0, 2 * Math.PI);

      this.direction = {
        x: Math.cos(heading),
        y: Math.sin(heading),
      };
    }

    this.velocity = INITIAL_VELOCITY;
  }

  update(delta, paddleRects) {
    // delta = time since last frame
    //
    // Fast PC:
    // Frame1 ----16ms---- Frame2
    //
    // Slow PC:
    // Frame1 -----33ms----- Frame2
    //
    // Using delta keeps movement speed consistent.
    //
    // position = position + speed × direction × time

    // Imagine the ball has an arrow attached to it:
    //
    //      ↗
    //      |
    //      O
    //
    // Move a small amount in that direction every frame.
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;

    // Gradually increase speed over time
    this.velocity += VELOCITY_INCREASE * delta;

    const rect = this.rect();

    // Hit ceiling/floor?
    //
    // Before:
    //    ↘
    //
    // After:
    //    ↗
    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1;
    }

    // If touching ANY paddle:
    //
    // Before:
    // ---->
    //
    // After:
    // <----
    if (paddleRects.some((r) => isCollision(r, rect))) {
      this.direction.x *= -1;
    }
  }
}

function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}

// AABB Collision Detection
//
// Rect A
// +------+
// |      |
// +------+
//      +------+
//      |      |
//      +------+
//       Rect B
//
// If their boundaries overlap,
// a collision occurred.
function isCollision(rect1, rect2) {
  return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
  );
}
