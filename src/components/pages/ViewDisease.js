import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LocationList from './LocationList';
import LocationDetail from './LocationDetail';

const ViewDisease = () => (
  <Router>
    
      <Route exact path="/" component={LocationList} />
      <Route path="/location/:id" component={LocationDetail} />
    
  </Router>
);

export default ViewDisease;
