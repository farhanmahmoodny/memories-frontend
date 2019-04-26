import React from 'react';

class Profile extends React.Component{

  state = {
    id: this.props.activeUser.id,
    name: this.props.activeUser.name,
    email: this.props.activeUser.email,
    username: this.props.activeUser.username,
    edit: false
  }

  editHandler = () => {
    this.setState({edit: !this.state.edit})
  }

  submitHandler = (e) => {
    e.preventDefault()
    this.setState({edit: !this.state.edit})
    this.props.editUserHandler(this.state)
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
            <h3>Name: {this.props.activeUser.name}</h3>
            <h3>Email: {this.props.activeUser.email}</h3>
            <h3>Username: {this.props.activeUser.username}</h3>
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
