import projectService from "./services/projectService";
import typeService from "./services/typeService";
import featuredService from "./services/featuredService";

import Project from "./types/project";
import ProjectType from "./types/projectType";

import generatorId from "./utils/idGenerator";

export default async function seed() {
  featuredService.clear();
  typeService.clear();
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
    createProject(
      "Design and implementation of a web-based result management system",
      "Nkweke Ugochukwu",
      "16/ED/VE/1201",
      types[0]
    ),
    createProject(
      "Teaching technology with technology: bridging learning and teaching gap",
      "James Peterson",
      "15/ED/VE/1109",
      types[1]
    ),
    createProject(
      "Strategies for improving the teaching and learning of computer education in the University of Uyo",
      "Bright Sherrinford",
      "16/ED/VE/1301",
      types[1]
    ),
    createProject(
      "AI for intelligent classrooms in Nigerian Universities",
      "Eze King",
      "16/ED/VE/1001",
      types[1]
    ),
    createProject(
      "Design and implementation of a web-based teaching practice managment system",
      "Emmanuel O.",
      "16/ED/VE/1203",
      types[0]
    ),
    createProject(
      "Design and implementation of a web-based project managemenet system",
      "Nkweke Ugochukwu",
      "16/ED/VE/1201",
      types[0]
    ),
  ];

  return { types, projects };
}

function createProject(title, author, regNo, type: ProjectType): Project {
  return {
    id: generatorId(),
    title,
    author,
    regNo,
    type,
    session: getSession(),
    createdAt: Date.now(),
    lastModified: Date.now(),
  };
}

function getSession() {
  const sessions = ["2012/2016", "2016/2020", "2020/2024", "2024/2028"];
  const index = Math.floor(Math.random() * sessions.length);
  return sessions[index];
}
