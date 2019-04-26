import React from 'react';
import { NavLink } from "react-router-dom";

export default class NavBar extends React.Component {
  render() {
    return (
      <div className='NavBar'>
        <ul>
          <li>
            <div>
              <NavLink className='button' to='/'>Home</NavLink>
            </div>
          </li>
          <li>
            <div>
              <NavLink className='button' to='/memories'>Memories</NavLink>
            </div>
          </li>
          {this.props.activeUser === null ?
          (<div>
            <li>
            <div>
              <NavLink className='button' to='/login'>Log-In</NavLink>
            </div>
          </li>
          <li>
            <div>
              <NavLink className='button' to='/signup'>Sign Up</NavLink>
            </div>
          </li>
          </div>) :
          (<div>
            <li>
            <div>
              <NavLink className='button' to='/profile'>Profile</NavLink>
            </div>
          </li>
          <li>
            <div>
              <NavLink className='button' onClick={this.props.logout} to='/'>Log-Out</NavLink>
            </div>
          </li>
          </div>)
        }
        </ul>
      </div>
    )
  }
}
