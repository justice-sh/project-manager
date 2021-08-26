import ProjectType from "../types/projectType";

import http from "./httpService";
import log from "./logService";

import store from "../store";
import { typesAdded, typesCleared } from "../store/projectTypes";

const apiEndpoint = "projectTypes";
const getReference = () => http.fs().collection(apiEndpoint);

function addListener() {
  getReference().onSnapshot({
    next: (snapshot) => {
      const changes = snapshot.docChanges();

      if (changes.length > 1) {
        const types = changes.map((change) => change.doc.data());
        store.dispatch(typesAdded, { types });
      }
    },

    error: (error) => log(error),
  });
}

function add(type: ProjectType) {
  getReference()
    .doc(type.id)
    .set(type)
    .then(
      (value) => value,
      (reason) => log(reason)
    );
}

function get(id: string) {
  return getReference()
    .doc(id)
    .get()
    .then((doc) => doc.data() as ProjectType)
    .catch(log);
}

async function clear() {
  store.dispatch(typesCleared, { list: [] });

  return getReference()
    .get()
    .then(
      (value) => value.docs.forEach((doc) => doc.ref.delete()),
      (reason) => log(reason)
    );
}

const objects = {
  get,
  add,
  clear,
  addListener,
};

export default objects;
