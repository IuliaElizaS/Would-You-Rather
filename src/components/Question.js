import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {saveAnswer} from '../middleware/middleware';
import {addAnswerToState} from '../actions/questionA';
import {updateUserAnswers, updateUserScore} from '../actions/userA';
import NavBar from './NavBar';
import UserBar from './UserBar';
import Footer from './Footer';
import sarahEdoAvatar from '../utils/PixabayAvatars/user-310807_640.png';
import tylerMcginnisAvatar from '../utils/PixabayAvatars/man-3357275_640.png';
import johnDoeAvatar from '../utils/PixabayAvatars/avatar-1300331_640.png';
import voted from '../utils/best-seller.png';
import '../style/App.css';

class Question extends React.Component {
  
  //calculates what percentage (out of the total votes) represents the votes for an option
  calcPercentage = (optionVotes) => {
    const totalVotes = this.props.question.optionOne.votes.length + this.props.question.optionTwo.votes.length;
    const percentage = (optionVotes/ totalVotes)*100;
    return Math.round(percentage);
  }

  //marks the voted option by the user
  highlightVotedOption = () => {
    const options = document.getElementsByClassName('vote');
    if (this.props.question.optionOne.votes.includes(this.props.loggedInUser.id)) {
      options[0].style.visibility = "visible";
    };
    if (this.props.question.optionTwo.votes.includes(this.props.loggedInUser.id)) {
      options[1].style.visibility = "visible";
    }
  }

  //validates the voted option
  validateVote = () => {
    const optionOneCheckbox = document.getElementById('optionOne');
    const optionTwoCheckbox = document.getElementById('optionTwo');

    if (optionOneCheckbox.checked && optionTwoCheckbox.checked) {
      alert('You can choose only one answer');
    } else if ( !optionOneCheckbox.checked && !optionTwoCheckbox.checked) {
      alert('You must choose one answer and check it');
    } else if ( optionOneCheckbox.checked && !optionTwoCheckbox.checked) {
      this.saveVote('optionOne');
    } else if ( !optionOneCheckbox.checked && optionTwoCheckbox.checked) {
      this.saveVote('optionTwo');
    }
  }

  //saves the voted option
  saveVote = (votedOption) => {
    const answer = {
      authedUser: this.props.loggedInUser.id,
      qid: this.props.question.id,
      answer: votedOption
    };
    //saves the vote, updates Question, User and Score
    this.props.dispatch(saveAnswer(answer));
    this.props.dispatch(addAnswerToState(answer));
    this.props.dispatch(updateUserAnswers(answer));
    this.props.dispatch(updateUserScore(answer.authedUser))
  }

  //TO DO redirects the user to the home page
  returnHome = () => {

  }

  componentDidMount() {
    this.highlightVotedOption();
  }

  render (){
    if (this.props.loggedInUser === '') {
      alert('You are not logged in. Please log in.');
      return(
          <Redirect to= {{
          pathname: '/login',
          state: {referrer: `/questions/:${this.props.question.id}`},
          }} />
      )
    }else{
      const questionAuthor = this.props.users[this.props.authorId];
      const avatarURLs = {
        sarahedo : sarahEdoAvatar,
        tylermcginnis : tylerMcginnisAvatar,
        johndoe : johnDoeAvatar
      };
      const authorAvatar = avatarURLs[this.props.authorId];
      const answeredQuestionsArr = Object.keys(this.props.loggedInUser.answers);
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
              {answeredQuestionsArr.includes(this.props.question.id)
                ? (<section className="answers">
                    <div className="optionBox">
                      <div className="optionWrapper">
                        <img className="vote" src={voted} alt="icon of a star"></img>
                        <h4 id="firstOption">{this.props.question.optionOne.text}</h4>
                        <p>Voted by <span>{this.props.question.optionOne.votes.length}</span> people</p>
                        <p>Representing <span>{this.calcPercentage(this.props.question.optionOne.votes.length)}</span>% of the votes</p>
                      </div>
                      <div className="connector">or</div>
                      <div className="optionWrapper">
                      <img className="vote" src={voted} alt="icon for voted option"></img>
                        <h4 id="secondOption">{this.props.question.optionTwo.text}</h4>
                        <p>Voted by <span>{this.props.question.optionTwo.votes.length}</span> people</p>
                        <p>Representing <span>{this.calcPercentage(this.props.question.optionTwo.votes.length)}</span>% of the votes</p>
                      </div>
                    </div>
                    <p className="details">The yellow star marks your answer for this question</p>
                    <br></br>
                    <div className="attribution">Icon made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                  </section>
                  )
                  :(<section className="answers">
                      <form className="optionBox">
                        <input id="optionOne" type="checkbox" name="firstAnswerOption" value={this.props.question.optionOne.text}></input>
                        <label htmlFor="optionOne">{this.props.question.optionOne.text}</label>
                        <span className="connector">or</span>
                        <input id="optionTwo" type="checkbox" name="secondAnswerOption" value={this.props.question.optionTwo.text}></input>
                        <label htmlFor="optionTwo">{this.props.question.optionTwo.text}?</label>
                        <input type="button" id="submitBtn" value="Save answer" onClick={this.validateVote}></input>
                      </form>
                      <p className="details">Only one answer is accepted</p>
                    </section>
                  )
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
    question: state.questions.currentQuestion,
    authorId: state.questions.currentQuestion.author,
    loggedInUser: state.users.loggedInUser
  };
};

export default connect(mapStateToProps)(Question);