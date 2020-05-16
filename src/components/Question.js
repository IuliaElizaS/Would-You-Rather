import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {saveAnswer} from '../actions/middleware';
import NavBar from './NavBar';
import UserBar from './UserBar';
import Footer from './Footer';
import '../style/App.css';

class Question extends React.Component {

  questionAuthor = this.props.users[this.props.authorId];
  //calculates what percentage (out of the total votes) represents the votes for an option
  calcPercentage = (optionVotes) => {
    const totalVotes = this.props.question.optionOne.votes.length + this.props.question.optionTwo.votes.length;
    const percentage = (optionVotes/ totalVotes)*100;
    return Math.round(percentage);
  }

  //marks the voted option by the user
  highlightVotedOption = () => {
    const firstOption = document.getElementById('optionOne');
    const secondOption = document.getElementById('optionTwo');
    if (this.props.question.optionOne.votes.includes(this.props.logedInUser.id)) {
      firstOption.checked = true;
      firstOption.style.backgroundColor = "#00ff45"
    };
    if (this.props.question.optionTwo.votes.includes(this.props.logedInUser.id)) {
      secondOption.checked = true;
      secondOption.style.backgroundColor = "#00ff45"
    }
  }

  //saves the voted option
  saveVote = (evt) => {
    const votedOption = evt.target.id;

    const answer = {
      authedUser: this.props.logedInUser.id,
      qid: this.props.question.id,
      answer: votedOption
    };
    //saves the vote, updates Question, User and Score
    this.props.dispatch(saveAnswer(answer));
  }

  render (){
    if (this.props.logedInUser == undefined) {
      alert('You are not loged in. Please log in.');
      return(
          <Redirect to= {{
          pathname: '/login',
          state: {referrer: `/questions/:${this.props.question.id}`},
          }} />
      )
    }else{
        return (
          <div className="questionPage">
            <NavBar/>
            <UserBar/>
            <React.Fragment>
              <main className="questionBox">
                <div className="creatorWrapper">
                  <img src={this.props.questionAuthor.avatarURL} alt="authorAvatar"></img>
                  <div className="authorName">{this.props.questionAuthor.name}<span>asks:</span></div>
                </div>
                <h3>Would you rather ... </h3>
                {this.props.logedInUser.answers.includes(this.props.question.id)
                  ? (<div className="optionBox">
                      <div className="optionWrapper">
                        <input id="firstOption" type="checkbox" value={this.props.question.optionOne.text}></input>
                        <p>Voted by <span>{this.props.question.optionOne.votes.length}</span> people</p>
                        <p>Reprezenting <span>{this.calcPercentage(this.props.question.optionOne.votes.length)}</span>% of the votes</p>
                      </div>
                      <div className="optionWrapper">
                        <input id="secondOption" type="checkbox" value={this.props.question.optionTwo.text}></input>
                        <p>Voted by <span>{this.props.question.optionTwo.votes.length}</span> people</p>
                        <p>Reprezenting <span>{this.calcPercentage(this.props.question.optionTwo.votes.length)}</span>% of the votes</p>
                      </div>
                    </div>)
                  :(<form className="optionBox">
                      <input id="optionOne" type="checkbox" value={this.props.question.optionOne.text}></input>
                      <input id="optionTwo" type="checkbox" value={this.props.question.optionTwo.text}></input>
                      <button id="submitBtn" onClick={this.saveVote}></button>
                    </form>
                    )
                }
                {this.highlightVotedOption()}
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
    users: state.users,
    question: state.currentQuestion,
    authorId: state.currentQuestion.author,
    logedInUser: state.logedInUser,
  };
};

export default connect(mapStateToProps)(Question);