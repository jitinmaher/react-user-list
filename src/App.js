import React, { Component } from 'react';
import "./common/style/style.css";
import CardContainer from './cardCont/components/CardContainer';
import AllUsersData from './data';
/**
 * Is responsible for rendering the card container with allUsers props sent to it
 */
 const App = () => {
   return (
    <CardContainer allUsers={AllUsersData} />
   );
 };
 
export default App;
