import React from 'react';
import styled from 'styled-components';

const PageFooter = styled.div `
  width: 95%;
  margin: 2em auto 0 auto;
  position: absolute;
  bottom: 0px;
`
const Signature = styled.div `
  font-family: 'Dancing Script', cursive;
  font-size: 1em;
  text-align: center;
  padding: 0.25em;
  margin: 0 auto;
`
class Footer extends React.Component {
  render (){
    return (
      <PageFooter>
        <Signature> &#169; IuliaElizaS 2020</Signature>
      </PageFooter>
    )
  }
}

export default Footer;
