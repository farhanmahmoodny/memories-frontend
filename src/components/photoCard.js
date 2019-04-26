import React from 'react';

class PhotoCard extends React.Component {

  state = {
    id: this.props.memory.id,
    location: this.props.memory.location,
    image: this.props.memory.image,
    description: this.props.memory.description
  }

  clickHandler = () => {
    console.log('cleeeeked!', this.state)
  }

  render() {
    return (
      <div onClick={this.clickHandler}>
        <h5>{this.props.memory.location}</h5>
        <img src={this.props.memory.image} alt="not working"/>
        <p>{this.props.memory.description}</p>
      </div>
    )
  }
}
export default PhotoCard;
