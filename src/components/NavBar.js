import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

const NavigationBar = styled.div `
  max-width: 90%;
  height: 3em;
  margin: auto;
  text-align: center;
  align-self: baseline;
  @media screen and (min-width: 760px){
    margin: auto auto auto 0;
  };
`
const NavItem = styled(NavLink) `
  display: inline-block;
  border: 0.15em solid #FFF;
  border-radius: 5px;
  padding: 0.25em;
  margin: auto 0;
  font-family: 'Dancing Script', cursive;
  font-size: 1.1em;
  font-weight: bolder;
  color: #d3281c;
  text-decoration: none;
  text-align: center;
  &:hover {
    border-color: #005753;
  };
  &.active {
    border-bottom-color: #007FFF;
  }
  @media screen and (min-width: 760px){
    font-size: 1.2em;
  };
`

class NavBar extends React.Component {
  render (){
    return (
      <NavigationBar>
        <NavItem exact to='/'>Home</NavItem>
        <NavItem to='/add'>New Question</NavItem>
        <NavItem to='/leaderboard'>Leaderboard</NavItem>
      </NavigationBar>
    )
  }
}

export default NavBar;