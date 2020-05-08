import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import {addScoreToUserObj} from '../actions/userA';
import '../style/App.css';
class Leaderboard extends React.Component {
    //adds score key to the user object
    componentWillMount() {
        this.props.dispatch(addScoreToUserObj(this.props.users))
    };
    usersLeaderboard = () => {
        usersArr = Object.keys(this.props.users);
        return usersArr.sort((a, b) => {
            return (a.score - b.score)
        });
    }
    render() {
        if (this.props.logedInUser == undefined) {
            alert('You are not loged in. Please log in.');
            return (
                <Redirect to={{
                    pathname: '/login',
                    state: {referrer: '/leaderboard'}
                }}/>
            )
        } else {
            return (
                <React.Fragment>
                    <Header/>
                    <main className="leaderboard">
                        <ul className="list">
                          {/* sorts the users by score and generates user card */}
                          {this.usersLeaderboard.map(user => {
                            return (
                              <li className="card" key={`${user.id}`}>
                                <div className="user">
                                  <img src={`${user.avatarURL}`} alt="userAvatar"/>
                                  <div className="userName">${user.name}</div>
                                </div>
                                <div className="scoreContainer">
                                  <p className="item"> Answered
                                    questions: <span>${Object.keys(user.answers).length}</span></p>
                                  <p className="item"> Created
                                    questions: <span>${user.questions.length}</span></p>
                                  <p className="score"> Score: <span>${user.score}</span></p>
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
    users: state.users,
    logedInUser: state.logedInUser,
  };
};

export default connect(mapStateToProps)(Leaderboard);