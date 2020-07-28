import React from 'react';
import { connect } from 'react-redux';
import {Redirect } from 'react-router-dom';
import Header from './Header';
import QuestionsList from './QuestionsList';
import Footer from './Footer';
import '../style/App.css';

class Home extends React.Component {

  state = {
    questionsToBeDisplayed: 'unansweredQuestions'
  }

  // toggles answered and unanswered questions
  toggleQuestionList = (evt) => {
    /* if (this.state.questionsToDisplay === 'unansweredQuestions') {
      this.setState({
        selectedOption: 'answeredQuestions'
      })
    }else{
      this.setState({
        selectedOption: 'unansweredQuestions'
      })
    } */
    this.setState({
      questionsToBeDisplayed: evt.target.value
    })
  }

  render (){
    //checks if the user is  loged in
    if (this.props.logedInUser) {
      return (
        <div>
          <Header/>
          <React.Fragment>
            <main className='mainContainer'>
              <div className="questionListChanger">
                <select value={this.state.selectedOption} onChange={this.toggleQuestionList}>
                  <option value="unansweredQuestions">Unanswered Questions</option>
                  <option value="answeredQuestions">Answered Questions</option>
                </select>
              </div>
              <QuestionsList questionsToBeDisplayed={this.state.questionsToBeDisplayed}/> 
            </main>
          </React.Fragment>
          <Footer/>
        </div>
      )
    } else {
      return (
        <Redirect to= {{
          pathname: '/login',
          state: {referrer: '/'}
        }}/>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    logedInUser: state.users.logedInUser
  }
};

export default connect(mapStateToProps)(Home);
