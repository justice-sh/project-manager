import ProjectType from "../types/projectType";

import http from "./httpService";
import log from "./logService";

import store from "../store";
import { typesAdded, typesCleared } from "../store/projectTypes";

const apiEndpoint = "projectTypes";
const getReference = () => http.fs().collection(apiEndpoint);

// Delete any time. Same with devSeed@projectService.
function devSeed(types: ProjectType[]) {
  store.dispatch(typesAdded, { types });
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

async function getAll() {
  try {
    const result = await getReference().get();
    const types = result.docs.map((doc) => doc.data());
    store.dispatch(typesAdded, { types });
    return types as ProjectType[];
  } catch (error) {
    log(error);
    return [];
  }
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
  getAll,
  add,
  clear,
  devSeed,
};

export default objects;
