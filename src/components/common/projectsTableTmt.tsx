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
  columns: Column[] = []; // should be provided by the child component.

  viewButton(url) {
    return function (project: Project) {
      return (
        <Link
          to={`${url}/${project.id}`}
          className="btn btn-info btn-sm"
          data-aos="zoom-in-right"
          data-aos-duration={1500}
        >
          View
        </Link>
      );
    };
  }

  deleteButton(onDelete) {
    return function (project: Project) {
      return auth.getCurrentUser()?.isAdmin ? (
        <button
          onClick={() => onDelete(project)}
          className="btn btn-danger btn-sm"
          data-aos="zoom-in-right"
          data-aos-duration={1000}
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
