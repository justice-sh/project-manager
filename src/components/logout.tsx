import { useAuth0 } from "@auth0/auth0-react";

function Logout() {
  useAuth0().logout({ returnTo: window.location.origin });

  return null;
}

export default Logout;
