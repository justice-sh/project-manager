import styled from "styled-components";

import LottieAnimation from "./common/lottieAnimation";

import store from "../store";
import { congratsToggled } from "../store/ui";

import congrats from "../media/congrats.json";

function Congrats() {
  return (
    <Wrapper>
      <div className="congrats" data-aos="flip-down" data-aos-duration={1000}>
        <button
          className="congrats-close btn-primary btn-sm"
          onClick={() => store.dispatch(congratsToggled, { congrats: false })}
        >
          Close
        </button>

        <LottieAnimation animationData={congrats} width={100} loop />

        <div className="congrats-text">
          <h5>You may now begin to write on your project.</h5>
          <div className="form-control">
            Project Title: {store.getLastProject().title}
          </div>
          <div className="form-control">
            Project Type: {store.getLastProject().type.name}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 1px;
  left: 1px;
  width: 99%;
  height: 80%;
  z-index: 111;
  display: flex;
  justify-content: center;
  align-items: center;

  .congrats {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 40%;
  }

  .congrats-close {
    position: absolute;
    top: 1px;
    right: 60px;
    z-index: 111;
  }

  .congrats-text {
    position: absolute;
    bottom: -70px;
    color: black;
    z-index: 111;
  }
`;

export default Congrats;
