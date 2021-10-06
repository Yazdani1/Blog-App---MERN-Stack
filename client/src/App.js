import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";

import Nav from "./Nav";
import SignIn from "./components/SignIn";
import ProtectedRoute from "./components/Protectedroute";
import Profile from "./components/Profile";
import Post from "./components/Post";
import Mypost from "./components/Mypost";
import Postaccouncement from "./components/Postannouncement";
import Userprofile from "./components/Userprofile";
import Edit from "./components/Edit";
import Details from "./components/Details";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/details/:id">
          <ProtectedRoute procomp={Details} />
        </Route>

        <Route path="/userprofile/:id" exact>
          <ProtectedRoute procomp={Userprofile} />
        </Route>
        <Route path="/editpost/:id">
          <ProtectedRoute procomp={Edit} />
        </Route>

        <Route path="/" exact>
          <ProtectedRoute procomp={Home} />
        </Route>

        <Route path="/postannouncement" exact>
          <ProtectedRoute procomp={Postaccouncement} />
        </Route>

        <Route path="/myPost" exact>
          <ProtectedRoute procomp={Mypost} />
        </Route>

        <Route path="/signup">
          <ProtectedRoute procomp={Signup} />
        </Route>

        <Route path="/signin">
          <ProtectedRoute procomp={SignIn} />
        </Route>

        <Route path="/details">
          <ProtectedRoute procomp={Details} />
        </Route>
        <Route path="/profile">
          <ProtectedRoute procomp={Profile} />
        </Route>
        <Route path="/post">
          <ProtectedRoute procomp={Post} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
