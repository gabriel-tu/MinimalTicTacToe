import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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

      </div>
    );
  }
}




class Game extends React.Component {
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
    <Button className="square" onClick={props.onClick}>
      {props.value}
    </Button>
  );
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
