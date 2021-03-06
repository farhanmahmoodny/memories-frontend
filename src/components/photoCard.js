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

  openWidget = () => {
    window.cloudinary.createUploadWidget(
     {
       cloudName: process.env.REACT_APP_CLOUD_NAME_KEY,
       uploadPreset: process.env.REACT_APP_UPLOAD_PRESET_KEY
     },
     (error, result) => {

       if (result && result.event === "success") {
         this.setState({
           image: `https://res.cloudinary.com/ddmxdfzlm/image/upload/${result.info.path}`, uploaded: true
         });
       }
     }
   ).open()
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
    let mems = []
    if (this.props.activeUser) {this.props.activeUser[0].memories.map(mem => mems.push(mem.id))}
    let comments = this.props.comments.filter(comment => comment.photo_id === this.props.memory.id)
    let postComments = comments.map(com => <Comment activeUser={this.props.activeUser} key={com.id} comment={com} deleteCommentHandler={this.props.deleteCommentHandler}/>)
    return (
      <div>
      {this.state.edit ?
      (<div className='photoCard'>
        <h5 className='photoCard-title'>{this.state.location}</h5>
        <img className='photoCard-image' src={this.state.image} alt="not working"/>
        <p className='photoCard-description'>{this.state.description}</p>
        {this.state.toggleComment ?
        <div>
          <div>
          {postComments}
          </div>
          {this.state.addComment ?
          (<form onSubmit={this.commentSubmitHandler}>
            <input type='text' name='comment' value={this.state.comment} onChange={this.commentText}/>
            <button className='photoCard-button'>Add</button>
          </form>) : null}
          {this.state.addComment ? null : <button className='photoCard-button' onClick={this.toggleCommentForm}>Add Comments</button>}
        </div> : null }
        <button className='photoCard-button' onClick={this.toggleComments}>Comments</button>
        {this.props.activeUser && mems.includes(this.props.memory.memory_id) ?
        <div>
          <button className='photoCard-button' onClick={this.clickHandler}>Edit</button>
          <button className='photoCard-button' onClick={() => this.deleteHandler(this.state)}>Delete</button>
        </div> : null}
      </div>)
      :
      (<div>
        <form className='photoCard-form' onSubmit={this.submitHandler}>
          <h5>Location: <input type='text' name='location' value={this.state.location} onChange={this.changeHandler}/></h5>
          <h5>Description: <input type='textarea' name='description' value={this.state.description} onChange={this.changeHandler}/></h5>
          <h5 className='memory-form-add-button' onClick={this.openWidget}>Change Image</h5>
          <button className='photoCard-button'>Update</button>
        </form>
      </div>)
    }
    </div>
    )
  }
}
export default withRouter(PhotoCard);
