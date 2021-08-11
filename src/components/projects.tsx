import React from "react";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ProjectsTable from "./projectsTable";
import SearchBox from "./common/searchBox";
import Paginate from "./common/pagination";
import ListGroup from "./common/listGroup";

import Project from "../types/project";
import ProjectType from "../types/projectType";
import SortColumn from "../types/sortColumn";

import projectService from "../services/projectService";
import typeService from "../services/typeService";

// eslint-disable-next-line
import log from "../services/logService";
import auth from "../services/authService";

import { paginate } from "../utils/paginate";
import { sort } from "../utils/sort";

import seed from "../seed";

interface ProjectsProps {
  projects: Project[];
  types: ProjectType[];
}

interface ProjectsState {
  sortColumn: SortColumn;
  searchQuery: string;
  currentPage: number;
  pageSize: number;
  selectedType: ProjectType;
  unsubscribe: () => void;
  types: ProjectType[];
}

class Projects extends React.Component<ProjectsProps, ProjectsState> {
  state = {
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
    pageSize: 3,
    currentPage: 1,
    selectedType: { id: "", name: "All Types" },
    types: [],
    unsubscribe: () => "",
  };

  async componentDidMount() {
    const { length: projectCount } = this.props.projects;
    const { length: typeCount } = this.props.types;

    const types = typeCount ? this.props.types : await typeService.getAll();

    if (!projectCount) projectService.registerListener();

    this.setState({ types: [this.state.selectedType, ...types] });
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      selectedType: { id: "", name: "All Types" },
    });
  };

  handlePageChange = (page: number) => {
    this.setState({ currentPage: page, searchQuery: "" });
  };

  handleDelete = (project: Project) => {
    projectService.remove(project.id);
  };

  handleItemSelect = (item) => {
    this.setState({ selectedType: item, searchQuery: "", currentPage: 1 });
  };

  getPagedData = () => {
    const { searchQuery, pageSize, currentPage, selectedType, sortColumn } =
      this.state;

    const { projects } = this.props;

    const filtered = searchQuery
      ? projects.filter((p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : selectedType.id
      ? projects.filter((p) => p.type.id === selectedType.id)
      : projects;

    const sorted = sort(filtered, sortColumn.path, sortColumn.order);

    return {
      totalCount: filtered.length,
      data: paginate(sorted, currentPage, pageSize),
    };
  };

  render() {
    const {
      sortColumn,
      searchQuery,
      pageSize,
      currentPage,
      selectedType,
      types,
    } = this.state;

    const { data, totalCount } = this.getPagedData();

    return (
      <React.Fragment>
        <ToastContainer />
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={types}
              selectedItem={selectedType}
              onItemSelect={this.handleItemSelect}
            />
          </div>
          <div className="col">
            {auth.getCurrentUser()?.isAdmin && (
              <div className="btn btn-group">
                <Link to="/projectForm/new" className="btn btn-primary">
                  New Project
                </Link>
                <button className="btn btn-danger" onClick={() => seed()}>
                  Seed
                </button>
              </div>
            )}

            <SearchBox query={searchQuery} onSearch={this.handleSearch} />

            <ProjectsTable
              projects={data}
              sortColumn={sortColumn}
              onSort={this.handleSort}
              onDelete={this.handleDelete}
            />

            <Paginate
              pageSize={pageSize}
              currentPage={currentPage}
              itemsCount={totalCount}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.entities.projects,
  types: state.entities.types,
});

export default connect(mapStateToProps)(Projects);

// export default Projects;
