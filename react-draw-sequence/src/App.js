import React, { Suspense } from "react";
import Navigation from "./components/Navigation";
import { Router, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import Contribute from "./components/Contribute";
import List from "./components/List";
import Upload from "./components/Upload";
import Draw from "./components/Draw";
import Foot from "./components/Foot";
/*todo defaultowe routy*/
/*todo activate event dla routera*/
const history = createBrowserHistory();

function App() {
  const About = React.lazy(() => import("./components/About"));
  const AdminList = React.lazy(() => import("./components/AdminList"));
  const Login = React.lazy(() => import("./components/Login"));

  return (
    <Router history={history}>
      <header>
        <Navigation />
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Redirect from="/" to="/list" />
          <Redirect from="/contribute" to="/contribute/upload" />
          <Route exact path="/list" component={List} />
          <Route path="/about" component={About} />
          <Route path="/contribute" component={Contribute} />
          <Route path="/admin-list" component={AdminList} />
          <Route path="/login" component={Login} />

          <Route path="/contribute/upload" component={Upload} />
          <Route path="/contribute/draw" component={Draw} />
        </Suspense>
        <Foot />
      </main>
    </Router>
  );
}

export default App;
