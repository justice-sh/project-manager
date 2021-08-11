import auth from "../services/authService";

function LoginForm() {
  auth.login();

  return null;
}

export default LoginForm;
