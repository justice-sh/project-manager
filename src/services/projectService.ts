import { toast } from "react-toastify";

import Project from "../types/project";

import http from "./httpService";
import log from "./logService";

import store from "../store";

import { congratsToggled } from "../store/ui";
import { loaded } from "../store/ui";
import {
  projectAdded,
  projectDeleted,
  projectUpdated,
  projectsAdded,
  projectsCleared,
} from "../store/projects";

const apiEndpoint = "projects";
const getReference = () => http.fs().collection(apiEndpoint);

// Delete any time. Same with devSeed@typeService.
function devSeed(projects: Project) {
  store.dispatch(projectsAdded, { projects });
  return toast.info(`Projects loaded`);
}

function registerListener() {
  const unsubscribe = getReference().onSnapshot({
    next: (snapshot) => {
      const docs = snapshot.docChanges();

      if (docs.length > 1 && docs[0].type === "added") {
        const projects = docs.map((value) => value.doc.data());
        store.dispatch(projectsAdded, { projects });
        store.dispatch(loaded, {});
        return toast.info(`Projects loaded`);
      }

      docs.forEach((change) => {
        const { type, doc } = change;
        const project = doc.data();

        if (type === "added") store.dispatch(projectAdded, { project });
        else if (type === "modified")
          store.dispatch(projectUpdated, { project });
        else if (type === "removed")
          store.dispatch(projectDeleted, { project });

        type === "added"
          ? store.dispatch(congratsToggled, { congrats: true })
          : toast.info(`Project ${type}`);
      });
    },
    error: (error) => log(error),
  });

  return unsubscribe;
}

function getAll() {
  return getReference()
    .get()
    .then((result) => result.docs.map((doc) => doc.data()))
    .catch(log);
}

function get(id: string) {
  return getReference()
    .doc(id)
    .get()
    .then((doc) => doc.data() as Project)
    .catch(log);
}

function add(project: Project) {
  return getReference()
    .doc(project.id)
    .set(project)
    .then((doc) => project)
    .catch(log);
}

function update(project: Project) {
  return getReference()
    .doc(project.id)
    .update({ ...project, lastModified: Date.now() })
    .then((doc) => project)
    .catch(log);
}

function remove(id: string) {
  return getReference().doc(id).delete().catch(log);
}

async function clear() {
  store.dispatch(projectsCleared, {});

  return getReference()
    .get()
    .then((value) => value.docs.forEach((doc) => doc.ref.delete()))
    .catch(log);
}

const objects = {
  get,
  getAll,
  add,
  update,
  remove,
  registerListener,
  clear,
  devSeed,
};

export default objects;
