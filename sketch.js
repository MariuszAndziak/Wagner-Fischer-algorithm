var wordA;
var wordB;

function setup() {
  createCanvas(400, 400); // Create a canvas to draw on
  input1 = createInput();
  input2 = createInput();
  button = createButton('Submit');
  button.mousePressed(run);
}

function draw() {
// circle(20, 10, 20);
  
}

function run() {
  const word1 = input1.value();
  const word2 = input2.value();
  
  const gridSize = Math.ceil(Math.sqrt(word1.length));
  const squareSize = width / gridSize;
  
  // Draw squares for each letter in input1
  for (let i = 0; i < word1.length; i++) {
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;
    const x = col * squareSize;
    const y = row * squareSize;
    rect(x, y, squareSize, squareSize);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(word1.charAt(i), x + squareSize / 2, y + squareSize / 2);
  }
}