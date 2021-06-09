import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './components/pages/landing';
import NavBar from './components/parts/topNavigation';
import { ShowInfo } from './components/pages/showInfo';
import UpNext from './components/pages/upNext';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/show/:id" component={ShowInfo} />
          <Route exact path="/up-next" component={UpNext} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
