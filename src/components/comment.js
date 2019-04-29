import React from 'react';

class Comment extends React.Component {
  render() {
    return(
      <h3>{this.props.comment.comment}</h3>
    )
  }
}

export default Comment;
