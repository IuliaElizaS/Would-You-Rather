import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const NavigationBar = styled.div `
  max-width: 90%;
  height: 3em;
  margin: auto;
  align-self: baseline;
  @media screen and (min-width: 760px){
    margin: auto auto auto 0;
  };
`
const NavItem = styled.div `
  display: inline-block;
  border: 0.15em solid #FFF;
  border-radius: 5px;
  padding: 0.25em;
  margin: auto 0;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1.1em;
  color: #FF2400;
  text-align: center;
  &:hover {
    border-color: #005753;
  };
  &:focus {
    border-color: #005753;
  }
  @media screen and (min-width: 760px){
    font-size: 1.2em;
  };
`
class NavBar extends React.Component {
  render (){
    return (
      <NavigationBar>
        <NavItem>
            <Link to='/' style={{textDecoration: 'none', color: '#FF2400'}}>Home</Link>
        </NavItem>
        <NavItem>
            <Link to='/add' style={{textDecoration: 'none', color: '#FF2400'}}>New Question</Link>
        </NavItem>
        <NavItem>
            <Link to='/leaderboard' style={{textDecoration: 'none', color: '#FF2400'}}>Leaderboard</Link>
        </NavItem>
      </NavigationBar>
    )
  }
}

export default NavBar;