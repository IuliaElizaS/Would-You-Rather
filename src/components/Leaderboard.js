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
import '../style/App.css';
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
        icon: 'success',
        timer: 2500,
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
          <main className="leaderboard">
            <ul className="list">
              {/* sorts the users by score and generates user card */}
              {currentLeaderBoard.map(user => {
                return (
                  <li className="card" key={user.id}>
                    <div className="user">
                      <img className="userImg" src={avatarURLs[user.id]} alt="userAvatar"/>
                      <div className="userName">{user.name}</div>
                    </div>
                    <div className="scoreContainer">
                      <p className="item"> Answered questions:
                        <span className="spanItem"> {Object.keys(user.answers).length}</span>
                      </p>
                      <p className="item"> Created questions:
                        <span className="spanItem"> {user.questions.length}</span>
                      </p>
                      <p className="score"> Score:
                        <span className="totalScore"> {user.score}</span>
                      </p>
                    </div>
                  </li>
                )
              })
              }
            </ul>
          </main>
          <Footer/>
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