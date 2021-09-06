import styled from "styled-components";

import store from "../store";

import RouteProps from "../types/routeProps";

interface Props extends RouteProps {}

function ProjectView(props: Props) {
  const { id } = props.match.params;
  const project = store.getProject(id);

  if (!project) return <div>404</div>;

  return (
    <Wrapper>
      <div className="view-info">
        <Input name="Project title" value={project.title} />
        <Input name="Project type" value={project.type.name} />
        <Input name="Description" value={project.description} />
      </div>

      {project.sponsor.name && (
        <div className="view-sponsor">
          <Input name="Sponsor" value={project.sponsor.name} />
        </div>
      )}

      {project.author && (
        <div className="view-student">
          <Input name="Student" value={project.author} />
          <Input name="Reg. No." value={project.regNo} />
          <Input name="Session" value={project.session} />
        </div>
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

function Input(props: { name: string; value: string }) {
  const { name, value } = props;

  return (
    <InputWrapper>
      <div className="input-name">{name}</div>
      <div className="input-value">{value}</div>
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  display: flex;
  margin-bottom: 2px;
  padding: 0;
  background-color: #fff;
  font-size: 20px;

  .input-name {
    flex-basis: 14%;
    color: #5252fa;
    padding: 5px;
    margin: 1;
  }

  .input-value {
    flex-basis: 87%;
    padding: 5px;
    margin: 1;
  }
`;

export default ProjectView;
