import React, { useState } from "react";
import "./SpreadsheetApp.css";

const SpreadsheetApp = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: 20 }, () => Array(20).fill(""))
  );
  const [draggedCell, setDraggedCell] = useState(null);

  const handleDragStart = (rowIndex, colIndex) => {
    setDraggedCell({ row: rowIndex, col: colIndex });
  };

  const handleDrop = (targetRowIndex, targetColIndex) => {
    if (!draggedCell) return;

    const sourceValue = grid[draggedCell.row][draggedCell.col];
    const updatedGrid = [...grid];

    // Copy the value or formula from the source cell to the target cell
    updatedGrid[targetRowIndex][targetColIndex] = sourceValue;

    // If the source contains a formula, adjust references
    if (sourceValue.startsWith("=")) {
      updatedGrid[targetRowIndex][targetColIndex] = adjustFormulaReferences(
        sourceValue,
        draggedCell,
        { row: targetRowIndex, col: targetColIndex }
      );
    }

    setGrid(updatedGrid);
    setDraggedCell(null);
  };

  const adjustFormulaReferences = (formula, source, target) => {
    const formulaBody = formula.slice(1); // Remove the '=' sign
    const updatedFormula = formulaBody.replace(/([A-Z])(\d+)/g, (match, col, row) => {
      const colIndex = col.charCodeAt(0) - 65;
      const rowIndex = parseInt(row, 10) - 1;

      const newRow = rowIndex + (target.row - source.row) + 1;
      const newCol = String.fromCharCode(65 + colIndex + (target.col - source.col));

      return `${newCol}${newRow}`;
    });

    return `=${updatedFormula}`;
  };

  const evaluateFormula = (formula, gridData) => {
    try {
      const match = formula.match(/^(\w+)\((.+)\)$/);
      if (!match) throw new Error("Invalid formula format");

      const [, func, args] = match;
      const parsedArgs = parseArgs(args, gridData);

      switch (func.toUpperCase()) {
        case "SUM":
          return parsedArgs.reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
        case "AVERAGE":
          const numericValues = parsedArgs.filter((val) => !isNaN(val) && val !== "");
          return (
            numericValues.reduce((sum, val) => sum + parseFloat(val), 0) /
            numericValues.length || 0
          );
        case "COUNT":
          return parsedArgs.filter((val) => !isNaN(val) && val !== "").length;
        case "TRIM":
          return parsedArgs[0]?.trim() || "";
        case "UPPER":
          return parsedArgs[0]?.toUpperCase() || "";
        case "LOWER":
          return parsedArgs[0]?.toLowerCase() || "";
        default:
          throw new Error(`Unknown function: ${func}`);
      }
    } catch (error) {
      return `#ERROR: ${error.message}`;
    }
  };

  const parseArgs = (args, gridData) => {
    if (args.includes(":")) {
      const [start, end] = args.split(":").map((cell) => cell.trim());
      const [startRow, startCol] = parseCell(start);
      const [endRow, endCol] = parseCell(end);

      const values = [];
      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          values.push(gridData[row]?.[col] || ""); // Ensure valid index access
        }
      }
      return values;
    } else {
      return args.split(",").map((arg) => {
        const trimmedArg = arg.trim();
        if (trimmedArg.match(/^[A-Z]\d+$/)) {
          const [row, col] = parseCell(trimmedArg);
          return gridData[row]?.[col] || ""; // Return cell value or empty string
        }
        return trimmedArg; // Direct value
      });
    }
  };

  const parseCell = (cell) => {
    const col = cell.charCodeAt(0) - 65; // Convert column letter (A, B, C) to index
    const row = parseInt(cell.slice(1), 10) - 1; // Convert row number to index
    return [row, col];
  };

  const handleBlur = (e, rowIndex, colIndex) => {
    const value = e.target.textContent;
    const updatedGrid = [...grid];

    if (value.startsWith("=")) {
      // Evaluate the formula
      updatedGrid[rowIndex][colIndex] = evaluateFormula(value.slice(1), grid);
    } else {
      updatedGrid[rowIndex][colIndex] = value;
    }

    setGrid(updatedGrid);
  };

  return (
    <div className="spreadsheet-app">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th></th>
              {Array.from({ length: grid[0].length }, (_, i) => (
                <th key={i}>{String.fromCharCode(65 + i)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="row-header">{rowIndex + 1}</td>
                {row.map((cell, colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    draggable
                    onDragStart={() => handleDragStart(rowIndex, colIndex)}
                    onDrop={() => handleDrop(rowIndex, colIndex)}
                    onDragOver={(e) => e.preventDefault()} // Allow dropping
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleBlur(e, rowIndex, colIndex)}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpreadsheetApp;
