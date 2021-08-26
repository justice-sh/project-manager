import ProjectType from "./projectType";

export default interface Featured {
  id: string;
  title: string;
  description: string;
  sponsored: boolean;
  createdAt: number;
  type: ProjectType;
}
