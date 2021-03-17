import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import {addScoreToUserObj} from '../actions/userA';
import Swal from 'sweetalert2';
import sarahEdoAvatar from '../utils/PixabayAvatars/user-310807_640.png';
import tylerMcginnisAvatar from '../utils/PixabayAvatars/man-3357275_640.png';
import johnDoeAvatar from '../utils/PixabayAvatars/avatar-1300331_640.png';
import styled from 'styled-components';

const Board = styled.ul `
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
`
const UserCard = styled.li `
  display: flex;
  width: 85%;
  height: 130px;
  border: 3px solid #005753;
  border-radius: 5px;
  margin: 0.5em auto;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.9em;
  &:hover{
    border-color: #d3281c;
  };
  &:focus {
    border-color: #d3281c;
  };
  @media screen and (min-width: 760px){
    font-size: 1.1em;
  };
  @media screen and (min-width: 950px){
    font-size: 1.2em;
  };
`
const User = styled.div `
  width: 30%;
  margin: auto;
`
const ProfileName = styled.h3 `
  font-family: 'Dancing Script', cursive;
  font-size: 1.2em;
  color: #005753;
  padding: 0.25em;
  margin: auto;
  @media screen and (min-width: 760px){
    font-size: 1.3em;
  };
`
const ProfileImage = styled.img `
  height: 50px;
  width: auto;
  margin: auto;
`
const ScoreContainer = styled.div `
  width: 60%;
  margin: auto;
`
const Item = styled.p `
  width: 95%;
  border: 1px solid #007FFF;
  border-radius: 5px;
  margin: 0.25em auto;
`
const Score = styled.span `
  font-size: 1.2em;
  color:#005753;
`
const TotalScore = styled(Score) `
  color: #d3281c;
`
const AdaptedFooter = styled(Footer) `
  position: relative;
`

class Leaderboard extends React.Component {
  //sorts the users according to their score
  usersLeaderboard = () => {
      const usersArr = Object.values(this.props.users);
      return usersArr.sort((a, b) => {
        return (b.score - a.score);
    });
  }

  //calculates the score for each user
  calcUserScore = () => {
    Object.values(this.props.users).forEach((user) => {
      let currentUser = user.id;
      let userAnswersNo = Object.keys(user.answers).length;
      let userQuestionNo = user.questions.length;
      let totalScore = userAnswersNo + userQuestionNo;
      //adds score key to the user object
      this.props.dispatch(addScoreToUserObj(currentUser, totalScore));
    });
  }

  componentDidMount(){
    this.calcUserScore()
  }

  render() {
    //let currentLeaderBoard = this.usersLeaderboard();
    if (this.props.loggedInUser === '') {
      //alerts the user
      Swal.fire({
        title: 'You are not logged in. Please log in!',
        icon: 'warning',
        iconColor: '#d3281c' ,
        confirmButtonColor: '#007FFF'
      });
      return (
        <Redirect to={{
            pathname: '/login',
            state: {referrer: '/leaderboard'}
        }}/>
      )
    } else {
      let currentLeaderBoard = this.usersLeaderboard();
      const avatarURLs = {
        sarahedo : sarahEdoAvatar,
        tylermcginnis : tylerMcginnisAvatar,
        johndoe : johnDoeAvatar
      };

      return (
        <React.Fragment>
          <Header/>
          <Board>
            {/* sorts the users by score and generates user card */}
            {currentLeaderBoard.map(user => {
              return (
                <UserCard key={user.id}>
                  <User>
                    <ProfileImage className="userImg" src={avatarURLs[user.id]} alt="userAvatar"/>
                    <ProfileName className="userName">{user.name}</ProfileName>
                  </User>
                  <ScoreContainer>
                    <Item> Answered questions:
                      <Score> {Object.keys(user.answers).length}</Score>
                    </Item>
                    <Item> Created questions:
                      <Score> {user.questions.length}</Score>
                    </Item>
                    <Item> Score:
                      <TotalScore> {user.score}</TotalScore>
                    </Item>
                  </ScoreContainer>
                </UserCard>
              )
            })
          }
          </Board>
          <AdaptedFooter/>
        </React.Fragment>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    loggedInUser: state.users.loggedInUser
  };
};

export default connect(mapStateToProps)(Leaderboard);