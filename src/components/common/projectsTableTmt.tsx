import { Component } from "react";
import { Link } from "react-router-dom";

import Table from "./table";
import LottieAnimation from "./lottieAnimation";

import Column from "../../types/column";
import Project from "../../types/project";
import SortColumn from "../../types/sortColumn";

import auth from "../../services/authService";

import animationData from "../../media/noDataFound.json";

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
    { path: "type.name", label: "Type" },
    { path: "author", label: "Author" },
    { path: "regNo", label: "Reg. No." },
    { path: "session", label: "Session" },
    {
      key: "delete",
      content: this.deleteContent(this.props.onDelete),
    },
  ];

  deleteContent(onDelete) {
    return function (project: Project) {
      return auth.getCurrentUser()?.isAdmin ? (
        <button
          onClick={() => onDelete(project)}
          className="btn btn-danger btn-sm"
          data-aos="zoom-in-right"
          data-aos-duration={1500}
        >
          Delete
        </button>
      ) : null;
    };
  }

  removeTitleLink() {
    if (!auth.getCurrentUser()?.isAdmin) {
      delete this.columns[0].content;
    }
  }

  renderTable() {
    const { sortColumn, onSort, projects } = this.props;

    if (projects.length === 0)
      return <LottieAnimation animationData={animationData} width={60} loop />;

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
