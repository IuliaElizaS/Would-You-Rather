import React from 'react';
import { connect } from 'react-redux';
import {setCurrentQuestion} from '../actions/questionA';
import voted from '../utils/best-seller.png';
import '../style/App.css';


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
        };
        if (this.props.question.optionTwo.votes.includes(this.props.loggedInUser)) {
        options[1].style.visibility = "visible";
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
            <section className="answers">
                <div className="optionBox">
                    <div className="optionWrapper">
                    <img className="vote" src={voted} alt="icon of a star"></img>
                    <h4 id="firstOption">{this.props.question.optionOne.text}</h4>
                    <p>Voted by <span>{this.props.question.optionOne.votes.length}</span> people</p>
                    <p>Representing <span>{this.calcPercentage(this.props.question.optionOne.votes.length)}</span>% of the votes</p>
                    </div>
                    <div className="connector">or</div>
                    <div className="optionWrapper">
                    <img className="vote" src={voted} alt="icon for voted option"></img>
                    <h4 id="secondOption">{this.props.question.optionTwo.text}</h4>
                    <p>Voted by <span>{this.props.question.optionTwo.votes.length}</span> people</p>
                    <p>Representing <span>{this.calcPercentage(this.props.question.optionTwo.votes.length)}</span>% of the votes</p>
                    </div>
                </div>
                <p className="details">The yellow star marks your answer for this question</p>
                <br></br>
                <div className="attribution">Icon made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </section>
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