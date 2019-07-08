import React from "react";
import Navigation from "./components/Navigation";
import { Router, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { About } from "./components/About";
import Contribute from "./components/Contribute";
import List from "./components/List";
import AdminList from "./components/AdminList";
import Upload from "./components/Upload";
import Draw from "./components/Draw";
import Login from './components/Login';
import Foot from "./components/Foot";
/*todo defaultowe routy*/
/*todo activate event dla routera*/
const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <header>
        <Navigation />
      </header>
      <main>
        <Redirect from="/" to="/list" />
        <Redirect from="/contribute" to="/contribute/upload" />
        <Route exact path="/list" component={List} />
        <Route path="/about" component={About} />
        <Route path="/contribute" component={Contribute} />
        <Route path="/admin-list" component={AdminList} />
        <Route path="/login" component={Login} />

        <Route path="/contribute/upload" component={Upload} />
        <Route path="/contribute/draw" component={Draw} />
        <Foot />
      </main>
    </Router>
  );
}

export default App;
