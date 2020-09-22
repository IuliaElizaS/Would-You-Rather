import React from 'react';
import { connect } from 'react-redux';
import {Redirect } from 'react-router-dom';
import {setCurrentQuestion} from '../actions/questionA';
import '../style/App.css';

class QuestionsList extends React.Component {

    //adds to the Redux state the  current question
    setQuestion = (questionId) => {
        this.props.dispatch(setCurrentQuestion(questionId));
        return(
            <Redirect to= {{
            pathname: `/questions/:${questionId}`,
            state: {referrer: '/'}
            }}/>
        )
    }

    render (){
        if (this.props.questionsToBeDisplayed.length > 0) {
            /* sorts the questions by timestamps ... the newest first */
            const sortedQuestions = this.props.questionsToBeDisplayed.sort((a,b) => (a.timestamp - b.timestamp));

            return (
                <ol className="listContainer">
                    {sortedQuestions.map(qObj => {
                        return (
                            <li key={qObj.id} onClick={() => this.setQuestion(qObj.id)}>
                                Would you rather {qObj.optionOne.text} or {qObj.optionTwo.text}?
                            </li>
                        )
                    })
                    }
                </ol>
            )
        }else {
            return (
                <ol className="listContainer">
                    <li>There is no question to match your filter.</li>
                </ol>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.questions.questions,
        questionsToBeDisplayed: state.questions.questionsToBeDisplayed,
        loggedInUser: state.users.loggedInUser
    };
};

export default connect(mapStateToProps)(QuestionsList);