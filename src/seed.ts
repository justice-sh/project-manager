import projectService from "./services/projectService";
import typeService from "./services/typeService";
import featuredService from "./services/featuredService";

import Project from "./types/project";
import Featured from "./types/featured";
import ProjectType from "./types/projectType";

import generatorId from "./utils/idGenerator";

export default async function seed() {
  await featuredService.clear();
  await typeService.clear();
  await projectService.clear();

  const { projects, types, featured } = getData();

  projects.forEach((project) => projectService.add(project));
  types.forEach((type) => typeService.add(type));
  featured.forEach((project) => featuredService.add(project));
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

  const featured = [
    createFeatured(
      "Result management system",
      "Apata Memorial High School",
      types[0],
      "a system to automate the processes of result computation and management in secondary schools, thereby reducing the work to a few clicks of buttons. "
    ),
    createFeatured(
      "Project management system",
      "Mikano International Limited",
      types[1],
      "a system to keep track of all projects done by students in a university, available projects for students to do, as well as sponsored projects from companies who will be willing to pay/sponsor the student who would build the project, and possibly employ such student."
    ),
  ];

  return { types, projects, featured };
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

function createFeatured(
  title: string,
  sponsor: string,
  type: ProjectType,
  description: string
): Featured {
  return {
    id: generatorId(),
    title,
    sponsor,
    type,
    description,
    createdAt: Date.now(),
  };
}

function getSession() {
  const sessions = ["2012/2016", "2016/2020", "2020/2024", "2024/2028"];
  const index = Math.floor(Math.random() * sessions.length);
  return sessions[index];
}
