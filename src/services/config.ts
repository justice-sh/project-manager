export default function getConfig() {
  return {
    apiKey: process.env.REACT_APP_FB_apikey,
    authDomain: process.env.REACT_APP_FB_authDomain,
    projectId: process.env.REACT_APP_FB_projectId,
    storageBucket: process.env.REACT_APP_FB_storageBucket,
    messagingSenderId: process.env.REACT_APP_FB_messagingSenderId,
    appId: process.env.REACT_APP_FB_appId,
  };
}
