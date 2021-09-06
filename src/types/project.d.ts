import ProjectType from "./projectType";
import Sponsor from "./sponsor";

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
  sponsor: Sponsor;
}
