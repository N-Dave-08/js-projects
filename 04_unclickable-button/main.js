const evilButton = document.getElementById("evil-button");
const OFFSET = 100;

evilButton.addEventListener("click", () => {
  alert("Nice try");
  window.close();
});

document.addEventListener("mousemove", (e) => {
  // Current mouse position
  const x = e.pageX;
  const y = e.pageY;

  // Get the button's current position and size
  const buttonBox = evilButton.getBoundingClientRect();

  // Calculate distance from the mouse to the CENTER of the button
  //
  // Positive value  -> mouse is on the left/top side
  // Negative value  -> mouse is on the right/bottom side
  // 0               -> mouse is exactly at the center
  const horizontalDistanceFrom = distanceFromCenter(
    buttonBox.x,
    x,
    buttonBox.width,
  );

  const verticalDistanceFrom = distanceFromCenter(
    buttonBox.y,
    y,
    buttonBox.height,
  );

  // Safe zone around the button
  //
  // buttonBox.width / 2:
  //   Half of the button size so calculation starts from center
  //
  // + OFFSET:
  //   Extra invisible area around the button
  //   that triggers movement before the mouse touches it
  const horizontalOffset = buttonBox.width / 2 + OFFSET;
  const verticalOffset = buttonBox.height / 2 + OFFSET;

  // Check if the mouse is inside the button's danger zone
  //
  // Math.abs() removes negative values so we only care
  // about actual distance regardless of direction
  if (
    Math.abs(horizontalDistanceFrom) <= horizontalOffset &&
    Math.abs(verticalDistanceFrom) <= verticalOffset
  ) {
    // Move the button away from the cursor
    //
    // horizontalOffset / horizontalDistanceFrom:
    //   Creates stronger movement when the cursor gets closer
    //
    // Example:
    // distance = 50  -> 100 / 50  = 2
    // distance = 10  -> 100 / 10  = 10
    //
    // Meaning:
    // the closer the cursor is, the farther/faster the button escapes
    setButtonPosition(
      buttonBox.x + (horizontalOffset / horizontalDistanceFrom) * 10,
      buttonBox.y + (verticalOffset / verticalDistanceFrom) * 10,
    );
  }
});

function setButtonPosition(left, top) {
  const windowBox = document.body.getBoundingClientRect();
  const buttonBox = evilButton.getBoundingClientRect();

  // If button goes beyond the LEFT side of the screen,
  // teleport it to the RIGHT side
  if (distanceFromCenter(left, windowBox.left, buttonBox.width) < 0) {
    left = windowBox.right - buttonBox.width - OFFSET;
  }

  // If button goes beyond the RIGHT side of the screen,
  // teleport it to the LEFT side
  if (distanceFromCenter(left, windowBox.right, buttonBox.width) > 0) {
    left = windowBox.left + OFFSET;
  }

  // If button goes beyond the TOP side,
  // teleport it to the BOTTOM
  if (distanceFromCenter(top, windowBox.top, buttonBox.height) < 0) {
    top = windowBox.bottom - buttonBox.height - OFFSET;
  }

  // If button goes beyond the BOTTOM side,
  // teleport it to the TOP
  if (distanceFromCenter(top, windowBox.bottom, buttonBox.height) > 0) {
    top = windowBox.top + OFFSET;
  }

  // Apply the new position
  evilButton.style.left = `${left}px`;
  evilButton.style.top = `${top}px`;
}

function distanceFromCenter(boxPosition, mousePosition, boxSize) {
  // boxPosition:
  //   Position of the box (top or left)
  //
  // + boxSize / 2:
  //   Converts the position into the CENTER of the element
  //
  // mousePosition:
  //   Current mouse coordinate
  //
  // Formula:
  //   center of button - mouse position
  //
  // Result:
  //   positive -> mouse is before center
  //   negative -> mouse is after center
  return boxPosition - mousePosition + boxSize / 2;
}
