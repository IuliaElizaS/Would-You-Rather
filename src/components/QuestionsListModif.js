import React from 'react';
import { connect } from 'react-redux';
import {Redirect } from 'react-router-dom';
import {setCurrentQuestion} from '../actions/questionA';
import '../style/App.css';

class QuestionsList extends React.Component {

    state = {
        sortedQuestions: []
    }

    // filters the questionsList according to the user's option: answered or unanswered
    filterQuestions = () => {
        let filteredQuestions;
        const questionsArr = Object.values(this.props.questions);
        const userAnsweredQ = this.props.logedInUser.answers;
        console.log(this.props.questionsToBeDisplayed);

        if (this.props.questionsToBeDisplayed === 'unansweredQuestions') {
            filteredQuestions = questionsArr.filter((question) => {
                return userAnsweredQ.hasOwnProperty(question.id) === false;
            });
        } else {
            filteredQuestions = questionsArr.filter((question) => {
                return userAnsweredQ.hasOwnProperty(question.id);
            });
        };
        // sorts the questions by timestamps ... the newest first
        const sortedQuestionsArr = filteredQuestions.sort((a,b) => (a.timestamp - b.timestamp));
        this.setState({
            sortedQuestions: sortedQuestionsArr
        });
    }

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

    componentDidMount(){
        if (this.props.questions !== null && this.props.questions !== undefined){
            this.filterQuestions()
        }else{
            console.log ('question object empty');
        }
    };

    render (){
        let list;
        this.state.sortedQuestions.length > 0
            ? list = this.state.sortedQuestions.map(qObj => {
                return (
                    <li key={qObj.id} onClick={() => this.setQuestion(qObj.id)}>
                        Would you rather {qObj.optionOne.text} or {qObj.optionTwo.text}?
                    </li>
                )
            })
            : list = <div>There is no question to match your filter.</div>;
        return (
            <ol className="listContainer">
                {list}
            </ol>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.questions.questions,
        logedInUser: state.users.logedInUser
    };
};

export default connect(mapStateToProps)(QuestionsList);