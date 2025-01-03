import React, { useRef, useState } from 'react';
import './tictactoe.css';
import circle_icon from '../assets/circle.png';
import cross_icon from '../assets/cross.png';

let data = ['', '', '', '', '', '', '', '', ''];

const Tictactoe = () => {
    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let [history, setHistory] = useState([]); // To store the history of moves
    let titleRef = useRef(null);

    const toggle = (e, num) => {
        if (lock) {
            return;
        }
        if (data[num]) {
            return; // Prevent overwriting existing moves
        }
        const move = { index: num, player: count % 2 === 0 ? 'X' : 'O' }; // Store move
        setHistory([...history, move]); // Update history

        if (count % 2 === 0) {
            e.target.innerHTML = `<img src="${cross_icon}" alt="cross" />`;
            data[num] = 'X';
        } else {
            e.target.innerHTML = `<img src="${circle_icon}" alt="circle" />`;
            data[num] = 'O';
        }
        setCount(count + 1);
        checkWin();
    };

    const resetGame = () => {
        setCount(0);
        setLock(false);
        setHistory([]); // Clear history
        data.fill('');
        document.querySelectorAll('.boxes').forEach((box) => (box.innerHTML = ''));
        titleRef.current.innerHTML = 'Tic Tac Toe'; // Reset title back to original
    };

    const undoLastMove = () => {
        if (history.length === 0 || lock) return; // If no moves to undo or game is locked
        const lastMove = history.pop(); // Get the last move
        data[lastMove.index] = ''; // Clear the last move in the data array
        setHistory(history); // Update the history
        setCount(count - 1); // Decrease the move count

        // Clear the last move from the UI
        const boxes = document.querySelectorAll('.boxes');
        boxes[lastMove.index].innerHTML = '';
    };

    const checkWin = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6], // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (data[a] && data[a] === data[b] && data[b] === data[c]) {
                won(data[a]);
                return;
            }
        }
    };

    const won = (winner) => {
        setLock(true);
        if (winner === 'X') {
            titleRef.current.innerHTML = `Congratulations! <img src="${cross_icon}" alt="cross" /> won!`;
        } else {
            titleRef.current.innerHTML = `Congratulations! <img src="${circle_icon}" alt="circle" /> won!`;
        }
    };

    return (
        <div className='container'>
            <h1 className='title' ref={titleRef}>Tic Tac Toe</h1>
            <div className='board'>
                <div className='row1'>
                    <div className='boxes' onClick={(e) => toggle(e, 0)}></div>
                    <div className='boxes' onClick={(e) => toggle(e, 1)}></div>
                    <div className='boxes' onClick={(e) => toggle(e, 2)}></div>
                </div>
                <div className='row2'>
                    <div className='boxes' onClick={(e) => toggle(e, 3)}></div>
                    <div className='boxes' onClick={(e) => toggle(e, 4)}></div>
                    <div className='boxes' onClick={(e) => toggle(e, 5)}></div>
                </div>
                <div className='row3'>
                    <div className='boxes' onClick={(e) => toggle(e, 6)}></div>
                    <div className='boxes' onClick={(e) => toggle(e, 7)}></div>
                    <div className='boxes' onClick={(e) => toggle(e, 8)}></div>
                </div>
            </div>
            <button className='undo' onClick={undoLastMove}>
                Undo
            </button>
            <button className='reset' onClick={resetGame}>
                Reset
            </button>
        </div>
    );
};

export default Tictactoe;
