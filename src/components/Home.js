import React from 'react';
import {connect} from 'react-redux';
import {Redirect } from 'react-router-dom';
import Header from './Header';
import QuestionsListChanger from './QuestionsListChanger';
import QuestionsList from './QuestionsList';
import Footer from './Footer';
import styled from 'styled-components';

const Section = styled.section `
  margin: 2em 1em;
`

class Home extends React.Component {

  render (){
    //checks if the user is  logged in
    if (this.props.loggedInUser) {
      return (
        <React.Fragment>
          <Header/>
          <Section>
            <QuestionsListChanger/>
            <QuestionsList/>
          </Section>
          <Footer/>
        </React.Fragment>
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
    loggedInUser: state.users.loggedInUser,
  }
};

export default connect(mapStateToProps)(Home);
