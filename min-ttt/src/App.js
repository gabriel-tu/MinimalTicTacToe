import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//????
const ENDPOINT = "http://127.0.0.1:3030";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //called when the textbox is changed 
  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  //called when the enter button is pressed 
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.username);
    event.preventDefault();
  }

  render() {
    return (
      <div>


        <Form onSubmit={this.handleSubmit}>
          <Form.Label>Insert username</Form.Label>
          
          <Form.Control type="text" value={this.state.username} onChange={this.handleChange} />
          
          <Button variant="primary" type="submit" >Enter</Button>
          
        </Form>

        <Game/>

        {/*<AppTest/>*/}

      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    //stepNumber: reflects the move displayed to the user 
    //boardContents: filled with thats in each square
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      boardContents: Array(9).fill(null),
      stepNumber: 0,
      xIsNext: true,
    };
  }

  //Function handleClick to define what happens when
  // the square component is clicked
  handleClick(i) {
    //ensures that when we go back we make a new move 
    // from that point and throw away future history 
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    //If someone has won then stop the game
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    //if our var xIsNext is true do "X" else "O"
    //squares[i] = this.state.xIsNext ? "X" : "O";

    squares[i] = "X"

    //send the index of the squares to the backend
    // so that we know which position to place a X/O

    // the below line prevents the submission from refreshing the page 
    // add the below line sometime haha
    //e.preventDefault();

    const socket = socketIOClient(ENDPOINT);

    //send a 'GamePos' value to the backend 
    // we will be sending the index of button pressed 
    socket.emit('GamePos', i);


    //receive data from the backend server 
    socket.on('GamePos', (pos) => {
      squares[pos] = "X"
    });
 

    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  //func to return the board to a previous state
  jumpTo(step) {
      this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
      });
  }

  render() {
    //Add the turn history into the game
    const history = this.state.history;
    //render the step number 
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    //using map, map our history of moves to React elements (buttons)
    const moves = history.map((step,move) => {
        const desc = move ?
        'Go to move #' + move : 
        'Go to game start';
        return (
            //give the list item a key so that it can be properly rerendered
            <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <GameBoard
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}


class GameBoard extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

//Renders one square in the tictactoe board 
function Square(props) {
  return (
    <Button className="square" variant="outline-dark" onClick={props.onClick}>
      {props.value}
    </Button>
  );
}

//Given an arr of 9 squares this func will check for winner
// Returns 'X' or 'O' or null
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


/*

The real time clock that we do not need anymore,
delete this later 

function AppTest() { 
  const [response, setResponse] = useState('');

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []); 

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}
*/


class Chat extends React.Component {
  render() {
    return (
      <div>
        pass
      </div>
    )
  }
}




export default App;
