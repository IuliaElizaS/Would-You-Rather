import React from 'react';
import { connect } from 'react-redux';
import {Route, NavLink, Redirect } from 'react-router-dom';
import Question from './Question';
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
    //filters the questions according to the user's option: answered or unanswered
    filterQuestions = () => {
        let filteredQuestArr;
        let questionsArr = Object.values(this.props.questions);
        let userAnsweredQ = this.props.loggedInUser.answers;

        if (this.props.wantedQuestionsList === 'unansweredQuestions') {
            filteredQuestArr = questionsArr.filter((question) => {
                return userAnsweredQ[question.id] === undefined;
            })
        } else {
            filteredQuestArr = questionsArr.filter((question) => {
                return userAnsweredQ.hasOwnProperty(question.id);
            })
        };
        return filteredQuestArr;
    }

    componentDidMount(){
        if (this.props.questionsListStatus === 'shouldChange') {
          this.forceUpdate()
        }
    }

    render (){
        const filteredQuestions = this.filterQuestions();
        if (filteredQuestions.length > 0) {
            /* sorts the questions by timestamps ... the newest first */
            const sortedQuestions = filteredQuestions.sort((a,b) => (a.timestamp - b.timestamp));

            return (
                <React.Fragment>
                    <ol key={this.props.questionsListStatus} className="listContainer">
                        {sortedQuestions.map((qObj, index) => {
                            return (
                                <li className="question" key={index} onClick={() => this.setQuestion(qObj.id)}>
                                    <NavLink to={`/questions/:${qObj.id}`}>
                                        Would you rather {qObj.optionOne.text} or {qObj.optionTwo.text}?
                                    </NavLink>
                                </li>
                            )
                        })
                        }
                    </ol>
                    <Route path="/questions/:id" component={Question} />
                </React.Fragment>
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
        wantedQuestionsList: state.questions.wantedQuestionsList,
        questionsListStatus: state.questions.questionsListStatus,
        loggedInUser: state.users.loggedInUser
    };
};

export default connect(mapStateToProps)(QuestionsList);