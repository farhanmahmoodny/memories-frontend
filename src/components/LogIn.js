import React from 'react';
import { withRouter } from 'react-router-dom';

class LogIn extends React.Component {

  state = {
    username: '',
    password: ''
  }

  submitHandler = (e) => {
    e.preventDefault()
    this.props.userHandler(this.state)
    this.setState({
      username: "",
      password: ""
    })
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div>
        <div className='header'>
          <h1 className='h1'>Log-In</h1>
        </div>
        <form className='login-form' onSubmit={this.submitHandler}>
          <input className='login-form-input' type='text' name='username' value={this.state.username} placeholder='Username' onChange={this.changeHandler}/>
          <input className='login-form-input' type='password' name='password' value={this.state.password} placeholder='Password' onChange={this.changeHandler}/>
          <button className='login-form-button' type='submit' value='submit'>Log-In</button>
        </form>
      </div>
    )
  }
}
export default withRouter(LogIn);
