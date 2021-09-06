import { Link } from "react-router-dom";

import Column from "../types/column";
import Project from "../types/project";

import Template from "./common/projectsTableTmt";

class ProjectsTable extends Template {
  columns: Column[] = [
    {
      path: "title",
      label: "Title",
      content: (project: Project) => (
        <Link to={`/projectForm/${project.id}`}>{project.title}</Link>
      ),
    },
    { path: "description", label: "Description" },
    { path: "sponsor.name", label: "Sponsor" },
    { key: "view", content: this.viewButton },
    {
      key: "delete",
      content: this.deleteButton(this.props.onDelete),
    },
  ];

  render() {
    return <>{this.renderTable()}</>;
  }
}

export default ProjectsTable;
