import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Details from "./components/Details";
import CreateVideogame from "./components/CreateVideogame";
import NotFound from './components/NotFound.jsx';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path ='/create/' component={CreateVideogame}/>
          <Route exact path ='/home/:id/' component={Details}/>
          <Route exact path ='/home/' component={Home}/>
          <Route exact path ='/' component={LandingPage}/>
          <Route path='*' component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
