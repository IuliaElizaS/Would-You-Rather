import React from 'react';
import {connect} from 'react-redux';
import {setWantedQuestionsList} from '../actions/questionA';
import styled from 'styled-components';

const QuestionsDropdown = styled.select `
  display: block;
  height: 2em;
  margin: 1em auto;
  border-radius: 5px;
  border: 0.15em solid #005753;;
  padding: 0.25em;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1em;
  &:hover{
    border-color: #d3281c;
  };
  &:focus {
    border-color: #d3281c;
  };
  @media screen and (min-width: 420px){
    margin: auto auto auto 0;
  };
  @media screen and (min-width: 760px){
    font-size: 1.1em;
  };
`

class QuestionsListChanger extends React.Component {

  //sets the wanted questions
  setWantedQuestions = (wantedList = 'unansweredQuestions') => {
    this.props.dispatch(setWantedQuestionsList(wantedList))
  }

  render (){
    this.setWantedQuestions();
    return (
      <QuestionsDropdown onChange={(event) => this.setWantedQuestions(event.target.value)}>
          <option value="unansweredQuestions">Unanswered Questions</option>
          <option value="answeredQuestions">Answered Questions</option>
      </QuestionsDropdown>
    )
  }
}

export default connect()(QuestionsListChanger);
