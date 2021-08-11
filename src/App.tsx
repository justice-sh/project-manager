// Third-party libraries
import { Switch, Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// Components
import Projects from "./components/projects";
import NavBar from "./components/navBar";
import ProjectForm from "./components/projectForm";
import Profile from "./components/userProfile";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";

// Styles
import "./App.css";

function App() {
  const auth = useAuth0();

  return (
    <main className="container">
      <NavBar user={auth.user} />

      <Switch>
        <Route path="/projectForm/:id" component={ProjectForm} />
        <Route path="/projects" component={Projects} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={LoginForm} />
        <Route path="/logout" component={Logout} />

        <Redirect from="/" to="/projects" />
      </Switch>
    </main>
  );
}

export default App;
