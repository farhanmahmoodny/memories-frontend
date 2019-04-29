import React from 'react';

class Comment extends React.Component {
  render() {
    return(
      <p>{this.props.comment.comment}</p>
    )
  }
}

export default Comment;
