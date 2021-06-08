import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './components/pages/landing/Landing';
import NavBar from './components/parts/topNavigation/NavBar';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Landing} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
