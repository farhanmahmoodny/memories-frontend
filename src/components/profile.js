import React from 'react';

class Profile extends React.Component{

  state = {
    id: this.props.activeUser.id,
    name: this.props.activeUser.name,
    email: this.props.activeUser.email,
    username: this.props.activeUser.username,
    password: this.props.activeUser.password,
    edit: false
  }

  editHandler = () => {
    this.setState({edit: !this.state.edit})
  }

  submitHandler = (e) => {
    e.preventDefault()
    this.props.editUserHandler(this.state)
    this.setState({edit: !this.state.edit})
  }

  deleteHandler = () => {
    this.props.deleteUserHandler(this.props.activeUser)
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div>
      <div className='header'>
        <h1 className='h1'>Profile</h1>
      </div>
      { !this.state.edit
        ? (<div className='profile'>
            <h3 className='profile-info'>Name: {this.state.name}</h3>
            <h3 className='profile-info'>Email: {this.state.email}</h3>
            <h3 className='profile-info'>Username: {this.state.username}</h3>
            <div className='profile-buttons-div'>
              <button className='profile-button' onClick={this.editHandler}>Edit</button>
              <button className='profile-button' onClick={this.deleteHandler}>Delete</button>
            </div>
          </div>)
        : (<div>
            <form className='profile-form' onSubmit={this.submitHandler}>
              <div className='profile-div'>
                <h3 className='profile-info'>Name:</h3>
                <input className='profile-input' type='text' name='name' placeholder='Name' value={this.state.name} onChange={this.changeHandler}/>
              </div>
              <div className='profile-div'>
                <h3 className='profile-info'>Email:</h3>
                <input className='profile-input' type='text' name='email' placeholder='Email' value={this.state.email} onChange={this.changeHandler}/>
              </div>
              <div className='profile-div'>
                <h3 className='profile-info'>Username:</h3>
                <input className='profile-input' type='text' name= 'username' placeholder='Username' value={this.state.username} onChange={this.changeHandler}/>
              </div>
              <div className='profile-div'>
                <h3 className='profile-info'>Password:</h3>
                <input className='profile-input' type='text' name= 'password' placeholder='Password' value={this.state.password} onChange={this.changeHandler}/>
              </div>
              <button className='profile-form-button'>Update</button>
            </form>
          </div>)
      }

      </div>
    )
  }
}
export default Profile;
