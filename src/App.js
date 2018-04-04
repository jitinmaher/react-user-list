import React, { Component } from 'react';
import "./common/style/style.css";
import CardContainer from './cardCont/components/CardContainer';
import AllUsersData from './data';

class App extends Component {
  render() {
    return (
      <CardContainer allUsers={AllUsersData} />
    );
  }
}

export default App;
