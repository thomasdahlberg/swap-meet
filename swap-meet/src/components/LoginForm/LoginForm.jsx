import React, { Component } from 'react';
import styles from './LoginForm.module.css';
import userService from '../../utils/userService';

class LoginForm extends Component {
  state = this.getInitialState();

  getInitialState() {
    return {
      email: '',
      password: '',
    };
  }

  isFormValid = () => {
    return this.state.email && this.state.password;
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.isFormValid()) return;
    try {
      const { email, password } = this.state;
      await userService.login({ email, password });
      this.props.handleSignupOrLogin();
      this.setState(this.getInitialState());
      this.props.history.push('/');
    } catch (error) {
      alert('Invalid Credentials');
    }
  };

  render() {
    return (
      <form className={styles.form}>
        <h1>Log in</h1>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={this.state.email}
          onChange={this.handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
        />

        <button
          onClick={this.handleSubmit}
          disabled={!this.isFormValid()}
          type="submit"
        >
          Log In
        </button>
      </form>
    );
  }
}

export default LoginForm;
