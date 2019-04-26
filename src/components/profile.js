import React from 'react';

class Profile extends React.Component{

  state = {
    name: this.props.activeUser[0].name,
    email: this.props.activeUser[0].email,
    username: this.props.activeUser[0].username,
    edit: false
  }

  submitHandler = (e) => {
    e.preventDefault()
    console.log(this.state)
  }

  editHandler = () => {
    this.setState({edit: !this.state.edit})
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div>
      <h1>Profile</h1>
      { !this.state.edit
        ? (<div>
            <h3>Name: {this.props.activeUser[0].name}</h3>
            <h3>Email: {this.props.activeUser[0].email}</h3>
            <h3>Username: {this.props.activeUser[0].username}</h3>
            <button onClick={this.editHandler}>Edit</button>
          </div>)
        : (<div>
            <form onSubmit={this.submitHandler}>
              <h3>Name: <input type='text' name='name' placeholder='Name' value={this.state.name} onChange={this.changeHandler}/></h3>
              <h3>Email: <input type='text' name='email' placeholder='Email' value={this.state.email} onChange={this.changeHandler}/></h3>
              <h3>Username: <input type='text' name= 'username' placeholder='Username' value={this.state.username} onChange={this.changeHandler}/></h3>
              <button type='submit' value='submit'>Update</button>
            </form>
          </div>)
      }

      </div>
    )
  }
}
export default Profile;
