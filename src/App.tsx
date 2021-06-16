import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './components/pages/landing';
import NavBar from './components/parts/topNavigation';
import UpNext from './components/pages/upNext';
import MediaInfo from './components/pages/mediaInfo';
import ActorInfo from './components/pages/actorInfo';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/show/:id" component={MediaInfo} />
          <Route exact path="/movie/:id" component={MediaInfo} />
          <Route exact path="/up-next" component={UpNext} />
          <Route exact path="/actor/:id" component={ActorInfo} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
