import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import gnu from "../../assets/gnu.png";

class MainLayout extends React.Component {
  render() {
    return (
      <Container>
        <Header as="h1">Hello from webpack4 and react</Header>
        <img src={gnu} alt="gnu.png"/>
      </Container>
    );
  }
}

export default MainLayout;