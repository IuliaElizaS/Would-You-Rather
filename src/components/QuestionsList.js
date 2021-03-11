import React from 'react';
import { connect } from 'react-redux';
import {Route, NavLink, Redirect } from 'react-router-dom';
import Question from './Question';
import {setQuestionsListStatus, setCurrentQuestion} from '../actions/questionA';
import styled from 'styled-components';

const ListContainer = styled.ol `
  width: 100%;
  margin: auto auto auto 0;
  list-style-type: none;
  padding: 0.25em;
`
const QuestionText = styled.li `
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.9em;
  text-align: left;
  padding: 0.3em 0;
  @media screen and (min-width: 760px){
    font-size: 1em;
  };
`
const QuestionLink = styled(NavLink) `
  text-decoration: none;
  color: #000;
  &:hover {
    text-decoration: underline;
    text-decoration-color: #007FFF;
    text-decoration-thickness: 0.2em;
  };
  &:focus {
    text-decoration: underline;
    text-decoration-color: #007FFF;
    text-decoration-thickness: 0.2em;
  }
`
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
        let currentUser = this.props.users[this.props.loggedInUser];
        let userAnsweredQ = currentUser.answers;

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
          console.log('should re render');
          this.props.dispatch(setQuestionsListStatus('listChanged'));
        }
    }

    render (){
        let filteredQuestions = this.filterQuestions();
        if (filteredQuestions.length > 0) {
            // sorts the questions by timestamps ... the newest first
            const sortedQuestions = filteredQuestions.sort((a,b) => (a.timestamp - b.timestamp));

            return (
                <React.Fragment>
                    <ListContainer key={this.props.questionsListStatus} className="listContainer">
                        {sortedQuestions.map((qObj, index) => {
                            return (
                                <QuestionText key={index} onClick={() => this.setQuestion(qObj.id)}>
                                    <QuestionLink to={`/questions/:${qObj.id}`}>
                                        Would you rather {qObj.optionOne.text} or {qObj.optionTwo.text}?
                                    </QuestionLink>
                                </QuestionText>
                            )
                        })
                        }
                    </ListContainer>
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
        loggedInUser: state.users.loggedInUser,
        users: state.users.users
    };
};

export default connect(mapStateToProps)(QuestionsList);