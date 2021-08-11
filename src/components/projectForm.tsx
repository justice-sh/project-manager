import Joi from "joi";
import { connect } from "react-redux";
import Project from "../types/project";
import ProjectType from "../types/projectType";
import SelectOption from "../types/selectOption";
import projectService from "../services/projectService";
import Form from "./common/form";
import generatorId from "../utils/idGenerator";

class ProjectForm extends Form {
  state = {
    data: {
      title: "",
      typeId: "",
      author: "",
      regNo: "",
      session: "",
      createdAt: 0,
    },
    options: [],
    errors: {},
  };

  schema = {
    title: Joi.string().min(3).label("Title").required(),
    typeId: Joi.string().label("Type of Project").required(),
    author: Joi.string().min(3).label("Name of Student").required(),
    regNo: Joi.string().min(9).label("Registration Number").required(),
    session: Joi.string().min(9).label("Session").required(),
    createdAt: Joi.number(),
  };

  componentDidMount() {
    const { projects, types } = this.props;
    const { id } = this.props.match.params;

    this.setState({ options: types.map(this.mapTypeToOption) });

    if (id === "new") return;

    const project = projects.find((p) => p.id === id);

    if (!project) return this.props.history.push("/projects");

    this.setState({ data: this.mapProjectToData(project) });
  }

  mapProjectToData = (project: Project) => {
    const data = { ...project, typeId: project.type.id };

    delete data.type;
    delete data.id;
    delete data.lastModified;

    return data;
  };

  mapTypeToOption = (type: ProjectType): SelectOption => ({
    value: type.id,
    label: type.name,
  });

  mapDataToProject(): Project {
    const { author, title, session, regNo, typeId, createdAt } =
      this.state.data;

    const { id } = this.props.match.params;

    const type = this.props.types.find((type) => type.id === typeId);

    return {
      id: id === "new" ? generatorId() : id,
      title,
      author,
      regNo: regNo.toUpperCase(),
      type,
      session,
      createdAt: createdAt ? createdAt : Date.now(),
      lastModified: Date.now(),
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
        {this.renderInput("author", "Name of Student")}
        {this.renderInput("regNo", "Registration Number")}
        {this.renderInput("session", "Session")}
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
