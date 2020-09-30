import React, { useState } from "react";

import "./App.css";


// var count = 0;

function getRandomArray() {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  let curr = 8;

  while (curr) {
    let random = Math.floor(Math.random() * curr);

    let temp = arr[curr];
    arr[curr] = arr[random];
    arr[random] = temp;

    curr--;
  }

  return arr;
}

function inRow(matrix ,value, row) {
  for (let j = 0; j < 9; j++) {
    if (matrix[row][j] === value) return true;
  }
  return false;
}

function inCol(matrix, value, col) {
  for (let i = 0; i < 9; i++) {
    if (matrix[i][col] === value) return true;
  }
  return false;
}

function inSqure(matrix, value, row, col) {
  for (let i = row; i < row + 3; i++) {
    for (let j = col; j < col + 3; j++) {
      if (matrix[i][j] === value) return true;
    }
  }
  return false;
}

function isMatrixFilled(matrix) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (matrix[i][j] === 0) return false;
    }
  }
  return true;
}

function filltheMatrix(matrix) {
  var  i = 0 ,j = 0;
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      if (matrix[i][j] === 0) {
        let randomArr = getRandomArray();
        console.log(randomArr);
        for (let k = 0 ; k <  9 ;k++ ) {
          let value = randomArr[i];
          if (!inRow(matrix,value, i)) {
            if (!inCol(matrix,value, j)) {
              if (!inSqure(matrix,value, i - (i % 3), j - (j % 3))) {
                matrix[i][j] = value;
                console.log(matrix[i][j]);
                if (isMatrixFilled(matrix)) {
                  return true;
                } else {
                  if (filltheMatrix(matrix)) return true;
                  console.log("donothing");
                }
              }
            }
          }
        }
        break;
      }
    }
  }
  matrix[i][j] = 0;
}

function newMatrix() {

  let matrix = new Array(9).fill(0).map(() => new Array(9).fill(0));

  
  filltheMatrix(matrix);
  return matrix;
}

function App() {
  const [arr, changearr] = useState(() => newMatrix());

  return (
    <div>
      <div className="Sudukodiv">
        {arr.map((value, i) => {
          return (
            <div className="row">
              {value.map((num, j) => {
                return (
                  <div className="col cube">
                    <input className="cubetext" type="text" value={num} />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <button onClick={() => changearr(() => newMatrix())}>New Suduko</button>
    </div>
  );
}

export default App;

// for (let i = 0; i < 9; i++) {
  //   let num1 = Math.floor(Math.random() * 9);
  //   matrix[i][num1] = Math.floor(Math.random() * 9) + 1;

  //   let num2;

  //   if (num1 < 5) num2 = Math.floor(Math.random() * 4) + 5;
  //   else num2 = Math.floor(Math.random() * 5);

  //   matrix[i][num2] = Math.floor(Math.random() * 9);
  // }
