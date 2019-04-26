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
        <h1>Log-In</h1>
        <form onSubmit={this.submitHandler}>
          <input type='text' name='username' value={this.state.username} placeholder='Username' onChange={this.changeHandler}/>
          <input type='password' name='password' value={this.state.password} placeholder='Password' onChange={this.changeHandler}/>
          <button type='submit' value='submit'>Log-In</button>
        </form>
      </div>
    )
  }
}
export default withRouter(LogIn);
