import React from 'react';
import {Switch} from 'react-router';
import {Route} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import LogIn from './LogIn';
import Home from './Home';
import Leaderboard from './Leaderboard';
import NewQuestion from './NewQuestion';
import Question from './Question';
import NoMatch from './NoMatch';
import '../style/App.css';

class App extends React.Component {

  render (){
    return (
      <div className="app">
        <Helmet>
          <meta name="description" content="an app to play the game Would you rather... " ></meta>
          <meta name="keywords" content="would you rather, game"></meta>
          <link href="https://fonts.googleapis.com/css?family=Dancing+Script|Josefin+Sans|Marck+Script&display=swap" rel="stylesheet"></link>
          <title>Would You Rather</title>
        {/* Helmet component and it's implementation from https://github.com/nfl/react-helmet*/}
        </Helmet>
        <React.Fragment>
        <Switch>
            {/* defines the paths for components and passes the router props to every component so that these components have access to the props generated by react router inclusive: history, location and match */}
            <Route exact path='/login' render={(routerProps) => (<LogIn {... routerProps} />)}></Route>
            <Route exact path='/' render={(routerProps) => (<Home {... routerProps} />)}></Route>
            <Route exact path='/add' render={(routerProps) => (<NewQuestion {... routerProps} />)}></Route>
            <Route exact path='/leaderboard' render={(routerProps) => (<Leaderboard {... routerProps} />)}></Route>
            <Route exact path='/questions/:question_id' render={(routerProps) => (<Question {... routerProps} />)}></Route>
            <Route component={NoMatch}/>
          </Switch>
        </React.Fragment>
      </div>
    )
  }
}

export default App;
