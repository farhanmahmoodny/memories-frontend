import React from 'react';

export default class MemoryCard extends React.Component {
  render() {
    return (
      <div onClick={() => this.props.memoryHandler(this.props.memory.id)}>
        <h1>{this.props.memory.title}</h1>
        <h1>{this.props.memory.date}</h1>
      </div>
    )
  }
}
