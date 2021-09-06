import Joi from "joi";
import { connect } from "react-redux";

import Project from "../types/project";
import Form from "./common/form";

import ProjectType from "../types/projectType";
import SelectOption from "../types/selectOption";

import projectService from "../services/projectService";
import auth from "../services/authService";

import generatorId from "../utils/idGenerator";

class ProjectForm extends Form {
  state = {
    data: {
      title: "",
      typeId: "",
      author: "",
      regNo: "",
      session: "",
      createdAt: Date.now(),
      sponsor: "",
      sponsorLogoUrl: "",
      description: "",
    },
    options: [],
    errors: {},
  };

  schema = {
    title: Joi.string().min(3).label("Title").required(),
    typeId: Joi.string().label("Type of Project").required(),
    description: Joi.string().min(20).label("Project description").required(),
    author: Joi.string().min(3).label("Name of Student").required(),
    regNo: Joi.string().min(9).label("Registration Number").required(),
    session: Joi.string().min(9).label("Session").required(),
    sponsor: Joi.string().allow(""),
    sponsorLogoUrl: Joi.string().allow(""),
    createdAt: Joi.number(),
  };

  componentDidMount() {
    if (!auth.getCurrentUser()?.isAdmin)
      return this.props.history.push("/projects");

    const { projects, types } = this.props;
    const { id } = this.props.match.params;

    this.setState({ options: types.map(this.mapTypeToOption) });

    if (id === "new") return;

    const project = projects.find((p) => p.id === id);

    if (!project) return this.props.history.push("/projects");

    this.setState({ data: this.mapProjectToData(project) });
  }

  mapProjectToData = (project: Project) => {
    return {
      title: project.title,
      typeId: project.type.id,
      author: project.author,
      regNo: project.regNo,
      session: project.session,
      createdAt: project.createdAt,
      sponsor: project.sponsor.name || "",
      sponsorLogoUrl: project.sponsor.logoUrl || "",
      description: project.description,
    };
  };

  mapTypeToOption = (type: ProjectType): SelectOption => ({
    value: type.id,
    label: type.name,
  });

  mapDataToProject(): Project {
    const { data } = this.state;

    const { id } = this.props.match.params;

    return {
      id: id === "new" ? generatorId() : id,
      title: data.title,
      type: this.props.types.find((type) => type.id === data.typeId),
      description: data.description,
      author: data.author,
      regNo: data.regNo.toUpperCase(),
      session: data.session,
      createdAt: data.createdAt,
      lastModified: Date.now(),
      sponsor: {
        name: data.sponsor,
        logoUrl: data.sponsorLogoUrl,
      },
    };
  }

  doSubmit() {
    const { id } = this.props.match.params;

    if (id === "new") projectService.add(this.mapDataToProject());
    else projectService.update(this.mapDataToProject());

    this.props.history.push("/projects");
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Project Form</h1>

        {this.renderInput("title", "Title")}
        {this.renderSelect("typeId", "Type", this.state.options)}
        {this.renderTextArea("description", "Brief Description of Project")}
        {this.renderInput("author", "Name of Student")}
        {this.renderInput("regNo", "Registration Number")}
        {this.renderInput("session", "Session")}
        {this.renderInput("sponsor", "Sponsor")}
        {this.renderInput("sponsorLogoUrl", "Sponsor's Logo URL")}
        {this.renderButton("Save")}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  types: state.entities.types,
  projects: state.entities.projects,
});

export default connect(mapStateToProps)(ProjectForm);
