import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {saveQuestion} from '../middleware/middleware';
import Header from './Header';
import Footer from './Footer';
import Swal from 'sweetalert2';
import styled from 'styled-components';

const NewQuestionForm = styled.form `
  width: 95%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-items: space-between;
  font-family: 'Josefin Sans', sans-serif;
  text-align: center;
  border-radius: 5px;
  margin: auto;
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
const AnswerOption = styled.input `
  width: 95%;
  display: block;
  border: 2px solid #007FFF;
  border-radius: 5px;
  padding: 0.25em;
  margin: 0.5em auto;
  font-size: 1.1em;
  &:hover{
    border-color: #d3281c;
  };
  &:focus {
    border-color: #d3281c;
  };
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


class NewQuestion extends React.Component {
  //validates the new question form
  validateQuestion = (e) => {
    e.preventDefault();
    const option1 = document.getElementById('option1');
    const option2 = document.getElementById('option2');

    if (option1.value === "" || option1.value === "") {
      Swal.fire({
          title: 'Please fill both answer boxes.',
          icon: 'warning',
          iconColor: '#d3281c'
      });
    } else {
      this.saveNewQuestion(option1, option2);
    }
  }
  //save question to data base and updates the user
  saveNewQuestion = (option1, option2) => {
    const newQuestion = {
      author : this.props.loggedInUser,
      optionOneText : option1.value,
      optionTwoText : option2.value
    };

    this.props.dispatch(saveQuestion(newQuestion));

    //alerts the user
    Swal.fire({
      title: 'Your question was saved!',
      icon: 'success',
      iconColor: '#517100',
      timer: 2500,
    });

    this.clearInput(option1, option2);
  }

  //clears the input boxes
  clearInput = (option1, option2) => {
    option1.value = '';
    option2.value = '';
  }

  render (){
    if (this.props.loggedInUser === '') {
      //alerts the user
      Swal.fire({
        title: 'You are not logged in. Please log in!',
        icon: 'warning',
        iconColor: '#d3281c',
        confirmButtonColor: '#007FFF'
      });
      return(
        <Redirect to= {{
          pathname: '/login',
          state: {referrer: '/add'}
        }}/>
      )
    }else{
      return (
        <React.Fragment>
          <Header/>
          <NewQuestionForm onSubmit={this.validateQuestion}>
            <Title>Would you rather ... </Title>
            <InfoText>&#42; Please fill in your desired poll</InfoText>
            <AnswerOption id="option1" type="text" name="firstOption" placeholder="first option"></AnswerOption>
            <AnswerOption id="option2" type="text" name="secondOption" placeholder="second option"></AnswerOption>
            <Button type="submit">Save</Button>
          </NewQuestionForm>
          <Footer/>
        </React.Fragment>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions.questions,
    loggedInUser: state.users.loggedInUser,
  };
};

export default connect(mapStateToProps)(NewQuestion);

