import React from 'react';
import { withRouter } from 'react-router-dom';
import Comment from './comment'

class PhotoCard extends React.Component {

  state = {
    id: this.props.memory.id,
    location: this.props.memory.location,
    image: this.props.memory.image,
    description: this.props.memory.description,
    comment: '',
    edit: true,
    toggleComment: false,
    addComment: false
  }

  clickHandler = () => {
    this.props.activeUser ? (this.setState({edit: !this.state.edit})) : (this.props.history.push('/login'))
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    this.setState({edit: !this.state.edit})
    this.props.editPhotoHandler(this.state)
  }

  deleteHandler = (photo) => {
    this.props.activeUser ? (this.props.deletePhotoHandler(photo)) : (this.props.history.push('/login'))
  }

  addCommentHandler = (e) => {
    e.preventDefault()
    this.props.addCommentHandler(this.state.comment, this.props.activeUser[0].id, this.props.memory.id)
  }

  toggleComments = () => {
    this.setState({toggleComment: !this.state.toggleComment})
  }

  toggleCommentForm = () => {
    this.props.activeUser ? (this.setState({addComment: !this.state.addComment})) : (this.props.history.push('/login'))
  }

  commentText = (e) => {
    this.setState({comment: e.target.value})
  }

  commentSubmitHandler = (e) => {
    e.preventDefault()
    this.props.addCommentHandler(this.state.comment, this.props.activeUser[0].id, this.props.memory.id)
    this.setState({comment: '', addComment: !this.state.addComment})
  }

  render() {
    let comments = this.props.comments.filter(comment => comment.photo_id === this.props.memory.id)
    let postComments = comments.map(com => <Comment key={com.id} comment={com} deleteCommentHandler={this.props.deleteCommentHandler}/>)
    return (
      <div>
      {this.state.edit ?
      (<div>
        <h5>{this.state.location}</h5>
        <img src={this.state.image} alt="not working"/>
        <p>{this.state.description}</p>
        {this.state.toggleComment ?
        <div>
          {postComments}
          {this.state.addComment ?
          (<form onSubmit={this.commentSubmitHandler}>
            <input type='text' name='comment' value={this.state.comment} onChange={this.commentText}/>
            <button>Add Comments</button>
          </form>) : null}
          {this.state.addComment ? null : <button onClick={this.toggleCommentForm}>Add Comments</button>}
        </div> : null }
        <button onClick={this.toggleComments}>Comments</button>
        <button onClick={this.clickHandler}>Edit</button>
        <button onClick={() => this.deleteHandler(this.state)}>Delete</button>
      </div>)
      :
      (<div>
        <form onSubmit={this.submitHandler}>
          <h5>Location: <input type='text' name='location' value={this.state.location} onChange={this.changeHandler}/></h5>
          <h5>Image: <input type='text' name='image' value={this.state.image} onChange={this.changeHandler}/></h5>
          <h5>Description: <input type='textarea' name='description' value={this.state.description} onChange={this.changeHandler}/></h5>
          <button>Update</button>
        </form>
      </div>)
    }
    </div>
    )
  }
}
export default withRouter(PhotoCard);
