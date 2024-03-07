# Wagner-Fischer-algorithm #

## **Summary of the Wagner-Fischer Algorithm** ## 

The Wagner-Fischer algorithm is a dynamic programming algorithm used to find the minimum edit distance between two strings. The edit distance between two strings is defined as the minimum number of operations required to transform one string into the other, where the allowed operations are insertion, deletion, or substitution of a single character.

## **Steps to Run the Wagner-Fischer Algorithm** ##

1. **Initialize the Matrix**: Create a matrix with dimensions (m+1) x (n+1), where m and n are the lengths of the two strings being compared.

2. **Initialize the Base Cases**: Fill the first row and first column of the matrix with values representing the cumulative edit distances from the empty string to each substring of the other string.

3. **Fill in the Matrix**: For each cell (i, j) in the matrix, calculate the minimum edit distance by considering three possible operations:
   - If the characters at positions i and j are the same, no operation is needed, and the value in the cell is the same as the value in the cell diagonally above and to the left.
   - If the characters are different, take the minimum of:
     - The value in the cell diagonally above and to the left (representing substitution).
     - The value in the cell immediately above (representing deletion).
     - The value in the cell immediately to the left (representing insertion).
   - Update the current cell with the minimum value plus one.

4. **Compute the Edit Distance**: Once the matrix is filled, the edit distance between the two strings is the value in the bottom-right corner of the matrix.

## **Examples of Applications** ##

1. **Spell Checking**: In spell checking systems, the Wagner-Fischer algorithm can be used to suggest corrections for misspelled words by finding the closest word in a dictionary based on edit distance.

2. **Genetic Sequence Alignment**: In bioinformatics, the algorithm is used to align genetic sequences, which helps identify mutations, similarities, and differences between DNA or protein sequences. The edit distance corresponds to the number of mutations needed to transform one sequence into another, providing valuable insights into evolutionary relationships.
