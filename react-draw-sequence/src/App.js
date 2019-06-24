import React from "react";
import Navigation from "./components/Navigation";
import Foot from "./components/Foot";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { List } from "./components/List";
import { About } from "./components/About";
import { Contribute } from "./components/Contribute";
import { AdminList } from "./components/AdminList";
import Upload from './components/Upload';
import Draw from './components/Draw';

const history = createBrowserHistory();

function App() {
  return (
    <main>
      <Router history={history}>
        <header>
          <Navigation />
        </header>

        <Route exact path="/list" component={List} />
        <Route path="/about" component={About} />
        <Route path="/contribute" component={Contribute} />
        <Route path="/adminList" component={AdminList} />
        <Route path="/contribute/upload" component={Upload} />
        <Route path="/contribute/draw" component={Draw} />
      </Router>
      <Foot />
    </main>
  );
}

export default App;
