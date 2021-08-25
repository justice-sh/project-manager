import { toast } from "react-toastify";

import Featured from "../types/featured";

import http from "./httpService";
import log from "./logService";

import store from "../store";

import {
  featuredAdded,
  featuredRemoved,
  featuredUpdated,
  cleared,
  featuredsAdded,
} from "../store/featured";

const ref = () => http.fs().collection("featured");

function registerListener() {
  const unsubscribe = ref().onSnapshot({
    next: (snapshot) => {
      const docs = snapshot.docChanges();

      if (docs.length > 1) {
        const featureds = docs.map((change) => change.doc.data());
        store.dispatch(featuredsAdded, { featureds });
        toast.info("Featured projects loaded");
      }

      docs.forEach((change) => {
        const { doc, type } = change;
        const featured = doc.data();

        if (type === "added") store.dispatch(featuredAdded, { featured });
        else if (type === "modified")
          store.dispatch(featuredUpdated, { featured });
        else if (type === "removed")
          store.dispatch(featuredRemoved, { featured });

        toast.info(`Featured project ${type}`);
      });
    },

    error: (error) => log(error),
  });

  return unsubscribe;
}

function remove(id: string) {
  ref().doc(id).delete().catch(log);
}

function clear() {
  ref()
    .get()
    .then(
      (value) => value.docs.forEach((doc) => doc.ref.delete()),
      (reason) => log(reason)
    );
}

const services = { registerListener, clear };

export default services;
