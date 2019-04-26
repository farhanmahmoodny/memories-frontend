import React from 'react';

class PhotoCard extends React.Component {
  render() {
    return (
      <div>
        <h5>{this.props.memory.location}</h5>
        <img src={this.props.memory.image} alt="not working"/>
        <p>{this.props.memory.description}</p>
      </div>
    )
  }
}
export default PhotoCard;
