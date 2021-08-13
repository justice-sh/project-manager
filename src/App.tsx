// Third-party libraries
import { Switch, Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import AOS from "aos";

// Components
import Projects from "./components/projects";
import NavBar from "./components/navBar";
import ProjectForm from "./components/projectForm";
import Profile from "./components/userProfile";
import Login from "./components/login";
import Logout from "./components/logout";
import ErrorPage from "./components/error";

// Services
import auth from "./services/authService";

// Styles
import "./App.css";

function App() {
  AOS.init();
  auth.setAuth(useAuth0());

  const user = auth.getCurrentUser();

  return (
    <div className="App">
      <main className="container">
        <NavBar user={user} />

        <Switch>
          <Route path="/projectForm/:id" component={ProjectForm} />
          <Route exact path="/projects" component={Projects} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/error" component={ErrorPage} />

          <Redirect exact from="/" to="/projects" />
          <Redirect to="/error" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
