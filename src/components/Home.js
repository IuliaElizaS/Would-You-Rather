import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {setCurrentQuestion} from '../actions/questionA';
import Header from './Header';
import Footer from './Footer';
import '../style/App.css';

class Home extends React.Component {

  state = {
    selectedOption: 'unansweredQuestions',    
  }

  toggleQuestionList = () => {
    if (this.state.selectedOption === 'unansweredQuestions') {
      this.setState({
        selectedOption: 'answeredQuestions'
       })
    }else{
      this.setState({
        selectedOption: 'unansweredQuestions'
       })
    }
  }

   // sorts the questions by timestamps
  arrangedQuestionList = () => {
    questionsArr = Object.keys(this.props.questions);
    return questionsArr.sort(compareFunction(a,b)
      {return (a.timestamp - b.timestamp)});
  }
    
  //adds to the state the  current question
  setQuestion = (questionId) => {
    this.props.dispatch(setCurrentQuestion(questionId));
  }

  render (){
    {/*checks if the user is  loged in */}
    if (this.props.logedInUser == undefined) {
      alert('You are not loged in. Please log in.');
      return(
        <Redirect to= {{
          pathname: '/login',
          state: {referrer: '/'}
        }}/>
      )
    }else{
      return (
        <React.Fragment>
          <Header/>
          <main className='mainContainer'>
            <div className="questionListChanger">
              <select value={this.state.selectedOption} onChange={this.toggleQuestionList}>
                <option value="unansweredQuestions">Unanswered Questions</option>
                <option value="answeredQuestions">Answered Questions</option>
              </select>
            </div>
            <div className="listContainer">
              <ul className="list"></ul>
              { /* filters the questionsList*/
                this.arrangedQuestionList.map(qObj => {
                  if (this.props.logedInUser.includes(qObj.id)) {
                    return (
                      <li key={qObj.id} onClick={this.setQuestion(qObj.id)}> 
                        <Link className="openQuestion" to=`/questions/:${qObj.id}`>
                        `Would you rather ${qObj.optionOne.text} or ${qObj.optionTwo.text}?`
                        </Link>
                      </li>
                  )
                }else{
                  return (
                    <div>  There is no question to match your filter. </div>
                  );
                }
              })
            }
          </main>
          <Footer/>
        </React.Fragment>
      )
    };
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions,
    logedInUser: state.logedInUser,
  };
};


export default connect(mapStateToProps)(Home);
