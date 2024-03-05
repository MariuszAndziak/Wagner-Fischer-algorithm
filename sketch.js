var wordA;
var wordB;

function setup() {
  createCanvas(500, 500); // Create a canvas to draw on
  input1 = createInput();
  input2 = createInput();
  button = createButton('Submit');
  button.mousePressed(run);
}

function draw() {
// circle(20, 10, 20);
  
}

function run() {
  const word1 = '_' + input1.value(); // Add '_' before the first word
  const word2 = '_' + input2.value(); // Add '_' before the second word
  
  const gridSizeX = word1.length; // Number of columns
  const gridSizeY = word2.length; // Number of rows
  const squareSize = min(width / gridSizeX/2, height / gridSizeY/2);
  
  // Draw squares for each letter in word1
  for (let i = 0; i <= word1.length; i++) {
    for (let j = 0; j <= word2.length; j++) {
      const x = i * squareSize;
      const y = j * squareSize;
      drawSquare(x, y, squareSize, '0'); // Fill all squares with '_'
    }
  }
  
  // Draw squares for each letter in word1 (first row)
  for (let i = 0; i < word1.length; i++) {
    const x = (i + 1) * squareSize; // Offset by one position to the right
    const y = 0; // Row 0
    drawSquare(x, y, squareSize, word1.charAt(i));
  }
  
  // Draw squares for each letter in word2 (first column)
  for (let j = 0; j < word2.length; j++) {
    const x = 0; // Column 0
    const y = (j + 1) * squareSize; // Shift down by one square size to leave space for the first row
    drawSquare(x, y, squareSize, word2.charAt(j));
  }
}

function drawSquare(x, y, size, letter) {
  rect(x, y, size, size);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(letter, x + size / 2, y + size / 2);
}