import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {saveQuestion} from '../middleware/middleware';
import Header from './Header';
import Footer from './Footer';
import '../style/App.css';


class NewQuestion extends React.Component {

  //save question to data base and updates the user
  saveNewQuestion = () => {
    const option1 = document.getElementById('option1');
    const option1text = option1.value;
    const option2 = document.getElementById('option2');
    const option2text = option2.value;
    const newQuestion = {
      author : this.props.loggedInUser,
      optionOneText : option1text,
      optionTwoText : option2text
    };

    this.props.dispatch(saveQuestion(newQuestion));
    alert('your question was saved');
  }

  render (){
    if (this.props.loggedInUser === '') {
      alert('You are not logged in. Please log in.');
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
          <form className='newQuestion'>
            <h3 className="questionText"> Would you rather ... </h3>
            <input id="option1" type="text" placeholder="option one"></input>
            <input id="option2" type="text" placeholder="option two"></input>
            <input type="button" id="saveBtn" value="Save question" onClick={this.saveNewQuestion}></input>
          </form>
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

