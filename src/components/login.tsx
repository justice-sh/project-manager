import auth from "../services/authService";

function Login() {
  auth.login();

  return null;
}

export default Login;
