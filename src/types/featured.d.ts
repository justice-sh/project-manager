import ProjectType from "./projectType";

export default interface Featured {
  id: string;
  title: string;
  description: string;
  sponsor: string;
  createdAt: number;
  type: ProjectType;
}
