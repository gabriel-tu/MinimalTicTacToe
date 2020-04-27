import React from 'react';
import logo from './logo.svg';
import './App.css';

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
  this.setState({username: event.target.value});
}

//called when the enter button is pressed 
handleSubmit(event) {
  alert('A name was submitted: ' + this.state.username);
  event.preventDefault();
}

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Insert username: 
            <input type="text" value={this.state.username} onChange={this.handleChange}/>
          </label>
          <input type = "submit" value="Enter"></input>
        </form>
      </div>
    );
  }
}


class Game extends React.Component {
  render() {
    return (
      <div>
        pass
      </div>
    )
  }
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
