import { useAuth0 } from "@auth0/auth0-react";

function LoginForm() {
  useAuth0().loginWithRedirect();

  return null;
}

export default LoginForm;
