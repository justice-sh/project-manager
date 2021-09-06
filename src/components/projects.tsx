import { connect } from "react-redux";

import ProjectsTable from "./projectsTable";

import ProjTemplate from "./common/projectsTmt";

import { RootState } from "../store";

class Projects extends ProjTemplate {
  renderProjectsTable(data, sortColumn) {
    return (
      <ProjectsTable
        projects={data}
        sortColumn={sortColumn}
        onSort={this.handleSort}
        onDelete={this.handleDelete}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderLoader()}
        {this.renderPage()}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  projects: state.entities.projects.filter((p) => p.author),
  types: state.entities.types,
  isLoading: state.ui.isLoading,
  congrats: state.ui.congrats,
});

export default connect(mapStateToProps)(Projects);
