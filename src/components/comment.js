import React from 'react';

class Comment extends React.Component {
  render() {
    console.log(this.props.comment)
    return(
      <div>
      <p>{this.props.comment.comment}</p>
      <button onClick={() => this.props.deleteCommentHandler(this.props.comment)}>Delete Comment</button>
      </div>
    )
  }
}

export default Comment;
