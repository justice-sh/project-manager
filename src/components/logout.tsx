import auth from "../services/authService";

function Logout() {
  auth.logout();

  return null;
}

export default Logout;
