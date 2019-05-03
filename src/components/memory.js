import React from 'react';
import { withRouter } from 'react-router-dom';
import PhotoCard from './photoCard';

class Memory extends React.Component {

  state = {
    location: '',
    image: '',
    description: '',
    add: false
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
    this.props.activeUser ? (this.setState({add: !this.state.add})) : (this.props.history.push('/login'))
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    this.props.addPhotoHandler(this.state)
    this.setState({location: '', image: '', description: '', add: !this.state.add})

  }

  render() {
    let photoCards = this.props.memory.map(mem => {
      return <PhotoCard key={mem.id} memory={mem} editPhotoHandler={this.props.editPhotoHandler} deletePhotoHandler={this.props.deletePhotoHandler} activeUser={this.props.activeUser} addMemoryHandler={this.props.addMemoryHandler} comments={this.props.comments} addCommentHandler={this.props.addCommentHandler} deleteCommentHandler={this.props.deleteCommentHandler}/>
    })
    return (
      <div>
      <div className='header'>
        <h1>{this.props.memoryTitle}</h1>
      </div>
      <div className='photoCards'>
        {photoCards}
      </div>
        {this.state.add ?
          (<div>
            <form className='memory-form' onSubmit={this.submitHandler}>
              <h5>Location: <input type='text' name='location' value={this.state.location} onChange={this.changeHandler}/></h5>
              <h5>Description: <input type='textarea' name='description' value={this.state.description} onChange={this.changeHandler}/></h5>
              <h5 className='memory-form-add-button' onClick={this.openWidget}>Add Image</h5>
              <button className='memory-form-button'>Add</button>
            </form>
          </div>) : null
        }
        <button className='memory-button' onClick={this.clickHandler}>Add Photo</button>
      </div>
    )
  }
}
export default withRouter(Memory);
