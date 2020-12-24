import React, { Component } from 'react';
import styles from './SignupForm.module.css';
import userService from '../../utils/userService';

class SignupForm extends Component {
  state = this.getInitialState();

  getInitialState() {
    return {
      name: '',
      email: '',
      password: '',
      passwordConf: '',
    };
  }

  isFormValid = () => {
    return (
      this.state.name &&
      this.state.email &&
      this.state.password &&
      this.state.password === this.state.passwordConf
    );
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
      const { name, email, password } = this.state;
      await userService.signup({ name, email, password });
      this.props.handleSignupOrLogin();
      this.setState(this.getInitialState());
      this.props.history.push('/');
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <h1>Sign Up for Swap-Meet!</h1>
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
        />

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

        <label htmlFor="passwordConf">Password Confirmation</label>
        <input
          id="passwordConf"
          name="passwordConf"
          type="password"
          value={this.state.passwordConf}
          onChange={this.handleChange}
        />

        <button disabled={!this.isFormValid()} type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default SignupForm;
