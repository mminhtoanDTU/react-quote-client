import React, { Suspense } from "react";
import {
  HashRouter as Router, Route, Switch
} from "react-router-dom";
import { Loading } from "./components";
import ScrollToTop from "./components/ScrollToTop";

const Profile = React.lazy(() => import('./pages/Profile'));
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));

function App() {


  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <ScrollToTop />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/me/:uid" component={Profile} />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
