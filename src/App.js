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
    memoryTitle: '',
    activeMemory: null,
    activeUser: null,
    search: [],
    searchTerm: ''
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
    let images = this.state.photos.filter(photo => photo.memory_id === memory.id)
    this.setState({memory: images, activeMemory: memory, memoryTitle: memory.title})
  }

  //User handlers
  userHandler = (user) => {
    let userLI = this.state.users.filter(u => u.username === user.username && u.password === user.password)
    userLI.length === 0 ?
    (alert("Incorrect Username and/or Password")) :
    (this.setState({activeUser: userLI}, () => {
      this.props.history.push('/profile')
    }))
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
        password: user.password
      })
    }).then(resp => resp.json())
    .then(user => {
      this.setState((prevState) => ({users: [...prevState.users, user]}))
    })
  }

  editUserHandler = (user) => {
    let editedUser = this.state.users.filter(u => u.id !== user.id)
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
        password: user.password
      })
    }).then(resp => resp.json())
      .then(user => {
        this.setState({users: [...editedUser, user], activeUser: [user]})
      })
  }

  deleteUserHandler = (user) => {
    let removeUser = this.state.users.filter(u => u.id !== user.id)
    fetch(`http://localhost:3000/users/${user.id}`, {
      method: 'DELETE'
    })
    this.setState({users: removeUser, activeUser: null})
    this.props.history.push('/')
  }

  logout = () => {
    this.setState({activeUser: null})
  }


//Photo handlers
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


//Memory handlers
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
        this.setState({memories: [...this.state.memories, mem]})
        // this.setState((prevState) => ({memories: [...prevState.memories, mem]}))
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
    let removeMemory = this.state.memories.filter(m => m.id === memory.id)[0]
    let removedMemory = this.state.memories.filter(m => m.id !== memory.id)
    fetch(`http://localhost:3000/memories/${removeMemory.id}`, {
      method: 'DELETE'
    })
    this.setState({memories: removedMemory})
  }


//Comment handlers
  addCommentHandler = (comment, userId, photoId) => {
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

  deleteCommentHandler = (comment) => {
    let removeComment = this.state.comments.filter(com => com.id === comment.id)[0]
    let removedComment = this.state.comments.filter(com => com.id !== comment.id)
    fetch(`http://localhost:3000/comments/${removeComment.id}`, {
      method: 'DELETE'
    })
    this.setState({comments: removedComment})
  }

  //Search handlers
  searchHandler = (searching) => {
    this.setState({searchTerm: searching})
    let filtered = this.state.memories.filter(mem => mem.title.toLowerCase().includes(searching.toLowerCase()))
    this.setState({search: [...filtered]})
  }
  sortHandler = (e) => {
    if (e.target.value === 'Alphabeitcal: A-Z') {
      let alphaAZ = this.state.memories.sort((a, b) => a.title.localeCompare(b.title))
      this.setState({memories: alphaAZ})
    } else if (e.target.value === 'Alphabetical: Z-A') {
      let alphaZA = this.state.memories.sort((a, b) => b.title.localeCompare(a.title))
      this.setState({memories: alphaZA})
    }
  }

  render() {
    // console.log(this.state.searchTerm)
  if (this.state.searchTerm.toLowerCase() === 'elizabeth'){alert('Huh huh!')
} else if (this.state.searchTerm.toLowerCase() === 'brianna'){alert('OMG thats fuck\'ed up!')
} else if (this.state.searchTerm.toLowerCase() === 'dana'){alert('Danabase!')
} else if (this.state.searchTerm.toLowerCase() === 'dolma'){alert('Did you eat!')
} else if (this.state.searchTerm.toLowerCase() === 'matt'){alert('WarHammer!')
} else if (this.state.searchTerm.toLowerCase() === 'nate'){alert('Kooool!')
} else if (this.state.searchTerm.toLowerCase() === 'robert'){alert('Konami codes!')
} else if (this.state.searchTerm.toLowerCase() === 'camille'){alert('Buzzin!')
} else if (this.state.searchTerm.toLowerCase() === 'josh'){alert('That\'s sick!')
} else if (this.state.searchTerm.toLowerCase() === 'eric'){alert('Fuck\'em!')
} else if (this.state.searchTerm.toLowerCase() === 'ethan'){alert('So cool!')
} else if (this.state.searchTerm.toLowerCase() === 'michael'){alert('Technically...!')
} else if (this.state.searchTerm.toLowerCase() === 'david'){alert('WHAT?!')
} else if (this.state.searchTerm.toLowerCase() === 'faizan'){alert('Come on...!')
} else if (this.state.searchTerm.toLowerCase() === 'charlie'){alert('Dope!')
} else if (this.state.searchTerm.toLowerCase() === 'jeff'){alert('That\'s fair!')
} else if (this.state.searchTerm.toLowerCase() === 'alex'){alert('Ooohhh...Magic!')
  }
    return (
      <div>
        <NavBar logout={this.logout} activeUser={this.state.activeUser}/>
          <Switch>
            <Route exact path='/' render={() => (<Home />) }/>
            <Route exact path='/memories' render={() => (<MemoriesContainer memories={this.state.search.length > 0 ? this.state.search : this.state.memories} photos={this.state.photos} comments={this.state.comments} memoryHandler={this.memoryHandler} addMemoryHandler={this.addMemoryHandler} activeUser={this.state.activeUser} editMemoryHandler={this.editMemoryHandler} deleteMemoryHandler={this.deleteMemoryHandler} searchHandler={this.searchHandler} sortHandler={this.sortHandler}/>) }/>
            <Route exact path='/memories/:id' render={() => (<Memory memory={this.state.memory} editPhotoHandler={this.editPhotoHandler} deletePhotoHandler={this.deletePhotoHandler} addPhotoHandler={this.addPhotoHandler} activeUser={this.state.activeUser} addCommentHandler={this.addCommentHandler} comments={this.state.comments} deleteCommentHandler={this.deleteCommentHandler} memoryTitle={this.state.memoryTitle}/> ) }/>
            <Route exact path='/login' render={() => (<LogIn userHandler={this.userHandler} activeUser={this.state.activeUser}/>) }/>
            <Route exact path='/signup' render={() => (<SignUp newUserHandler={this.newUserHandler}/>) }/>
            <Route exact path='/profile' render={() => (this.state.activeUser ? (<Profile activeUser={this.state.activeUser[0]} editUserHandler={this.editUserHandler} deleteUserHandler={this.deleteUserHandler}/>) : (this.props.history.push('/login'))) }/>
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);
