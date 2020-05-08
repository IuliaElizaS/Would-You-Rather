import React from 'react';
import {Link} from 'react-router-dom';
import '../style/App.css';

class NavBar extends React.Component {
  render (){
    return (
      <div className="navBar">
        <div className="navItem">
            <Link to='/'>Home</Link>
        </div>
        <div className="navItem">
            <Link to='/add'>New Question</Link>
        </div>
        <div className="navItem">
            <Link to='/leaderboard'>Leaderboard</Link>
        </div>
      </div>
    )
  }
}

export default NavBar;