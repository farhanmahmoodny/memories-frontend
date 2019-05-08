import React from 'react';
import { withRouter } from 'react-router-dom';

class MemoryCard extends React.Component {

  state = {
    id: this.props.memory.id,
    title: this.props.memory.title,
    date: this.props.memory.date,
    edit: false
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  editHandler = (e) => {
    this.props.activeUser ? (this.setState({edit: !this.state.edit})) : (this.props.history.push('/login'))
  }

  submitHandler = (e) => {
    e.preventDefault()
    this.props.editMemoryHandler(this.state)
    this.setState({edit: !this.state.edit})
  }

  deleteHandler = (e) => {
    e.preventDefault()
    this.props.activeUser ? (this.props.deleteMemoryHandler(this.props.memory)) : (this.props.history.push('/login'))
  }

  render() {
    return (
      <div className='memoryCard'>
      {!this.state.edit ?
        (<div onClick={() => this.props.memoryHandler(this.props.memory)}>
        <h1 className='memoryCard-info'>{this.props.memory.title}</h1>
        <h1 className='memoryCard-info'>{this.props.memory.date}</h1>
        </div>) :
        (<div>
          <form onSubmit={this.submitHandler}>
            <h1>Title: <input className='memoryCard-form-input' type='text' name='title' value={this.state.title} onChange={this.changeHandler}/></h1>
            <h1>Date: <input className='memoryCard-form-input' type='text' name='date' value={this.state.date} onChange={this.changeHandler}/></h1>
            <button className='memoryCard-button'>Update</button>
          </form>
        </div>)
      }
      {this.props.activeUser && this.props.memory.user_id === this.props.activeUser[0].id ?
        <div>
          <button className='memoryCard-button' onClick={this.editHandler}>Edit</button>
          <button className='memoryCard-button' onClick={this.deleteHandler}>Delete</button>
        </div> : null}
      </div>
    )
  }
}
export default withRouter(MemoryCard);
