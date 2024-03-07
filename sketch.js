function setup() {
  createCanvas(500, 500);            // Create a canvas to draw on
  input1 = createInput();            // Textbox for word1
  input2 = createInput();            // Textbox for word2
  button = createButton('Submit');   // Submit button
  button.mousePressed(run);          // Run the 'run' function when the button is pressed
  
  input1.position(0, 20); // Adjust these values as needed
  input2.position(220, 20); // Adjust these values as needed
  button.position(440, 18); // Adjust these values as needed
  
  
  input1.style('width', '200px');    // Set width of input1
  input2.style('width', '200px');    // Set width of input2
  input1.style('height', '28px');    // Set width of input1
  input2.style('height', '28px');    // Set width of input2
  input1.style('font-family', 'Arial'); // Change font of input1
  input2.style('font-family', 'Arial'); // Change font of input2
  button.style('padding', '10px 20px'); // Set padding of the button
  button.style('background-color', '#4CAF50'); // Set background color of the button
  button.style('color', 'white');    // Set text color of the button
  button.style('border', 'none');    // Remove border of the button
  button.style('text-align', 'center'); // Center align text in the button
  button.style('text-decoration', 'none'); // Remove text decoration
  button.style('display', 'inline-block'); // Make button display as inline-block
  button.style('font-size', '15px');  // Set font size of the button
}


function run() {
  const word1 = '_' + input1.value(); // Add '_' before the first word
  const word2 = '_' + input2.value(); // Add '_' before the second word
  
  const gridSizeX = word1.length;     // Number of columns
  const gridSizeY = word2.length;     // Number of rows
  const squareSize = min(width / gridSizeX/2, height / gridSizeY/2); // Set size of grid cell
  
  const gridStartX = 30; // X coordinate where the grid starts
  const gridStartY = 80; // Y coordinate where the grid starts
  
  
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
      const x = gridStartX + (i + 1) * squareSize; // Offset by one position to the right
      const y = gridStartY + (j + 1) * squareSize; // Offset by one position down
      let fillColor = color(255,255,255);
      if (i === word1.length - 1 && j === word2.length - 1) {
        fillColor = color(76, 175, 80); // Different color for the bottom-right corner
      }
      drawSquare(x, y, squareSize, distances[j][i], fillColor);
    }
  }

  
  // Draw squares for each letter in word1 (first row)
  for (let i = 0; i < word1.length; i++) {
    const x = gridStartX+ (i + 1) * squareSize; // Offset by one position to the right
    const y = gridStartY; // Row 0
    drawSquare(x, y, squareSize, word1.charAt(i), color(128,128,128));
  }
  
  // Draw squares for each letter in word2 (first column)
  for (let j = 0; j < word2.length; j++) {
    const x = gridStartX; // Column 0
    const y = gridStartY + (j + 1) * squareSize; // Shift down by one square size to leave space for the first row
    drawSquare(x, y, squareSize, word2.charAt(j), color(128,128,128));
  }
}


// Generic drawSquare function
function drawSquare(x, y, size, letter, fillColor) {
  fill(fillColor);
  rect(x, y, size, size);
  fill(0,0,0);
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
