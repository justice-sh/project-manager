export default function getAuthConfig() {
  return {
    domain: process.env.REACT_APP_AUTH_DOMAIN,
    clientId: process.env.REACT_APP_AUTH_CLIENTID,
    redirectUri: window.location.origin + "/projects",
  };
}
