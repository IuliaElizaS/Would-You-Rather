
import React from 'react';
import { connect } from 'react-redux';
import {saveAnswer} from '../middleware/middleware';
import {addAnswerToState, setQuestionsListStatus} from '../actions/questionA';
import {updateUserAnswers} from '../actions/userA';
import Swal from 'sweetalert2';
import styled from 'styled-components';

const UnAnsweredQForm = styled.form `
  width: 95%;
  margin: 1em auto;
`
const InsideContainer = styled.section `
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-items: space-between;
  font-family: 'Josefin Sans', sans-serif;
  border: 1.5px solid #007FFF;
  border-radius: 5px;
  margin: auto;
  @media screen and (min-width: 760px){
    flex-direction: row;
  };
`
const Title = styled.h3 `
  min-width: 95%;
  font-family: 'Dancing Script', cursive;
  font-size: 1.5em;
  color: #005753;
  @media screen and (min-width: 760px){
    font-size: 1.7em;
  };
`
const AnswerOption = styled.div `
  font-size: 1.1em;
  padding: 0.25em;
  margin: auto;
  @media screen and (min-width: 760px){
    font-size: 1.3em;
  };
`
const Connector = styled.p `
  font-size: 1.1em;
  color: #005753;
  padding: 0.25em;
  @media screen and (min-width: 760px){
    font-size: 1.3em;
  };
`
const InfoText = styled.p `
  font-size: 1em;
  text-align: justify;
  padding: 0.25em;
  margin: 1em auto;
`
const Button = styled.button `
  height: 1.8em;
  border: 0.15em solid #005753;
  background-color: #d3281c;
  border-radius: 5px;
  text-align: center;
  color: #FFF;
  padding: 0.25em;
  margin: auto;
  &:hover{
    border-color: #007FFF;
  };
  &:focus {
    border-color: #007FFF;
  };
`

class UnAnsweredQuestion extends React.Component {

  //validates the vote
    validateVote = (e) => {
        e.preventDefault();
        const optionOneCheckbox = document.getElementById('optionOne');
        const optionTwoCheckbox = document.getElementById('optionTwo');

        if (optionOneCheckbox.checked && optionTwoCheckbox.checked) {
            Swal.fire({
                title: 'You can choose only one answer.',
                icon: 'warning',
                iconColor: '#d3281c',
                timer: 2500,
            });
        } else if ( !optionOneCheckbox.checked && !optionTwoCheckbox.checked) {
            Swal.fire({
                title: 'You must choose one answer and check it.',
                icon: 'warning',
                iconColor: '#d3281c',
                timer: 2500,
            });
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

        Swal.fire({
            title: 'Your answer was saved.',
            icon: 'success',
            iconColor: '#517100',
            timer: 2500,
        });
    }

    render () {
        const question = this.props.questions[this.props.currentQuestion];
        return(
            <UnAnsweredQForm onSubmit={this.validateVote}>
                <InsideContainer>
                    <Title>Would you rather ... </Title>
                    <AnswerOption>
                      <input id="optionOne" type="checkbox" name="firstAnswerOption" value={question.optionOne.text}></input>
                      <label htmlFor="optionOne">{question.optionOne.text}</label>
                    </AnswerOption>
                    <Connector> OR </Connector>
                    <AnswerOption>
                      <input id="optionTwo" type="checkbox" name="secondAnswerOption" value={question.optionTwo.text}></input>
                      <label htmlFor="optionTwo">{question.optionTwo.text}?</label>
                    </AnswerOption>
                </InsideContainer>
                <InfoText>&#42; Only one answer is accepted</InfoText>
                <Button type="submit">Save</Button>
            </UnAnsweredQForm>
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