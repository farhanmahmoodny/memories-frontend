import React from 'react';
import { withRouter } from 'react-router-dom';
import MemoryCard from '../components/memoryCard';

class MemoriesContainer extends React.Component{

  state = {
    title: '',
    date: '',
    add: false,
    edit: false
  }

  memoryHandler = (memory) => {
    this.props.memoryHandler(memory)
    this.props.history.push(`/memories/${memory.id}`)
  }

  clickHandler = () => {
    this.props.activeUser ? (this.setState({add: !this.state.add})) : (this.props.history.push(`/login`))
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    this.props.addMemoryHandler(this.state)
    this.setState({title: '', date: '', add: !this.state.add})
  }


  render() {
    let memCards = this.props.memories.map(memory => <MemoryCard activeUser={this.props.activeUser} key={memory.id} memory={memory}  editMemoryHandler={this.props.editMemoryHandler} deleteMemoryHandler={this.props.deleteMemoryHandler} memoryHandler={this.memoryHandler}/>)
    return (
      <div>
        <div className='header'>
          <h1>Memories</h1>
        </div>
        <div style={{display: 'flex'}}>
          {memCards}
        </div>
        {this.state.add ?
        (<div>
          <form onSubmit={this.submitHandler}>
            <h5>Title: <input type='text' name='title' value={this.state.title} onChange={this.changeHandler}/></h5>
            <h5>Date: <input type='text' name='date' value={this.state.date} placeholder='MM-DD-YY' onChange={this.changeHandler}/></h5>
            <button>Create Memory</button>
          </form>
        </div>) : null}
        <button onClick={this.clickHandler}>Add Memory</button>
      </div>
    )
  }
}
export default withRouter(MemoriesContainer);
