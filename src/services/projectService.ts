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

const ref = () => http.fs().collection("projects");

function registerListener() {
  const unsubscribe = ref().onSnapshot({
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
  return ref()
    .get()
    .then(
      (value) => value.docs.map((doc) => doc.data()),
      (reason) => log(reason)
    );
}

function get(id: string) {
  return ref()
    .doc(id)
    .get()
    .then(
      (value) => value.data() as Project,
      (reason) => log(reason)
    );
}

function add(project: Project) {
  return ref()
    .doc(project.id)
    .set(project)
    .then(
      (value) => project,
      (reason) => log(reason)
    );
}

function update(project: Project) {
  const update = { ...project, lastModified: Date.now() };

  return ref()
    .doc(project.id)
    .update(update)
    .then(
      (value) => update,
      (reason) => log(reason)
    );
}

function remove(id: string) {
  return ref().doc(id).delete().catch(log);
}

async function clear() {
  store.dispatch(projectsCleared, {});

  return ref()
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
  update,
  remove,
  registerListener,
  clear,
};

export default objects;
