import React from 'react';
import { connect } from 'react-redux';
import {setLoggedInUser} from '../actions/userA';
import Swal from 'sweetalert2';
import '../style/App.css';


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
      <div className="logIn">
        <div className="leftImg">
          <img src="img\question-mark-1421013_640.png" alt="question marks"></img>
        </div>
        <h1 className="title"> Would you rather ... </h1>
        <form className="logInform" onSubmit={this.logInUser}>
            <p className="infoText"> Welcome to the game. Please select your name from the list below and click on Log In button</p>
            <select id="userDropdown" defaultValue="text" onChange={this.setUserId}>
              <option value="text" disabled>Please select your name</option>
              {//generates an entry for each user from the users object
              Object.entries(this.props.users).map( user => {
                return(
                  <option key={user[0]} value={user[1].id}>{user[1].name}</option>
                );
              })
            }
            </select>
            <button type="submit" className="logInBtn">Log In</button>
        </form>
      </div>
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