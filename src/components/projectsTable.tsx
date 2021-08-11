import { Component } from "react";
import { Link } from "react-router-dom";
import Column from "../types/column";
import Project from "../types/project";
import SortColumn from "../types/sortColumn";
import Table from "./common/table";

export interface ProjectsTableProps {
  projects: Project[];
  sortColumn: SortColumn;
  onSort: (e) => void;
  onDelete: (project: Project) => void;
}

export interface ProjectsTableState {}

class ProjectsTable extends Component<ProjectsTableProps, ProjectsTableState> {
  columns: Column[] = [
    {
      path: "title",
      label: "Title",
      content: (project: Project) => (
        <Link to={`/projectForm/${project.id}`}>{project.title}</Link>
      ),
    },
    { path: "author", label: "Author" },
    { path: "regNo", label: "Reg. No." },
    { path: "type.name", label: "Type" },
    { path: "session", label: "Session" },
    {
      key: "delete",
      content: (project: Project) => (
        <button
          onClick={() => this.props.onDelete(project)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { sortColumn, onSort, projects } = this.props;

    if (projects.length === 0) return <div>Oops. No result found.</div>;

    return (
      <Table
        data={projects}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default ProjectsTable;
