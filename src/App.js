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
    activeMemory: null,
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

  memoryHandler = (memory) => {
    console.log(memory)
    let images = this.state.photos.filter(photo => photo.memory_id === memory.id)
    this.setState({memory: images, activeMemory: memory})
  }

  userHandler = (user) => {
    let userLI = this.state.users.filter(u => u.username === user.username)
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
        this.setState({activeUser: [user]})
      })
  }

  editPhotoHandler = (photo) => {
    let editPhoto = this.state.photos.filter(p => p.id === photo.id)[0]
    let uneditPhotos = this.state.photos.filter(p => p.id !== photo.id)
    fetch(`http://localhost:3000/photos/${editPhoto.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        accepts: 'application/json'
      },
      body: JSON.stringify({
        location: photo.location,
        image: photo.image,
        description: photo.description,
      })
    }).then(res => res.json())
    .then(photo => this.setState({photos: [...uneditPhotos, photo]}))
  }

  addPhotoHandler = (photo) => {
    fetch('http://localhost:3000/photos',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accepts: "application/json"
      },
      body: JSON.stringify({
        location: photo.location,
        image: photo.image,
        description: photo.description,
        memory_id: this.state.activeMemory.id
      })
    }).then(resp => resp.json())
      .then(pho => {
        this.setState({photos: [...this.state.photos, pho]}, () => this.memoryHandler(this.state.activeMemory))
      })
  }

  deletePhotoHandler = (photo) => {
    let removePhoto = this.state.photos.filter(p => p.id === photo.id)[0]
    let removedPhoto = this.state.photos.filter(p => p.id !== photo.id)
    fetch(`http://localhost:3000/photos/${removePhoto.id}`, {
      method: 'DELETE'
    })
    this.setState({photos: removedPhoto}, () => this.memoryHandler(this.state.activeMemory))
  }

  addMemoryHandler = (memory) => {
    fetch('http://localhost:3000/memories',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accepts: "application/json"
      },
      body: JSON.stringify({
        title: memory.title,
        date: memory.date,
        user_id: this.state.activeUser[0].id
      })
    }).then(resp => resp.json())
      .then(mem => {
        this.setState((prevState) => ({memories: [...prevState.memories, mem]}))
      })
  }

  editMemoryHandler = (memory) => {
    let editMemory = this.state.memories.filter(m => m.id === memory.id)[0]
    let memories = this.state.memories.filter(m => m.id !== memory.id)
    fetch(`http://localhost:3000/memories/${editMemory.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        accepts: 'application/json'
      },
      body: JSON.stringify({
        title: memory.title,
        date: memory.date
      })
    }).then(res => res.json())
    .then(memory => this.setState({memories: [...memories, memory]}))
  }

  deleteMemoryHandler = (memory) => {
    console.log(memory)
    let removeMemory = this.state.memories.filter(m => m.id === memory.id)[0]
    let removedMemory = this.state.memories.filter(m => m.id !== memory.id)
    fetch(`http://localhost:3000/memories/${removeMemory.id}`, {
      method: 'DELETE'
    })
    this.setState({memories: removedMemory})
  }

  addCommentHandler = (comment, userId, photoId) => {
    console.log('comment', comment)
    console.log('userId', userId)
    console.log('photoId', photoId)
    fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accepts: 'application/json'
      },
      body: JSON.stringify({
        comment: comment,
        user_id: userId,
        photo_id: photoId
      })
    }).then(res => res.json())
    .then(newComment => this.setState({comments: [...this.state.comments, newComment]}))
  }

  render() {
    // console.log(this.state.comments)
    return (
      <div>
        <NavBar logout={this.logout} activeUser={this.state.activeUser}/>
          <Switch>
            <Route exact path='/' render={() => (<Home />) }/>
            <Route exact path='/memories' render={() => (<MemoriesContainer memories={this.state.memories} photos={this.state.photos} comments={this.state.comments} memoryHandler={this.memoryHandler} addMemoryHandler={this.addMemoryHandler} activeUser={this.state.activeUser} editMemoryHandler={this.editMemoryHandler} deleteMemoryHandler={this.deleteMemoryHandler}/>) }/>
            <Route exact path='/memories/:id' render={() => (<Memory memory={this.state.memory} editPhotoHandler={this.editPhotoHandler} deletePhotoHandler={this.deletePhotoHandler} addPhotoHandler={this.addPhotoHandler} activeUser={this.state.activeUser} addCommentHandler={this.addCommentHandler} comments={this.state.comments}/> ) }/>
            <Route exact path='/login' render={() => (<LogIn userHandler={this.userHandler} activeUser={this.state.activeUser}/>) }/>
            <Route exact path='/signup' render={() => (<SignUp newUserHandler={this.newUserHandler}/>) }/>
            <Route exact path='/profile' render={() => (<Profile activeUser={this.state.activeUser[0]} editUserHandler={this.editUserHandler}/>) }/>
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);
