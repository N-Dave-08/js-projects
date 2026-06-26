# Snake Game Recreation Roadmap

## Phase 1: Build the World

### Step 1. Create the HTML

``` text
<body>

Game Board

</body>
```

Just make sure the board appears.

### Step 2. Style the board

Learn: - CSS Grid - `repeat()` - `1fr` - `100vmin`

Result:

``` text
+----------------------+
|                      |
|                      |
|                      |
|                      |
+----------------------+
```

Nothing moves yet.

------------------------------------------------------------------------

## Phase 2: Create the Game Loop

Create `game.js`.

``` js
function update() {}

function draw() {}

function main() {
  update()
  draw()
}
```

Then add:

``` js
requestAnimationFrame()
```

Visualization:

``` text
Browser
↓
main()
↓
update()
↓
draw()
↓
main()
...
```

------------------------------------------------------------------------

## Phase 3: Create the Snake

Create `snake.js`.

Draw one square first.

``` text
□
```

Store it in:

``` js
const snakeBody = [
  { x: 11, y: 11 }
]
```

Learn: - Arrays - Objects - `forEach()`

------------------------------------------------------------------------

## Phase 4: Movement

Move only the head.

``` text
□
↓
□
↓
□
```

Hardcode:

``` js
x++
```

No keyboard yet.

------------------------------------------------------------------------

## Phase 5: Keyboard Input

Create `input.js`.

Flow:

``` text
Player
↓
Press D
↓
Direction
↓
Snake moves
```

------------------------------------------------------------------------

## Phase 6: Body Following

Add another segment.

``` text
□□
```

Then:

``` text
□□□
```

Focus on:

``` js
for (...)
```

and

``` js
{ ...snakeBody[i] }
```

Spend extra time here.

------------------------------------------------------------------------

## Phase 7: Food

Create `food.js`.

Hardcode the food first.

``` text
□

⭐
```

Then detect collision.

``` text
□
↓
⭐
```

Finally, randomize the food position.

------------------------------------------------------------------------

## Phase 8: Grow the Snake

Implement:

``` js
expandSnake()
```

Before:

``` text
□□□
```

After eating:

``` text
□□□□□
```

------------------------------------------------------------------------

## Phase 9: Boundaries

Implement:

``` js
outsideGrid()
```

Visualization:

``` text
□□□□
↓
□□□□→
↓
Outside
↓
Game Over
```

------------------------------------------------------------------------

## Phase 10: Self Collision

Visualization:

``` text
□□□□

□

□□□□

Head
↓
Touches body
↓
Game Over
```

------------------------------------------------------------------------

# Final Development Order

``` text
1. Board
↓
2. Game Loop
↓
3. Snake
↓
4. Move Snake
↓
5. Keyboard
↓
6. Body Following
↓
7. Food
↓
8. Grow Snake
↓
9. Walls
↓
10. Self Collision
```

## Mindset

Don't think:

> I need to write 300 lines of Snake.

Think:

``` text
Can I draw one square?
↓
Can I move it?
↓
Can I control it?
↓
Can I add another square?
↓
Can it eat food?
↓
Can it grow?
↓
Can it lose?
↓
Done.
```

Build one small feature at a time and verify it works before moving to
the next.
