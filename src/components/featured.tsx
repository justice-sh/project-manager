import { connect } from "react-redux";

import FeaturedTable from "./featuredTable";
import ProjectsTmt from "./common/projectsTmt";

import { RootState } from "../store";

class FeaturedProjects extends ProjectsTmt {
  renderProjectsTable(data, sortColumn) {
    return (
      <FeaturedTable
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
  projects: state.entities.projects.filter((p) => !p.author),
  types: state.entities.types,
  isLoading: state.ui.isLoading,
  congrats: state.ui.congrats,
});

export default connect(mapStateToProps)(FeaturedProjects);
