import React, { Component } from 'react';
import axios from 'axios';
import '../styles/App.css';

import Nav from './Nav';
import GamesList from './GamesList';

class App extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    isLoggedIn: "",
    user: ""
  }

  componentDidMount() {
    if (localStorage.token) {
      axios({
        method: "get",
        url: `https://cors-anywhere.herokuapp.com/https://battle-buddy-redux-be.herokuapp.com/users/`,
        headers: { authorization: `Bearer ${localStorage.token}` }
      })
        .then(response => {
          console.log('App successfully recieves a response', response)
          this.setState({
            isLoggedIn: true,
            user: response.data
          });
        })
        .catch(err => console.log(err))
    } else {
      this.setState({
        isLoggedIn: false
      })
    }
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleLogin = event => {
    event.preventDefault();
    axios
      .post("https://cors-anywhere.herokuapp.com/https://battle-buddy-redux-be.herokuapp.com/users/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        let user = res.data.user
        localStorage.token = res.data.signedJwt;
        this.setState({
          isLoggedIn: true,
          // username: res.data.user.username,
          redirect: true,
          // userId: res.data.user._id,
          user
        });
        console.log(this.state.user);
      })
      .catch(err => console.log(err));
  };

  handleSignUp = event => {
    event.preventDefault();
    axios
      .post("https://cors-anywhere.herokuapp.com/https://battle-buddy-redux-be.herokuapp.com/users/signup", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        redirect: true,
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        localStorage.token = response.data.signedJwt;

        this.setState({
          isLoggedIn: true,
          user: response.data.user
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    if (this.state.isLoggedIn) {
      return (
        <div>
          <Nav
            handleInput={this.handleInput}
            handleLogOut={this.handleLogOut}
            isLoggedIn={this.state.isLoggedIn}
            user={this.state.user} />
        </div>
      )
    } else {
      return (
        <div className="App">
          <GamesList
            isLoggedIn={this.state.isLoggedIn}
            user={this.state.user}
            handleInput={this.handleInput}
            handleLogin={this.handleLogin}
            handleSignUp={this.handleSignUp} />
        </div >
      )
    }
  }
}

export default App;
