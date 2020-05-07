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

      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    //stepNumber: reflects the move displayed to the user 
    //boardContents: filled with thats in each square ? maybe not? 
    this.state = {
      boardContents: Array(9).fill(null),
    };
  }

  //Function handleClick to define what happens when
  // the square component is clicked
  handleClick(i) {
    //ensures that when we go back we make a new move 
    // from that point and throw away future history 
    const squares = this.state.boardContents;
    console.log(squares);

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

    //create obj to be send back
    // we have to +1 to stepnum as we did not 
    // concat the new move to history yet
    let gameData={
      sqr: squares,
    }; 

    //send a 'GameState' value to the backend 
    // we will be sending the index of button pressed 
    socket.emit('GameDat', gameData);

    //receive data from the backend server 
    socket.on('GameDat', (gameData) => {
      console.log(gameData.sqr);

      this.setState({
        boardContents: gameData.sqr
      });
      
    });

/*
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
    */
    
  }

  render() {
    const winner = calculateWinner(this.state.boardContents);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    }

    //try to get the backend data ? 
    GetData(this);

    return (
      <div className="game">
        <div className="game-board">
          <GameBoard
            squares={this.state.boardContents}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
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

function GetData (that) { 
  const socket = socketIOClient(ENDPOINT);
//receive data from the backend server 
socket.on('GameDat', (gameData) => {
  const squares = gameData.sqr;

  console.log(squares);
  //squares[gameData.pos] = "X"

  that.setState({
    boardContents: squares,
  });
  
});

}

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
