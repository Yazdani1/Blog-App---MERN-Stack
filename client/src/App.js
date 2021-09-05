import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Details from "./components/Details";
import Nav from "./Nav";
import SignIn from "./components/SignIn";
import ProtectedRoute from "./components/Protectedroute";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <ProtectedRoute procomp={Home} />
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
