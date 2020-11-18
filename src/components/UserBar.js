import React from 'react';
import {connect} from 'react-redux';
import {withRouter } from 'react-router-dom';
import {logOutUser} from '../actions/userA';
import sarahEdoAvatar from '../utils/PixabayAvatars/user-310807_640.png';
import tylerMcginnisAvatar from '../utils/PixabayAvatars/man-3357275_640.png';
import johnDoeAvatar from '../utils/PixabayAvatars/avatar-1300331_640.png';
import '../style/App.css';



class UserBar extends React.Component {
  logOut = () => {
    alert('You will be logged out. Please come back soon.');
    this.props.dispatch(logOutUser());
    this.props.history.push("/login");
  }

  render (){
    if (this.props.loggedInUser && this.props.loggedInUser !=='') {
      const avatarURLs = {
        sarahedo : sarahEdoAvatar,
        tylermcginnis : tylerMcginnisAvatar,
        johndoe : johnDoeAvatar
      };
      const userId = this.props.loggedInUser;
      const user = this.props.users[userId];
      const userAvatar = avatarURLs[userId];

      return (
        <withRouter>
        <div className="userBar">
          <img className="avatarImg" src={userAvatar}  alt="userAvatar"></img>
          <div className="userName">{user.name}</div>
          <button className="logOutBtn" onClick={this.logOut}>Log out</button>
        </div>
        </withRouter>
      )
    }else{
      return(null);
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.users.loggedInUser,
    users: state.users.users
  };
};

export default connect(mapStateToProps)(withRouter(UserBar));
