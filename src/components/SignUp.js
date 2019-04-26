import React from 'react';
import { withRouter } from 'react-router-dom';

class SignUp extends React.Component {

  state = {
    name: "",
    email: "",
    username: "",
    password: ""
  }

  submitHandler = (e) => {
    e.preventDefault()
    this.props.newUserHandler(this.state)
    this.props.history.push('/Login')
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.submitHandler}>
          <input type='text' name='name' value={this.state.name} placeholder='Name' onChange={this.changeHandler}/>
          <input type='text' name='email' value={this.state.email} placeholder='Email' onChange={this.changeHandler}/>
          <input type='text' name='username' value={this.state.username} placeholder='Username' onChange={this.changeHandler}/>
          <input type='password' name='password' value={this.state.password} placeholder='Password' onChange={this.changeHandler}/>
          <button type='submit' value='submit'>Create User</button>
        </form>
      </div>
    )
  }
}
export default withRouter(SignUp);
