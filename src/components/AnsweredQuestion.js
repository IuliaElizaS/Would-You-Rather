import React from 'react';
import { connect } from 'react-redux';
import {setCurrentQuestion} from '../actions/questionA';
import voted from '../utils/best-seller.png';
import styled from 'styled-components';

const AnsweredQuestionSection = styled.section `
  width: 95%;
  margin: 1em auto;
  text-align: center;
`
const OutsideContainer = styled.section `
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-items: space-between;
  font-family: 'Josefin Sans', sans-serif;
  margin: auto;
  @media screen and (min-width: 640px){
    flex-direction: row;
  };
`
const Title = styled.h3 `
  min-width: 90%;
  font-family: 'Dancing Script', cursive;
  font-size: 1.5em;
  color: #005753;
  @media screen and (min-width: 760px){
    font-size: 1.7em;
  };
`
const OptionWrapper = styled.div `
  width: 85%;
  border: 2px solid #005753;
  border-radius: 5px;
  margin: 0.5em auto;
  display: flex;
  flex-wrap: nowrap;
  justify-items: center;
  &:hover{
    border-color: #d3281c;
  };
  &:focus {
    border-color: #d3281c;
  };
  @media screen and (min-width: 640px){
    width: 45%;
  };
`
const VoteIcon = styled.img `
  width: 30px;
  margin: auto;
  display: inline-flex;
  visibility: hidden;
  @media screen and (min-width: 760px){
    width: 40px;
  };
`
const InsideContainer = styled.div `
  margin: auto;
  @media screen and (min-width: 760px){
    font-size: 1.1em;
  };
`
const AnswerOption = styled.h4 `
  font-size: 1em;
  padding: 0.25em;
  margin: auto;
  @media screen and (min-width: 760px){
    font-size: 1.1em;
  };
`
const Item = styled.p `
  font-family: 'Dancing Script', cursive;
  width: 95%;
  margin: auto;
`
const Statistic = styled.span `
  font-size: 1.2em;
  color:#d3281c;
`
const Connector = styled.p `
  font-size: 1.1em;
  color: #005753;
  padding: 0.25em;
  @media screen and (min-width: 640px){
    font-size: 1.2em;
  };
`
const InfoText = styled.p `
  width: 80%;
  font-size: 1em;
  text-align: justify;
  padding: 0.25em;
  margin: auto;
`
const Attribution = styled.p `
  font-size: 0.8em;
  text-align: justify;
  padding: 0.25em;
  margin: 1em auto;
`


class AnsweredQuestion extends React.Component {

  //calculates what percentage (out of the total votes) represents the votes for an option
    calcPercentage = (optionVotes) => {
        const totalVotes = this.props.question.optionOne.votes.length + this.props.question.optionTwo.votes.length;
        const percentage = (optionVotes/ totalVotes)*100;
        return Math.round(percentage);
    }

    //marks the voted option by the user
    highlightVotedOption = () => {
        const options = document.getElementsByClassName('vote');
        if (this.props.question.optionOne.votes.includes(this.props.loggedInUser)) {
        options[0].style.visibility = "visible";
        options[1].style.width = "0px";
        options[1].style.margin = "0px";
        };
        if (this.props.question.optionTwo.votes.includes(this.props.loggedInUser)) {
        options[1].style.visibility = "visible";
        options[0].style.width = "0px";
        options[0].style.margin = "0px";
        }
    }

    componentDidMount() {
        this.highlightVotedOption();
    }

    //clears the current Question in the state
    componentWillUnmount(){
        this.props.dispatch(setCurrentQuestion(''));
    }

    render (){
        return (
            <AnsweredQuestionSection>
                <OutsideContainer>
                    <Title>Would you rather ... </Title>
                    <OptionWrapper>
                      <VoteIcon className="vote" src={voted} alt="icon of a star"></VoteIcon>
                      <InsideContainer>
                        <AnswerOption id="firstOption">{this.props.question.optionOne.text}</AnswerOption>
                        <Item>Voted by <Statistic>{this.props.question.optionOne.votes.length}</Statistic> people</Item>
                        <Item>Representing <Statistic>{this.calcPercentage(this.props.question.optionOne.votes.length)}</Statistic>% of the votes</Item>
                      </InsideContainer>
                    </OptionWrapper>
                    <Connector>OR</Connector>
                    <OptionWrapper>
                      <VoteIcon className="vote" src={voted} alt="icon for voted option"></VoteIcon>
                      <InsideContainer>
                        <AnswerOption id="secondOption">{this.props.question.optionTwo.text}</AnswerOption>
                        <Item>Voted by <Statistic>{this.props.question.optionTwo.votes.length}</Statistic> people</Item>
                        <Item>Representing <Statistic>{this.calcPercentage(this.props.question.optionTwo.votes.length)}</Statistic>% of the votes</Item>
                      </InsideContainer>
                    </OptionWrapper>
                </OutsideContainer>
                <InfoText>&#42; The yellow star marks your answer for this question</InfoText>
                <br></br>
                <Attribution>Icon made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></Attribution>
            </AnsweredQuestionSection>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.questions.questions,
        currentQuestion: state.questions.currentQuestion,
        question: state.questions.questions[state.questions.currentQuestion],
        loggedInUser: state.users.loggedInUser
    };
};

export default connect(mapStateToProps)(AnsweredQuestion);