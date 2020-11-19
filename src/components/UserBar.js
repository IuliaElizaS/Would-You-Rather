import React from 'react';
import {connect} from 'react-redux';
import {withRouter } from 'react-router-dom';
import {logOutUser} from '../actions/userA';
import Swal from 'sweetalert2';
import sarahEdoAvatar from '../utils/PixabayAvatars/user-310807_640.png';
import tylerMcginnisAvatar from '../utils/PixabayAvatars/man-3357275_640.png';
import johnDoeAvatar from '../utils/PixabayAvatars/avatar-1300331_640.png';
import '../style/App.css';



class UserBar extends React.Component {
  logOut = () => {
    Swal.fire({
      title: 'You will be logged out. Are you sure you want to do this?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: `Log out`,
      denyButtonText: `Stay logged in`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.dispatch(logOutUser());
        this.props.history.push("/login");
      }
    });
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
