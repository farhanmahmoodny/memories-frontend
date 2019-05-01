import React from 'react';
import { NavLink } from "react-router-dom";

export default class NavBar extends React.Component {
  render() {
    return (
      <div className='NavBar'>
        <ul className='nav-ul'>
          <li className='nav-li'>
            <div className='nav'>
              <NavLink className='nav-button' to='/'>Home</NavLink>
            </div>
          </li>
          <li className='nav-li'>
            <div className='nav'>
              <NavLink className='nav-button' to='/memories'>Memories</NavLink>
            </div>
          </li>
          {this.props.activeUser === null ?
          (<div className='nav-ul'>
            <li className='nav-li'>
            <div className='nav'>
              <NavLink className='nav-button' to='/login'>Log-In</NavLink>
            </div>
          </li>
          <li className='nav-li'>
            <div className='nav'>
              <NavLink className='nav-button' to='/signup'>Sign Up</NavLink>
            </div>
          </li>
          </div>) :
          (<div className='nav-ul'>
            <li className='nav-li'>
            <div className='nav'>
              <NavLink className='nav-button' to='/profile'>Profile</NavLink>
            </div>
          </li>
          <li className='nav-li'>
            <div className='nav'>
              <NavLink className='nav-button' onClick={this.props.logout} to='/'>Log-Out</NavLink>
            </div>
          </li>
          </div>)
        }
        </ul>
      </div>
    )
  }
}
