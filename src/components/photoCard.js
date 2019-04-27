import React from 'react';
import { withRouter } from 'react-router-dom';

class PhotoCard extends React.Component {

  state = {
    id: this.props.memory.id,
    location: this.props.memory.location,
    image: this.props.memory.image,
    description: this.props.memory.description,
    edit: true
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

  render() {
    return (
      <div>
      {this.state.edit ?
      (<div>
        <h5>{this.state.location}</h5>
        <img src={this.state.image} alt="not working"/>
        <p>{this.state.description}</p>
        <button onClick={this.clickHandler}>Edit</button>
        <button onClick={this.deleteHandler}>Delete</button>
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
