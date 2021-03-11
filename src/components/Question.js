import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import UnAnsweredQuestion from './UnAnsweredQuestion';
import AnsweredQuestion from './AnsweredQuestion';
import Swal from 'sweetalert2';
import sarahEdoAvatar from '../utils/PixabayAvatars/user-310807_640.png';
import tylerMcginnisAvatar from '../utils/PixabayAvatars/man-3357275_640.png';
import johnDoeAvatar from '../utils/PixabayAvatars/avatar-1300331_640.png';
import styled from 'styled-components';

const QuestionContainer = styled.main `
  width: 95%;
  margin: 2em auto;
  display: flex;
  flex-direction:column;
`
const AuthorContainer = styled.div `
  margin: auto;
  @media screen and (min-width: 760px){
    margin-left: 2em;
  };
`
const AuthorName = styled.h4 `
  display: inline-block;
  padding: 0.25em;
  margin: auto;
  @media screen and (min-width: 760px){
    font-size: 1.1em;
  };
`
const AuthorImage = styled.img `
  display: inline-block;
  width: 45px;
  margin: auto;
`

class Question extends React.Component {
  render (){
    if (this.props.loggedInUser === '') {
      Swal.fire({
        title: 'You are not logged in. Please log in!',
        icon: 'warning',
        iconColor: '#d3281c' ,
        confirmButtonColor: '#007FFF',
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
        <React.Fragment>
          <Header/>
          <QuestionContainer>
            <AuthorContainer>
              <AuthorImage src={authorAvatar} alt="authorAvatar"/>
              <AuthorName>{questionAuthor.name}<span> asked:</span></AuthorName>
            </AuthorContainer>
            {answeredQuestionsArr.includes(this.props.currentQuestion)
              ? <AnsweredQuestion/> : <UnAnsweredQuestion/>
            }
          </QuestionContainer>
          <Footer/>
        </React.Fragment>
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