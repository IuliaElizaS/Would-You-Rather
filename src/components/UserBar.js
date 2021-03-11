import React from 'react';
import {connect} from 'react-redux';
import {withRouter } from 'react-router-dom';
import {logOutUser} from '../actions/userA';
import Swal from 'sweetalert2';
import sarahEdoAvatar from '../utils/PixabayAvatars/user-310807_640.png';
import tylerMcginnisAvatar from '../utils/PixabayAvatars/man-3357275_640.png';
import johnDoeAvatar from '../utils/PixabayAvatars/avatar-1300331_640.png';
import styled from 'styled-components';

const LoggedInUserBar = styled.div `
  height: 3em;
  margin: auto;
  @media screen and (min-width: 760px){
    margin: auto 0 auto auto;
  };
`
const Name = styled.h3 `
  display: inline-block;
  font-family: 'Dancing Script', cursive;
  font-size: 1.2em;
  color: #005753;
  padding: 0.25em;
  margin: auto 1em;
  @media screen and (min-width: 760px){
    font-size: 1.3em;
  };
`
const Image = styled.img `
  display: inline-block;
  height: 60%;
  margin: auto;
`
const Button = styled.button `
  display: inline-block;
  height: 1.8em;
  border: 0.15em solid #005753;
  background-color: #d3281c;
  border-radius: 5px;
  text-align: center;
  color: #FFF;
  padding: 0.25em;
  margin: auto;
  &:hover{
    border-color: #007FFF;
  };
  &:focus {
    border-color: #007FFF;
  };
`


class UserBar extends React.Component {
  logOut = () => {
    Swal.fire({
      title: 'You will be logged out. Are you sure you want to do this?',
      icon: 'question',
      iconColor: '#517100',
      showDenyButton: true,
      confirmButtonText: `Log out`,
      confirmButtonColor: '#007FFF',
      denyButtonText: `Stay logged in`,
      denyButtonColor: '#d3281c',
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
          <LoggedInUserBar>
            <Image src={userAvatar}  alt="userAvatar"/>
            <Name>{user.name}</Name>
            <Button onClick={this.logOut}>Log out</Button>
          </LoggedInUserBar>
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
