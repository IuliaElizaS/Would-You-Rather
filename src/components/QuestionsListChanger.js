import React from 'react';
import {connect} from 'react-redux';
import {setQuestionsToBeDisplayed} from '../actions/questionA';
import '../style/App.css';

class QuestionsListChanger extends React.Component {

  // filters the questionsList according to the user's option: answered or unanswered
  filterQuestions = (wantedQuestionsList = 'unansweredQuestions') => {
    let filteredQuestArr;
    const questionsArr = Object.values(this.props.questions);
    const userAnsweredQ = this.props.loggedInUser.answers;

    if (wantedQuestionsList === 'unansweredQuestions') {
        filteredQuestArr = questionsArr.filter((question) => {
            return userAnsweredQ[question.id] === undefined;
        })
    } else {
        filteredQuestArr = questionsArr.filter((question) => {
            return userAnsweredQ.hasOwnProperty(question.id);
        })
    };

    this.props.dispatch(setQuestionsToBeDisplayed(filteredQuestArr))
  }

  render (){
    this.filterQuestions()
    return (
    <div className="questionListChanger">
        <select onChange={(event) => this.filterQuestions(event.target.value)}>
            <option value="unansweredQuestions">Unanswered Questions</option>
            <option value="answeredQuestions">Answered Questions</option>
        </select>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions.questions,
    loggedInUser: state.users.loggedInUser
  }
};

export default connect(mapStateToProps)(QuestionsListChanger);
