import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Details from "./components/Details";
import CreateVideogame from "./components/CreateVideogame";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path ='/create/' component={CreateVideogame}/>
          <Route path ='/home/:id/' component={Details}/>
          <Route path ='/home/' component={Home}/>
          <Route path ='/navbar/' component={NavBar}/>
          <Route path ='/' component={LandingPage}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
