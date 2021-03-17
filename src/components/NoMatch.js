import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const NoMatchPage = styled.main `
  width: 95%;
  border: 2px solid linear-gradient(150deg, #005753, #517100, #d3281c);;
  border-radius: 5px;
  margin: auto;
  font-family: 'Josefin Sans', sans-serif;
  text-align: center;
`
const Title = styled.h2 `
  min-width: 95%;
  font-family: 'Dancing Script', cursive;
  font-size: 1.5em;
  color: #005753;
  @media screen and (min-width: 760px){
    font-size: 1.7em;
  };
`
const InfoText = styled.p `
  font-size: 1.2em;
  text-align: justify;
  padding: 0.25em;
  margin: 1em auto;
`
const Image = styled.img `
  width: 50%;
  height: auto;
  margin: auto;
  @media screen and (min-width: 420px){
    width: 70%;
  };
`

class NoMatch extends React.Component {
  render (){
    return (
      <NoMatchPage>
        <Title> Error 404</Title>
        <InfoText>Please return to
          <Link to='/login'>Log In page</Link>
        </InfoText>
        <InfoText>We can not find the page you are looking for</InfoText>
        <Image src="/img/icons8-sad.png" alt="a sad face"></Image>
        {/* icon source https://icons8.com/icon/677/sad */}
      </NoMatchPage>
    )
  }
}

export default NoMatch;
