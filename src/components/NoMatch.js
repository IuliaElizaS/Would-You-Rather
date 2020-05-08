import React from 'react';
import {Link} from 'react-router-dom';
import '../style/App.css';

class NoMatch extends React.Component {
  render (){
    return (
      <div className="page-error">
        <h2> Error 404</h2>
        <p>Please return to
          <Link to='/login'>Log In page</Link>
        </p>
        <p>We can not find the page you are looking for</p>
        <img src="/img/icons8-sad.png" alt="a sad face"></img>
        {/* icon source https://icons8.com/icon/677/sad */}
      </div>
    )
  }
}

export default NoMatch;
