import React from 'react';
import {connect} from 'react-redux';
import {Redirect } from 'react-router-dom';
import Header from './Header';
import QuestionsListChanger from './QuestionsListChanger';
import QuestionsList from './QuestionsList';
import Footer from './Footer';
import styled from 'styled-components';

const TopContainer = styled.div `
  width: 95vw;
  height: 95vh;
  margin: auto;

  @media screen and (min-width: 760px){
    
  };
  @media screen and (min-width: 950px){
    
  };
`
const Section = styled.section `
  width: 95vw;
  min-height: 60vh;
  margin: auto;
  @media screen and (min-width: 760px){

  };
  @media screen and (min-width: 950px){
  };
`

class Home extends React.Component {

  render (){
    //checks if the user is  logged in
    if (this.props.loggedInUser) {
      return (
        <TopContainer>
          <Header/>
          <React.Fragment>
            <Section>
              <QuestionsListChanger/>
              <QuestionsList/>
            </Section>
          </React.Fragment>
          <Footer/>
        </TopContainer>
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
