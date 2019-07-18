import React, { Component } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Acceuil from './client/Accueil';
import Login from './users/Login/Login';
import PostFrontToBack from './users/Dashboard/postWithUpload_frontToBack';
import ListTous from './users/Dashboard/ListTous'
import AfficheProfil from './users/Dashboard/AfficheProfil'

// import { Dashboard } from './users/Dashboard/Dashboard.js';
import Signup from './users/Signup/Signup';
import Apropos from './client/Apropos';
import Contact from './client/Contact';
import { PrivateRoute } from './users/PrivateRoute.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">E-commerce</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={'/'} className="nav-link">Acceuil</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/login'} className="nav-link">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/apropos'} className="nav-link">A propos</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/contact'} className="nav-link">Contact</Link>
                </li>
              </ul>
            </div>
          </nav> <br />
          <Switch>
            <Route exact path='/' component={Acceuil} />
            <Route path='/apropos' component={Apropos} />
            <Route path='/contact' component={Contact} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />

            <PrivateRoute  path="/dashboard" component={PostFrontToBack} />
            {/* <PrivateRoute path="/profil" component={ListTous} /> */}
            <PrivateRoute path="/userArticle" component={AfficheProfil} />

            {/* <PrivateRoute path='/dashboard' component={Dashboard} /> */}
          </Switch>
        </div>

      </Router>
    );
  }
}

export default App;

