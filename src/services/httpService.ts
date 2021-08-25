import firebase from "firebase/app";
import "firebase/firestore";

const http = {
  fs: firebase.firestore,
  ref: (collection: string) => firebase.firestore().collection(collection),
};

export default http;
