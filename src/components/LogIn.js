import React from 'react';
import { connect } from 'react-redux';
import {setLogedInUser} from '../actions/userA';
import '../style/App.css';


class LogIn extends React.Component {

  state={
    selectedUserId: ""
  };

  /* gets the selected user id, after the user selects his name from the list */
  getUserId = (event) => {
    this.setState ({
    selectedUserId: `${event.target.value}`
    })
};

  //after login, send user to Home page or back to the original page
  redirectUser = () => {
    if (this.props.location.state && this.props.location.state.referrer){
    this.props.history.push(this.props.location.state.referrer);
    } else {
    this.props.history.push("/");
    };
  }

  logInUser = () => {
      console.log(this.props.user)
      //checks if a user was selected
      if (this.state.selectedUserId === ""){
          alert('please select your name');
      } else{
        //sets the current user state
        this.props.dispatch(setLogedInUser(this.state.selectedUserId));
        //redirects to home page or to the page he was before
        this.redirectUser();
      }
  }

  render (){
    return (
      <div className="logIn">
        <div className="leftImg">
          <img src="img\question-mark-1421013_640.png" alt="question marks"></img>
        </div>
        <h1 className="title"> Would you rather ... </h1>
        <form className="logInform">
            <p className="infoText"> Wellcome to the game. Please select your name from the list below and click on Log In button</p>                 
            <select id="userDropdown" value="" onChange={this.getUserID}>
            { //generates an entry for each user from the user object
                Object.keys(this.props.users).map( user => {
                    console.log(`User ${user.name} entered`);
                    return(
                      <option key={`${user.name}`} value={`${user.id}`}>${user.name}</option>
                    );
                })
            }
            </select>
            <button className="logInBtn" onClick={this.logInUser}>Log In</button>
        </form>
      </div>
    )
  }
};

{/* gets the needed state from the redux store. The function receives as parameter the state stored in redux and returns a JavaScript object that will hold the data. */}

const mapStateToProps = (state) => {
    return {
      users: state.users
    };
};

export default connect(mapStateToProps)(LogIn);