import React from 'react';

class Comment extends React.Component {

  render() {
    return(
      <div>
      <p className='comment'>{this.props.comment.comment}</p>
      {this.props.activeUser && this.props.activeUser[0].id === this.props.comment.user_id ? <button className='comment-delete' onClick={() => this.props.deleteCommentHandler(this.props.comment)}>Delete Comment</button> : null}
      </div>
    )
  }
}

export default Comment;
