import React from 'react';
import NavBar from './NavBar';
import UserBar from './UserBar';
import styled from 'styled-components';

const Container = styled.div `
  width: 95vw;
  margin: auto;
  flex-grow: 1;
`
const Title = styled.h2 `
  font-family: 'Dancing Script', cursive;
  font-size: 1.5em;
  color: #005753;
  padding: 0.25em;
  margin: 0.5em auto;
  @media screen and (min-width: 760px){
    font-size: 1.7em;
  };
`
const BreakLine = styled.div `
  width: 95vw;
  height: 0.25em;
  margin: 0.3em auto;
  background: linear-gradient(150deg, #005753, #517100, #d3281c);
  border-radius: 5px;
  @media screen and (min-width: 760px){
    height: 0.30em;
  };
`
const Section = styled.section `
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  width: 95vw;
  margin: 1em auto;
  @media screen and (min-width: 760px){
    flex-direction: row-reverse;
  };
`
class Header extends React.Component {
    render (){
      return (
        <Container>
            <Title>WOULD YOU RATHER ...</Title>
            <BreakLine></BreakLine>
            <Section>
              <UserBar/>
              <NavBar/>
            </Section>
        </Container>
      )
    }
  }

export default Header;
