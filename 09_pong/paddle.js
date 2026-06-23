const SPEED = 0.02;

export default class Paddle {
  constructor(paddleElem) {
    this.paddleElem = paddleElem;
  }

  // Read paddle position from CSS
  //
  // CSS:
  // --position: 50;
  //
  // JS:
  // paddle.position -> 50
  get position() {
    return parseFloat(
      getComputedStyle(this.paddleElem).getPropertyValue("--position"),
    );
  }

  // Update paddle position in CSS
  //
  // paddle.position = 80
  //
  // becomes:
  // --position: 80;
  set position(value) {
    this.paddleElem.style.setProperty("--position", value);
  }

  // Returns paddle hitbox
  rect() {
    return this.paddleElem.getBoundingClientRect();
  }

  // Move paddle back to center
  reset() {
    this.position = 50;
  }

  update(delta, ballHeight) {
    // AI follows the ball smoothly.
    //
    // Ball
    //   |
    //   V
    //  80
    //
    //  50
    // Paddle
    //
    // Difference = 30
    //
    // Move a fraction of that distance each frame.
    // This feels smooth instead of teleporting.
    this.position += SPEED * delta * (ballHeight - this.position);
  }
}
