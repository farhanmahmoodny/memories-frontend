import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import './App.css';
import MemoriesContainer from './containers/memoriesContainer';
import NavBar from './components/NavBar';
import Home from './components/home'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import Memory from './components/memory'
import Profile from './components/profile'

class App extends React.Component {

  state = {
    users: [],
    memories: [],
    photos: [],
    comments: [],
    memory: [],
    activeUser: null
  }

  componentDidMount(){
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(users => {
      this.setState({users})
      users.map(user => this.setState({
        memories: [...this.state.memories, ...user.memories],
        photos: [...this.state.photos, ...user.photos],
        comments: [...this.state.comments, ...user.comments]
      }))
    })
  }

  memoryHandler = (memoryId) => {
    let images = this.state.photos.filter(photo => photo.memory_id === memoryId)
    this.setState({memory: images})
  }

  userHandler = (user) => {
    let userLI = this.state.users.filter(u => u.username === user.username)[0]
    userLI.length === 0 ?
    (alert("Incorrect Username and/or Password")) :
    (this.setState({activeUser: userLI}, () => {
      this.props.history.push('/profile')
    }))
  }

  logout = () => {
    this.setState({activeUser: null})
  }

  newUserHandler = (user) => {
    fetch('http://localhost:3000/users',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accepts: "application/json"
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        username: user.username,
        password_digest: user.password
      })
    }).then(resp => resp.json())
      .then(user => {
        this.setState((prevState) => ({users: [...prevState.users, user]}))
      })
  }

  editUserHandler = (user) => {
    let editUser = this.state.users.filter(u => u.id === user.id)[0]
    fetch(`http://localhost:3000/users/${editUser.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        accepts: "application/json"
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        username: user.username,
      })
    }).then(resp => resp.json())
      .then(user => {
        this.setState((prevState) => ({activeUser: user}))
      })
  }

  render() {
    // console.log('app user', this.props)
    return (
      <div>
        <NavBar logout={this.logout} activeUser={this.state.activeUser}/>
          <Switch>
            <Route exact path='/' render={() => (<Home />) }/>
            <Route exact path='/memories' render={() => (<MemoriesContainer memories={this.state.memories} photos={this.state.photos} comments={this.state.comments} memoryHandler={this.memoryHandler}/>) }/>
            <Route exact path='/memories/:id' render={() => (<Memory memory={this.state.memory}/>) }/>
            <Route exact path='/login' render={() => (<LogIn userHandler={this.userHandler} activeUser={this.state.activeUser}/>) }/>
            <Route exact path='/signup' render={() => (<SignUp newUserHandler={this.newUserHandler}/>) }/>
            <Route exact path='/profile' render={() => (<Profile activeUser={this.state.activeUser} editUserHandler={this.editUserHandler}/>) }/>
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);
