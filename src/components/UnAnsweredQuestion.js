
import React from 'react';
import { connect } from 'react-redux';
import {saveAnswer} from '../middleware/middleware';
import {addAnswerToState, setQuestionsListStatus} from '../actions/questionA';
import {updateUserAnswers} from '../actions/userA';
import '../style/App.css';

class UnAnsweredQuestion extends React.Component {

  //validates the vote
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

    //saves the vote
    saveVote = (votedOption) => {
        const answer = {
            authedUser: this.props.loggedInUser,
            qid: this.props.currentQuestion,
            answer: votedOption
        };
        //saves the vote, updates Question and User
        this.props.dispatch(saveAnswer(answer));
        this.props.dispatch(addAnswerToState(answer));
        this.props.dispatch(updateUserAnswers(answer));
        this.props.dispatch(setQuestionsListStatus('shouldChange'));
        alert('Your answer was saved.');
    }

    render () {
        const question = this.props.questions[this.props.currentQuestion];
        return(
            <section className="answers">
                <form className="optionBox">
                    <input id="optionOne" type="checkbox" name="firstAnswerOption" value={question.optionOne.text}></input>
                    <label htmlFor="optionOne">{question.optionOne.text}</label>
                    <span className="connector">or</span>
                    <input id="optionTwo" type="checkbox" name="secondAnswerOption" value={question.optionTwo.text}></input>
                    <label htmlFor="optionTwo">{question.optionTwo.text}?</label>
                    <input type="button" id="submitBtn" value="Save answer" onClick={this.validateVote}></input>
                </form>
                <p className="details">Only one answer is accepted</p>
            </section>
        )
        }
};

const mapStateToProps = (state) => {
    return {
        questions: state.questions.questions,
        currentQuestion: state.questions.currentQuestion,
        loggedInUser: state.users.loggedInUser
    };
};

export default connect(mapStateToProps)(UnAnsweredQuestion);