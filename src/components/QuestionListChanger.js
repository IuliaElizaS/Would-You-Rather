import React from 'react'
import { connect } from 'react-redux'
import './App.css'


class QuestionListChanger extends React.Component{
  render() {
    return(
      <div className="questionListChanger">
      {/*On option change, rendered question list */ }
        <select value={'selectedoption'}>
           <option value="unansweredQuestions">Unanswered Questions</option>
           <option value="answeredQuestions">Answered Questions</option>
        </select>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions,
  };
};


export default connect(mapStateToProps)(QuestionListChanger);

