import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './components/pages/landing/LandingPage';
import UpNext from './components/pages/upNext/UpNext';
import { Favorites } from './components/pages/favorites/Favorites';
import NavBar from './components/parts/topNavigation/NavBar';
import MediaInfoPage from './components/pages/mediaInfo/MediaInfoPage';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/show/:id" component={MediaInfoPage} />
          <Route exact path="/movie/:id" component={MediaInfoPage} />
          <Route exact path="/up-next" component={UpNext} />
          <Route exact path="/favorites" component={Favorites} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
