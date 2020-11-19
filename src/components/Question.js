import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import UserBar from './UserBar';
import Footer from './Footer';
import UnAnsweredQuestion from './UnAnsweredQuestion';
import AnsweredQuestion from './AnsweredQuestion';
import Swal from 'sweetalert2';
import sarahEdoAvatar from '../utils/PixabayAvatars/user-310807_640.png';
import tylerMcginnisAvatar from '../utils/PixabayAvatars/man-3357275_640.png';
import johnDoeAvatar from '../utils/PixabayAvatars/avatar-1300331_640.png';
import '../style/App.css';

class Question extends React.Component {
  render (){
    if (this.props.loggedInUser === '') {
      Swal.fire({
        title: 'You are not logged in. Please log in!',
        icon: 'warning',
        timer: 2500,
      });
      return(
          <Redirect to= {{
          pathname: '/login',
          state: {referrer: `/questions/:${this.props.currentQuestion}`},
          }} />
      )
    }else{
      const question = this.props.questions[this.props.currentQuestion];
      const authorId = question.author;
      const questionAuthor = this.props.users[authorId];
      const avatarURLs = {
        sarahedo : sarahEdoAvatar,
        tylermcginnis : tylerMcginnisAvatar,
        johndoe : johnDoeAvatar
      };
      const authorAvatar = avatarURLs[authorId];
      const user = this.props.users[this.props.loggedInUser];
      let answeredQuestionsArr = Object.keys(user.answers);
      return (
        <div className="questionPage">
          <NavBar/>
          <UserBar/>
          <React.Fragment>
            <main className="questionBox">
              <div className="creatorWrapper">
                <img src={authorAvatar} alt="authorAvatar"></img>
                <div className="authorName">{questionAuthor.name}<span> asked:</span></div>
              </div>
              <h3>Would you rather ... </h3>
              {answeredQuestionsArr.includes(this.props.currentQuestion)
                ? <AnsweredQuestion/> : <UnAnsweredQuestion/>
              }
            </main>
          </React.Fragment>
          <Footer/>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    questions: state.questions.questions,
    currentQuestion: state.questions.currentQuestion,
    loggedInUser: state.users.loggedInUser
  };
};

export default connect(mapStateToProps)(Question);