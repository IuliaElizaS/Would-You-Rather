import React from 'react';
import {connect} from 'react-redux';
import {Redirect } from 'react-router-dom';
import Header from './Header';
import QuestionsListChanger from './QuestionsListChanger';
import QuestionsList from './QuestionsList';
import Footer from './Footer';
import '../style/App.css';

class Home extends React.Component {

  render (){
    //checks if the user is  logged in
    if (this.props.loggedInUser) {
      return (
        <div>
          <Header/>
          <React.Fragment>
            <main className='mainContainer'>
              <QuestionsListChanger/>
              <QuestionsList/>
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
    loggedInUser: state.users.loggedInUser
  }
};

export default connect(mapStateToProps)(Home);
