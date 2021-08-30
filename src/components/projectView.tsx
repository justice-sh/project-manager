import styled from "styled-components";

import RouteProps from "../types/routeProps";

interface Props extends RouteProps {}

function ProjectView(props: Props) {
  // const {} = props;

  return (
    <Wrapper>
      <h1>Project View {props.match.params.id}</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default ProjectView;
