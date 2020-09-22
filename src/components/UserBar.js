import React from 'react';
import {connect} from 'react-redux';
import {Redirect } from 'react-router-dom';
import {logOutUser} from '../actions/userA';
import {setQuestionsToBeDisplayed} from '../actions/questionA'
import '../style/App.css';

class UserBar extends React.Component {
  logOut = () => {
    alert('You will be logged out. Please come back soon.');
    this.props.dispatch(logOutUser());
    this.props.dispatch(setQuestionsToBeDisplayed([]))
    return(
      <Redirect to= {{
        pathname: '/login',
        }}/>
    );
  }

  render (){
    if (this.props.loggedInUser) {
      return (
        <div className="userBar">
          <img className="avatarImg" src={this.props.loggedInUser.avatarURL}  alt="userAvatar"></img>
          <div className="userName">{this.props.loggedInUser.name}</div>
          <button className="logOutBtn" onClick={this.logOut}>Log out</button>
        </div>
      )
    }else{
      return(null);
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.users.loggedInUser,
  };
};

export default connect(mapStateToProps)(UserBar);
