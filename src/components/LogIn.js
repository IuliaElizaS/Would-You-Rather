import React from 'react';
import { connect } from 'react-redux';
import {setLoggedInUser} from '../actions/userA';
import Swal from 'sweetalert2';
import styled from 'styled-components';

const Container = styled.div `
  width: 95vw;
  height: 95vh;
  margin: auto;
  padding-top: 10%;
  font-size: 16px;
  @media screen and (min-width: 760px){
    font-size: 20px;
  };
  @media screen and (min-width: 950px){
    font-size: 22px;
  };
`
const Image = styled.img `
  width: 95%;
  height: auto;
  margin: auto;
  @media screen and (min-width: 420px){
    width: 80%;
  };
  @media screen and (min-width: 950px){
    width: 40%;
    float: left;
  };
`
const Title = styled.h1 `
  font-family: 'Dancing Script', cursive;
  font-size: 1.5em;
  color: #005753; 
  @media screen and (min-width: 760px){
    font-size: 1.7em;
  };
`
const LogInForm = styled.form `
  font-family: 'Josefin Sans', sans-serif;
  width: 85%;
  margin: auto;
  @media screen and (min-width: 950px){
    width: 50%;
    float: right;
    margin-right: 2%;
  };
`
const InfoText = styled.p `
  padding: 2em;
  margin: 1% auto;
  text-align: justify;
`
const UsersDropdown = styled.select `
  display: block;
  width: 80%;
  height: 2.5em;
  border-radius: 5px;
  border-color: #007FFF;
  padding: 0.25em;
  margin: auto;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1em;
  color: #005753;
`
const Button = styled.button `
  width: auto;
  height: 2em;
  border-color: #007FFF;
  border-radius: 5px;
  text-align: center;
  padding: 0.25em;
  margin: 10% auto;
  &:hover{
    border-color: #FF4500;
  }
  @media screen and (min-width: 760px){
    width: 40%;
  };
  @media screen and (min-width: 950px){
    width: 30%;@media screen and (min-width: 950px){
    width: 30%;
  };@media screen and (min-width: 950px){
    width: 30%;
    width: 30%;
  };
  };
`

class LogIn extends React.Component {

  constructor(props) {
    super(props);

    this.state={
      selectedUserId: ""
    };

    this.setUserId = this.setUserId.bind(this);
  }

  // sets the logged in user, after the user selects his name from the list
  setUserId = (evt) => {
    let selectedUser = evt.target.value;
    this.setState ({
    selectedUserId: selectedUser
    });
  };

  //after login, send user to Home page or back to the original page
  redirectUser = () => {
    if (this.props.location.state && this.props.location.state.referrer){
      this.props.history.push(this.props.location.state.referrer);
    } else {
      this.props.history.push("/");
    };
  }

  logInUser = (e) => {
    e.preventDefault();
    console.log(`the logged in user id is: ${this.state.selectedUserId}`);
    //checks if a user was selected
    if (this.state.selectedUserId){
      //saves the current user in the store
      this.props.dispatch(setLoggedInUser(this.state.selectedUserId));
      //redirects to home page or to the page he was before
      this.redirectUser();
    } else{
      Swal.fire({
        title: 'Please select your name.',
        icon: 'warning',
        timer: 2500,
      });
    }
  }

  render (){
    if (this.props.users){
    return (
      <Container>
        <Image src="img\question-mark-2110767_640.jpg" alt="question marks"></Image>
        <Title> Would you rather ... </Title>
        <LogInForm onSubmit={this.logInUser}>
            <InfoText> Welcome to the game. Please select your name from the list below and click on Log In button</InfoText>
            <UsersDropdown defaultValue="text" onChange={this.setUserId}>
              <option value="text" disabled>Please select your name</option>
              {//generates an entry for each user from the users object
              Object.entries(this.props.users).map( user => {
                return(
                  <option key={user[0]} value={user[1].id}>{user[1].name}</option>
                );
              })
            }
            </UsersDropdown>
            <Button type="submit" className="logInBtn">Log In</Button>
        </LogInForm>
      </Container>
    )
  }else{
    return null;
  }
  }
};

// gets the needed state from the redux store. The function receives as parameter the state stored in redux and returns a JavaScript object that will hold the data.
const mapStateToProps = (state) => {
    return {
      users: state.users.users
    };
};

export default connect(mapStateToProps)(LogIn);