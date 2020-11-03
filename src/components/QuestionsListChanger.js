import React from 'react';
import {connect} from 'react-redux';
import {setWantedQuestionsList} from '../actions/questionA';
import '../style/App.css';

class QuestionsListChanger extends React.Component {

  //sets the wanted questions
  setWantedQuestions = (wantedList = 'unansweredQuestions') => {
    this.props.dispatch(setWantedQuestionsList(wantedList))
  }

  render (){
    this.setWantedQuestions();
    return (
    <div className="questionListChanger">
        <select onChange={(event) => this.setWantedQuestions(event.target.value)}>
            <option value="unansweredQuestions">Unanswered Questions</option>
            <option value="answeredQuestions">Answered Questions</option>
        </select>
    </div>
    )
  }
}

export default connect()(QuestionsListChanger);
