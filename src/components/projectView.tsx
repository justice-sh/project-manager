import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";

import store from "../store";

import RouteProps from "../types/routeProps";

interface Props extends RouteProps {}

function ProjectView(props: Props) {
  const { id } = props.match.params;
  const project = store.getProject(id);

  if (!project) return <Redirect to="/error" />;

  return (
    <Wrapper>
      {project.sponsor.logoUrl && (
        <div className="view-sponsor">
          <Input name="Sponsor" url={project.sponsor.logoUrl} />
        </div>
      )}

      <div className="view-info">
        <Input name="Project title" value={project.title} />
        <Input name="Project type" value={project.type.name} />
        <Input name="Description" value={project.description} />
      </div>

      {project.author && (
        <div className="view-student">
          <Input name="Student" value={project.author} />
          <Input name="Reg. No." value={project.regNo} />
          <Input name="Session" value={project.session} />
        </div>
      )}

      {!project.author && (
        <Link
          style={{ marginTop: "20px" }}
          to={`/projectForm/${project.id}`}
          className="btn btn-primary btn-lg"
        >
          ACCEPT THIS CHALLENGE
        </Link>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;

  .view-student {
    margin-top: 20px;
  }

  .view-sponsor {
    margin-top: 20px;
  }
`;

interface InputProps {
  name: string;
  value?: string;
  url?: string;
}

function Input(props: InputProps) {
  const { name, value, url } = props;

  return (
    <InputWrapper>
      <div className="input-name">{name}</div>
      {value && <div className="input-value">{value}</div>}
      {url && (
        <div className="input-value">
          <img src={url} alt="sponsor" />
        </div>
      )}
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  display: flex;
  margin-bottom: 5px;
  padding: 10px;
  background-color: #fff;
  font-size: 20px;

  .input-name {
    width: 180px;
    color: #5252fa;
    padding: 5px;
    margin: 1;
    font-weight: 500;
    text-transform: uppercase;
  }

  .input-value {
    flex-basis: 100%;
    padding: 5px;
    margin: 1;
    text-align: center;
  }

  @media (max-width: 999px) {
    flex-wrap: wrap;
  }
`;

export default ProjectView;
