import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './components/pages/landing/Landing';
import NavBar from './components/parts/topNavigation/NavBar';
import { ShowInfo } from './components/pages/showInfo/ShowInfo';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/:id" component={ShowInfo} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
