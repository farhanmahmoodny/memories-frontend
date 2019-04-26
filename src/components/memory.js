import React from 'react';
import PhotoCard from './photoCard'

class Memory extends React.Component {
  render() {
    let photoCards = this.props.memory.map(mem => <PhotoCard key={mem.id} memory={mem}/>)
    return (
      <div>
        {photoCards}
      </div>
    )
  }
}
export default Memory;
