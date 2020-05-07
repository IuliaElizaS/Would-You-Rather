import React from 'react';
import '../style/App.css';
import '../style/responsive.css';

class UserCard extends React.Component {
  render (){
    return (
      <div className="card">        
        <div className="user">
          <img src="" alt="userAvatar"></img>                   
          <div className="userName">{user name}</div>
        </div>  
        <div className="scoreContainer">
          <p className="item"> Answered questions: <span>{AQno}</span></p>
          <p className="item"> Created questions: <span>{CQno}</span></p>
          <p className="score"> Score: <span>{Score}</span></p>
        </div>
      </div>
    )
  }
}

export default UserCard;