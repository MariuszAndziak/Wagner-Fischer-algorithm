function setup() {
  createCanvas(500, 500);            // Create a canvas to draw on
  input1 = createInput();            // Textbox for word1
  input2 = createInput();            // Textbox for word2
  button = createButton('Submit');   // Submit button
  button.mousePressed(run);          // Run the 'run' function when the button is pressed
}


function run() {
  const word1 = '_' + input1.value(); // Add '_' before the first word
  const word2 = '_' + input2.value(); // Add '_' before the second word
  
  const gridSizeX = word1.length;     // Number of columns
  const gridSizeY = word2.length;     // Number of rows
  const squareSize = min(width / gridSizeX/2, height / gridSizeY/2); // Set size of grid cell
  
  
  const distances = [];                     // Empty list for storing distances
  for (let i = 0; i < word2.length; i++) {
    distances.push([]);                     // Add an empty list to distances
    for (let j = 0; j < word1.length; j++) {
      const distance = wagner_fischer(word1.slice(0, j + 1), word2.slice(0, i + 1));
      distances[i].push(distance);
    }
  }
  
  // Draw the inner grid
  for (let i = 0; i < word1.length; i++) {
    for (let j = 0; j < word2.length; j++) {
      const x = (i + 1) * squareSize; // Offset by one position to the right
      const y = (j + 1) * squareSize; // Offset by one position down
      drawSquare(x, y, squareSize, distances[j][i]);
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


// Generic drawSquare function
function drawSquare(x, y, size, letter) {
  rect(x, y, size, size);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(letter, x + size / 2, y + size / 2);
}



function wagner_fischer(s1, s2) {
  let len_s1 = s1.length;
  let len_s2 = s2.length;
  if (len_s1 > len_s2) {
    [s1, s2] = [s2, s1];
    [len_s1, len_s2] = [len_s2, len_s1];
  }

  let curr_row = Array.from({length: len_s1 + 1}, (_, i) => i);
  for (let i = 1; i <= len_s2; i++) {
    let prev_row = curr_row.slice();
    curr_row[0] = i;
    for (let j = 1; j <= len_s1; j++) {
      let add = prev_row[j] + 1;
      let del = curr_row[j - 1] + 1;
      let change = prev_row[j - 1];
      if (s1[j - 1] != s2[i - 1]) {
        change += 1;
      }
      curr_row[j] = Math.min(add, del, change);
    }
  }
  return curr_row[len_s1];
}
