import ProjectType from "../types/projectType";
import http from "./httpService";
import log from "./logService";
import { typesAdded, typesCleared } from "../store/projectTypes";
import dispatch from "..";

const apiEndpoint = "projectTypes";
const getReference = () => http.fs().collection(apiEndpoint);

// Delete any time. Same with devSeed@projectService.
function devSeed(types: ProjectType[]) {
  dispatch({ type: typesAdded.type, payload: { types } });
}

function add(type: ProjectType) {
  getReference().doc(type.id).set(type).catch(log);
}

async function getAll() {
  try {
    const result = await getReference().get();
    const types = result.docs.map((doc) => doc.data());
    dispatch({ type: typesAdded.type, payload: { types } });
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
  dispatch({ type: typesCleared.type });

  return getReference()
    .get()
    .then((value) => value.docs.forEach((doc) => doc.ref.delete()))
    .catch(log);
}

const objects = {
  get,
  getAll,
  add,
  clear,
  devSeed,
};

export default objects;
