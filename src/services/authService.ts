import { Auth0ContextInterface } from "@auth0/auth0-react";

import User from "../types/user";

class AuthService {
  private auth: Auth0ContextInterface = {} as any;

  setAuth(auth: Auth0ContextInterface) {
    this.auth = auth;
  }

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({ returnTo: window.location.origin });
  }

  getCurrentUser(): null | User {
    const { user } = this.auth;
    const namespace = "http://localhost/";

    if (!user) return null;

    return {
      name: user.name,
      isAdmin: user[namespace + "isAdmin"],
    };
  }
}

const auth = new AuthService();

export default auth;
