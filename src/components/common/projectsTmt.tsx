import React from "react";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

import SearchBox from "./searchBox";
import Paginate from "./pagination";
import ListGroup from "./listGroup";
import LottieAnimation from "./lottieAnimation";

import Project from "../../types/project";
import ProjectType from "../../types/projectType";
import SortColumn from "../../types/sortColumn";

import projectService from "../../services/projectService";
import auth from "../../services/authService";

import { paginate } from "../../utils/paginate";
import { sort } from "../../utils/sort";

import loader from "../../media/loader.json";

// eslint-disable-next-line
import seed from "../../seed";
import Featured from "../../types/featured";

export interface TemplateProps {
  projects: (Project | Featured)[];
  types: ProjectType[];
  isLoading: boolean;
}

export interface TemplateState {
  sortColumn: SortColumn;
  searchQuery: string;
  currentPage: number;
  pageSize: number;
  selectedType: ProjectType;
  types: ProjectType[];
}

class ProjectsTmt extends React.Component<TemplateProps, TemplateState> {
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

  renderLoader() {
    if (this.props.isLoading)
      return <LottieAnimation animationData={loader} loop width={20} />;
  }

  renderProjectsTable(data, sortColumn) {
    return (
      <div>
        Please render your table component here @{this.renderProjectsTable.name}
      </div>
    );
  }

  renderPage() {
    if (this.props.isLoading) return null;

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
      <>
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
            {!auth.getCurrentUser()?.isAdmin && (
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

            {this.renderProjectsTable(data, sortColumn)}

            <Paginate
              pageSize={pageSize}
              currentPage={currentPage}
              itemsCount={totalCount}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </>
    );
  }
}

const RowColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 300px;
`;

export default ProjectsTmt;
