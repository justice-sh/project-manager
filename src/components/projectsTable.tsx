import { Component } from "react";
import { Link } from "react-router-dom";

import Table from "./common/table";

import Column from "../types/column";
import Project from "../types/project";
import SortColumn from "../types/sortColumn";

import auth from "../services/authService";

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
      content: this.getDeleteContent,
    },
  ];

  removeTitleLink() {
    if (!auth.getCurrentUser()?.isAdmin) {
      delete this.columns[0].content;
    }
  }

  getDeleteContent(project: Project) {
    return auth.getCurrentUser()?.isAdmin ? (
      <button
        onClick={() => this.props.onDelete(project)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ) : null;
  }

  render() {
    const { sortColumn, onSort, projects } = this.props;

    if (projects.length === 0) return <div>Oops. No result found.</div>;

    this.removeTitleLink();

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
