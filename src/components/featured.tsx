import { connect } from "react-redux";

import FeaturedTable from "./featuredTable";
import ProjectsTmt from "./common/projectsTmt";

import featuredService from "../services/featuredService";
import { RootState } from "../store";

class FeaturedProjects extends ProjectsTmt {
  componentDidMount() {
    if (this.props.projects.length === 0) featuredService.registerListener();
  }

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
        {/* {this.renderPage()} */}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  projects: state.entities.featured,
  types: state.entities.types,
  isLoading: state.ui.isLoading,
  congrats: state.ui.congrats,
});

export default connect(mapStateToProps)(FeaturedProjects);
