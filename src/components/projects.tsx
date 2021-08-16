import React from "react";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Congrats from "./congrats";

import ProjectsTable from "./projectsTable";
import SearchBox from "./common/searchBox";
import Paginate from "./common/pagination";
import ListGroup from "./common/listGroup";
import LottieAnimation from "./common/lottieAnimation";

import Project from "../types/project";
import ProjectType from "../types/projectType";
import SortColumn from "../types/sortColumn";

import projectService from "../services/projectService";
import auth from "../services/authService";

import { paginate } from "../utils/paginate";
import { sort } from "../utils/sort";

import loader from "../media/loader.json";

// eslint-disable-next-line
import seed from "../seed";

interface ProjectsProps {
  projects: Project[];
  types: ProjectType[];
  isLoading: boolean;
  congrats: boolean;
}

interface ProjectsState {
  sortColumn: SortColumn;
  searchQuery: string;
  currentPage: number;
  pageSize: number;
  selectedType: ProjectType;
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
  };

  componentDidMount() {
    this.setTypes();
  }

  componentDidUpdate() {
    this.setTypes();
  }

  setTypes() {
    const { types } = this.props;

    if (types.length === 0) return;
    if (this.state.types.length > types.length) return;

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

    const { isLoading, congrats } = this.props;

    const { data, totalCount } = this.getPagedData();

    if (isLoading)
      return <LottieAnimation animationData={loader} loop width={20} />;

    if (congrats) return <Congrats />;

    return (
      <div>
        <ToastContainer />
        <div className="row">
          <RowColumn className="col-3">
            <ListGroup
              items={types}
              selectedItem={selectedType}
              onItemSelect={this.handleItemSelect}
            />
          </RowColumn>

          <div className="col">
            {auth.getCurrentUser()?.isAdmin && (
              <div
                className="btn btn-group"
                data-aos="zoom-in-right"
                data-aos-duration="1000"
              >
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
      </div>
    );
  }
}

const RowColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 300px;
`;

const mapStateToProps = (state) => ({
  projects: state.entities.projects,
  types: state.entities.types,
  isLoading: state.ui.isLoading,
  congrats: state.ui.congrats,
});

export default connect(mapStateToProps)(Projects);
