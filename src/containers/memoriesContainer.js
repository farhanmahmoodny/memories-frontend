import React from 'react';
import { withRouter } from 'react-router-dom';
import MemoryCard from '../components/memoryCard';

class MemoriesContainer extends React.Component{

  memoryHandler = (memory) => {
    this.props.memoryHandler(memory)
    this.props.history.push(`/memories/${memory}`)
  }

  render() {
    // console.log(this.props.memories)
    let memCards = this.props.memories.map(memory => <MemoryCard key={memory.id} memory={memory}  memoryHandler={this.memoryHandler}/>)
    return (
      <div>
        <div>
          <h1>Memories</h1>
        </div>
        <div>
          {memCards}
        </div>
        <button type='submit'>Add Memory</button>
      </div>
    )
  }
}
export default withRouter(MemoriesContainer);
