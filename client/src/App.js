import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Details from "./components/Details";
import Nav from "./Nav";
import SignIn from "./components/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={SignIn}/>
        <Route path="/details" component={Details} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
