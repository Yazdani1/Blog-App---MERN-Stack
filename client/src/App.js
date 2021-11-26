import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import SignIn from "./components/SignIn";
import ProtectedRoute from "./components/Protectedroute";
import Profile from "./components/Profile";
import Post from "./components/Post";
import Mypost from "./components/Mypost";
import Postaccouncement from "./components/Postannouncement";
import Userprofile from "./components/Userprofile";
import Edit from "./components/Edit";
import Details from "./components/Details";
import { UserProvider } from "./components/UserContext";
import Dashboard from "./components/dashboard/Dashboard";
import DashboardprotectedRoute from "./components/dashboard/DashboardprotectedRoute";
import DashboardNav from "./components/dashboard/DashboardNav";
import DashboardProfile from "./components/dashboard/Profile/DashboardProfile";
import PagenotFound from "./components/PagenotFound";
import UpdateProfile from "./components/dashboard/Profile/UpdateProfile";
import AddExperience from "./components/dashboard/Experience/AddExperience";

function App() {
  return (
      <UserProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/details/:id" exact>
              <ProtectedRoute procomp={Details} />
            </Route>

            <Route path="/userprofile/:id" exact>
              <ProtectedRoute procomp={Userprofile} />
            </Route>
            {/* <Route path="/editpost/:id">
            <ProtectedRoute procomp={Edit} />
          </Route> */}

            <Route path="/" exact>
              <ProtectedRoute procomp={Home} />
            </Route>

            <Route path="/postannouncement" exact>
              <ProtectedRoute procomp={Postaccouncement} />
            </Route>

            <Route path="/signup">
              <ProtectedRoute procomp={Signup} />
            </Route>

            <Route path="/signin">
              <ProtectedRoute procomp={SignIn} />
            </Route>

            {/* <Route path="/post">
            <ProtectedRoute procomp={Post} />
          </Route> */}

            {/* //admin protected route */}

            <Route path="/Dashboard" exact>
              <DashboardprotectedRoute Dashboardprocomp={Mypost} />
            </Route>

            <Route path="/createpost" exact>
              <DashboardprotectedRoute Dashboardprocomp={Post} />
            </Route>
            <Route path="/editpost/:id" exact>
              <DashboardprotectedRoute Dashboardprocomp={Edit} />
            </Route>
            <Route path="/Dashboardprofile" exact>
              <DashboardprotectedRoute Dashboardprocomp={DashboardProfile} />
            </Route>

            <Route path="/profile" exact>
              <DashboardprotectedRoute Dashboardprocomp={Profile} />
            </Route>

            <Route path="/update-profile/:id" exact>
              <DashboardprotectedRoute Dashboardprocomp={UpdateProfile} />
            </Route>

            <Route path="/AddExperience" exact>
              <DashboardprotectedRoute Dashboardprocomp={AddExperience} />
            </Route>

            

            {/* <Redirect exact from="/Dashboard/reload" to="/Dashboard" /> */}

            <Route path="*" exact component={PagenotFound} />
          </Switch>
        </BrowserRouter>
      </UserProvider>
  );
}

export default App;
