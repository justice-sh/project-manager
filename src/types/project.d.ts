import ProjectType from "./projectType";

export default interface Project {
  id: string;
  title: string;
  author: string;
  regNo: string;
  session: string;
  createdAt: number;
  lastModified: number;
  type: ProjectType;
  description: string;
  sponsor: string;
  taken: boolean;
}
