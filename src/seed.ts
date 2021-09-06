import projectService from "./services/projectService";
import typeService from "./services/typeService";

import Project from "./types/project";
import Sponsor from "./types/sponsor";

import generatorId from "./utils/idGenerator";

export default async function seed() {
  await typeService.clear();
  await projectService.clear();

  const { projects, types } = getData();

  projects.forEach((project) => projectService.add(project));
  types.forEach((type) => typeService.add(type));
}

function getProjectTypes() {
  return [
    {
      id: generatorId(),
      name: "Design and Implementation",
    },
    { id: generatorId(), name: "Educational Research" },
  ];
}

function getData() {
  const types = getProjectTypes();

  const projects = [
    createProject({
      id: "",
      session: "",
      title:
        "Design and implementation of a web-based result management system",
      author: "Nkweke Ugochukwu",
      regNo: "16/ED/VE/1201",
      type: types[0],
      createdAt: 9,
      lastModified: 9,
      description: "",
      sponsor: undefined,
    }),
    createProject({
      id: "",
      sponsor: undefined,
      createdAt: 8,
      lastModified: 8,
      description: "",
      session: "",
      title:
        "Teaching technology with technology: bridging learning and teaching gap",
      author: "James Peterson",
      regNo: "15/ED/VE/1109",
      type: types[1],
    }),
    createProject({
      id: "",
      sponsor: undefined,
      createdAt: 8,
      lastModified: 8,
      description: "",
      session: "",
      title:
        "Strategies for improving the teaching and learning of computer education in the University of Uyo",
      author: "Bright Sherrinford",
      regNo: "16/ED/VE/1301",
      type: types[1],
    }),
    createProject({
      id: "",
      sponsor: undefined,

      createdAt: 8,
      lastModified: 8,
      description: "",
      session: "",
      title: "AI for intelligent classrooms in Nigerian Universities",
      author: "Eze King",
      regNo: "16/ED/VE/1001",
      type: types[1],
    }),
    createProject({
      id: "",
      sponsor: undefined,

      createdAt: 8,
      lastModified: 8,
      description: "",
      session: "",
      title:
        "Design and implementation of a web-based teaching practice managment system",
      author: "Emmanuel O.",
      regNo: "16/ED/VE/1203",
      type: types[0],
    }),
    createProject({
      id: "",
      sponsor: undefined,

      createdAt: 8,
      lastModified: 8,
      description: "",
      session: "",
      title:
        "Design and implementation of a web-based project managemenet system",
      author: "Nkweke Ugochukwu",
      regNo: "16/ED/VE/1201",
      type: types[0],
    }),
    createProject({
      title: "Result management system",
      sponsor: getSponsor(
        "Google",
        "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
      ),
      type: types[0],
      description:
        "a system to automate the processes of result computation and management in secondary schools, thereby reducing the work to a few clicks of buttons. ",
      id: "",

      createdAt: 9,
      lastModified: 9,
      session: "",
      author: "",
      regNo: "",
    }),
    createProject({
      title: "Project management system",
      sponsor: getSponsor(
        "Mikano International Limited",
        "https://www.mikano-intl.com/"
      ),
      type: types[1],
      description:
        "a system to keep track of all projects done by students in a university, available projects for students to do, as well as sponsored projects from companies who will be willing to pay/sponsor the student who would build the project, and possibly employ such student.",
      id: "",

      createdAt: 9,
      lastModified: 9,
      session: "",
      author: "",
      regNo: "",
    }),
  ];

  return { types, projects };
}

function createProject(project: Project) {
  return {
    ...project,
    id: generatorId(),
    session: getSession(),
    createdAt: Date.now(),
    lastModified: Date.now(),
    description: getLorem(),
    sponsor: project.sponsor || getSponsor("", ""),
  };
}

function getSession() {
  const sessions = ["2012/2016", "2016/2020", "2020/2024", "2024/2028"];
  const index = Math.floor(Math.random() * sessions.length);
  return sessions[index];
}

function getLorem() {
  return "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda repellendus similique ut pariatur eum unde dolorum facilis animi cum inventore.";
}

function getSponsor(name, logoUrl): Sponsor {
  return {
    name,
    logoUrl,
  };
}
