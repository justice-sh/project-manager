import React from "react";
import Joi from "joi";

import RouteProps from "../../types/routeProps";

import Input from "./input";
import Select, { SelectOption } from "./select";
import Project from "../../types/project";
import ProjectType from "../../types/projectType";

export interface FormProps extends RouteProps {
  projects: Project[];
  types: ProjectType[];
}

export interface FormState {}

class Form extends React.Component<FormProps, FormState> {
  state = { data: {}, errors: {} };

  schema = {};

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = { ...this.state.errors };

    for (const item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const object = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(object, schema);

    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    const { name, type, value } = input;

    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];

    const data = { ...this.state.data };
    data[name] = type === "number" ? +value : value;
    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  setErrorProperty(property: string, message) {
    const errors = { ...this.state.errors };
    errors[property] = message;
    this.setState({ errors });
  }

  doSubmit() {}

  renderButton(label) {
    return (
      <button disabled={!!this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }

  renderSelect(name, label, options: SelectOption[]) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        options={options}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
