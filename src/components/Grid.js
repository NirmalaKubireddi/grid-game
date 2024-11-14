import React, { useEffect, useState } from 'react';
import './Grid.css';

const Grid = () => {
  const rows = 15;
  const cols = 20;

  // Initialize grid data with empty text, color for background and text color
  const [gridData, setGridData] = useState(
    Array(rows).fill().map(() => Array(cols).fill({ text: '', color: '', textColor: '' }))
  );

  // Initialize score
  const [score, setScore] = useState(0);

  // Game state: whether the game is running or not
  const [gameRunning, setGameRunning] = useState(false);

  // Function to update the background color of all cells randomly
  const updateTextColor = () => {
    const newGridData = gridData.map((row) =>
      row.map((cell) => ({
        ...cell,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random background color
      }))
    );
    setGridData(newGridData);
  };

  // Function to update the dynamic text pattern (moving "X"s) with random text color
  const updateTextPattern = () => {
    const newGridData = gridData.map((row) =>
      row.map((cell) => ({
        ...cell,
        text: '', // Clear the previous text
      }))
    );

    // Randomly change the position of the "X" on the grid
    const randomRow = Math.floor(Math.random() * rows);
    const randomCol = Math.floor(Math.random() * cols);

    newGridData[randomRow][randomCol] = {
      ...newGridData[randomRow][randomCol],
      text: 'X', // Place "X" at the new random position
      textColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color for text
    };

    setGridData(newGridData); // Update the grid with the new text pattern
  };

  // Click handler for changing the background color of the clicked cell and updating score
  const clickCell = (rowIndex, colIndex) => {
    const newGridData = [...gridData];
    newGridData[rowIndex][colIndex] = {
      ...newGridData[rowIndex][colIndex], // Copy the current cell
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random background color
    };
    setGridData(newGridData); // Update the state with the new grid data
    setScore(score + 1);  // Increment score
  };

  // Toggle the game state
  const toggleGame = () => {
    setGameRunning(!gameRunning);
  };

  // Effect hook to trigger the color change and pattern updates every 2s and 500ms if the game is running
  useEffect(() => {
    if (!gameRunning) return;

    const colorInterval = setInterval(updateTextColor, 2000); // Change background colors every 2s
    const patternInterval = setInterval(updateTextPattern, 500); // Move "X" every 500ms
    const textColorInterval = setInterval(updateTextPattern, 2000); // Change text color every 2s

    return () => {
      clearInterval(colorInterval);
      clearInterval(patternInterval);
      clearInterval(textColorInterval); // Clear the text color interval on cleanup
    };
  }, [gameRunning, gridData]); // Depend on gameRunning and gridData

  return (
    <div>
      {/* Display the score */}
      <div className="score">
        <h2>Score: {score}</h2>
      </div>

      {/* Game control button */}
      <button onClick={toggleGame}>
        {gameRunning ? 'Stop Game' : 'Start Game'}
      </button>

      {/* Render the grid */}
      <div className="grid">
        {gridData.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="cell"
              style={{
                backgroundColor: cell.color, // Set background color
                color: cell.textColor, // Set text color
              }}
              onClick={() => gameRunning && clickCell(rowIndex, colIndex)} // Only allow clicking if game is running
            >
              {cell.text || ' '}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;
