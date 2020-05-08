import React from 'react';
import {connect} from 'react-redux';
import {Redirect } from 'react-router-dom';
import {logOutUser} from '../actions/userA';
import '../style/App.css';

class UserBar extends React.Component {
  logOut = () => {
    alert('You will be loged out. Please come back soon.');
    this.props.dispatch(logOutUser());
    return(
      <Redirect to= {{
        pathname: '/login',
        }}/>
    );
  }


  render (){
    return (
      <div className="userBar">
        <img className="avatarImg" src={`${this.props.logedInUser.avatarURL}`} alt="userAvatar"></img>
        <div className="userName">${this.props.logedInUser.name}</div>
        <button className="logOutBtn" onClick={this.logOut}>Log out</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    logedInUser: state.logedInUser
  };
};

export default connect(mapStateToProps)(UserBar);
