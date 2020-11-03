import React from 'react';
import {connect} from 'react-redux';
import {Redirect } from 'react-router-dom';
import {logOutUser} from '../actions/userA';
import {setWantedQuestionsList} from '../actions/questionA';
import sarahEdoAvatar from '../utils/PixabayAvatars/user-310807_640.png';
import tylerMcginnisAvatar from '../utils/PixabayAvatars/man-3357275_640.png';
import johnDoeAvatar from '../utils/PixabayAvatars/avatar-1300331_640.png';
import '../style/App.css';



class UserBar extends React.Component {
  logOut = () => {
    alert('You will be logged out. Please come back soon.');
    this.props.dispatch(logOutUser());
    this.props.dispatch(setWantedQuestionsList([]))
    return(
      <Redirect to= {{
        pathname: '/login',
        }}/>
    );
  }

  render (){
    if (this.props.loggedInUser) {
      const avatarURLs = {
        sarahedo : sarahEdoAvatar,
        tylermcginnis : tylerMcginnisAvatar,
        johndoe : johnDoeAvatar
      };
      const user = this.props.loggedInUser;
      const userId = this.props.loggedInUser.id;
      const userAvatar = avatarURLs[userId];

      return (
        <div className="userBar">
          <img className="avatarImg" src={userAvatar}  alt="userAvatar"></img>
          <div className="userName">{user.name}</div>
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
