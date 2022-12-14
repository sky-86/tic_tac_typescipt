import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Board, calculateWinner } from './components/board';

function Game() {
  /* GAME STATE */
  const [squares, setSquares] = useState<string[]>(Array(9).fill(null));
  const [history, setHistory] = useState([squares]);
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [stepNumber, setStepNumber] = useState<number>(0);

  /* CLICK HANDLER */
  function handleClick(i: number) {
    // return early if winner is detected or
    // if a already clicked square was clicked again
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // make copies
    const historyCopy = history.slice(0, stepNumber + 1);
    const squaresCopy = squares.slice();

    // update clicked square with the correct marker
    squaresCopy[i] = xIsNext ? 'X' : 'O';

    // save state
    setSquares(squaresCopy);
    setHistory(historyCopy.concat([squaresCopy]));
    setXIsNext(!xIsNext);
    setStepNumber(history.length)
  }

  /* Jump to the clicked move */
  function jumpTo(step: number) {
    setStepNumber(step);
    setXIsNext((step % 2) === 0)
  }

  // creates list of moves (history)
  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });

  const current = history[stepNumber];
  const winner = calculateWinner(squares);

  // update status
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current} onClick={(i: number) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<Game />);
