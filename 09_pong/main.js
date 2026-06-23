import Ball from "./ball.js";
import Paddle from "./paddle.js";

const ball = new Ball(document.getElementById("ball"));

const playerPaddle = new Paddle(document.getElementById("player-paddle"));

const computerPaddle = new Paddle(document.getElementById("computer-paddle"));

const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");

// Stores previous frame timestamp
let lastTime;

function update(time) {
  if (lastTime != null) {
    // Current frame time - previous frame time
    //
    // Example:
    // 1000ms -> 1016ms
    //
    // delta = 16
    const delta = time - lastTime;

    // Give the ball both paddle hitboxes.
    //
    // Ball asks:
    // "Am I touching either paddle?"
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);

    // Computer paddle follows ball
    computerPaddle.update(delta, ball.y);

    // Hue is the color wheel:
    //
    // 0   = Red
    // 120 = Green
    // 240 = Blue
    //
    // Increasing hue creates a rainbow effect.
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue"),
    );

    document.documentElement.style.setProperty("--hue", hue + delta * 0.01);

    if (isLose()) handleLose();
  }

  lastTime = time;

  // requestAnimationFrame creates the game loop.
  //
  // Frame 1
  //   ↓
  // update()
  //
  // Frame 2
  //   ↓
  // update()
  //
  // Frame 3
  //   ↓
  // update()
  //
  // This is the heartbeat of the game.
  window.requestAnimationFrame(update);
}

function isLose() {
  const rect = ball.rect();

  // Ball left the screen.
  //
  // <-- Lost
  //
  // |-------------------|
  //
  // Lost -->
  return rect.right >= window.innerWidth || rect.left <= 0;
}

function handleLose() {
  const rect = ball.rect();

  // Right side missed.
  // Player scores.
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
  } else {
    // Left side missed.
    // Computer scores.
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
  }

  // Start a new round
  ball.reset();
  computerPaddle.reset();
}

document.addEventListener("mousemove", (e) => {
  // Convert mouse Y position into a percentage.
  //
  // Top    = 0
  // Middle = 50
  // Bottom = 100
  //
  // CSS uses that percentage to place the paddle.
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});

// Start the game
window.requestAnimationFrame(update);
