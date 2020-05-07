import React from 'react';
import NavBar from './NavBar';
import UserBar from './UserBar';
import '../style/App.css';

class Header extends React.Component {
    render (){
      return (           
        <div className="topContainer">
            <h2 className="title">Would You Rather ...</h2>
            <NavBar/>
            <UserBar/>                 
        </div>
      )
    }
  }
  
  export default Header;
  