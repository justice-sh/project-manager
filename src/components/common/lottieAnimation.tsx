import Lottie from "react-lottie";
import styled from "styled-components";

interface Props {
  animationData: any;
  width: number;
  loop?: boolean;
}

function LottieAnimation(props: Props) {
  const { animationData, width, loop = false } = props;

  const defaultOptions = {
    loop,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Wrapper width={width}>
      <div className="lottie">
        <Lottie options={defaultOptions} />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ width: number }>`
  display: flex;
  justify-content: center;
  border: 4px solid #b5c6e0;

  .lottie {
    min-width: 300px;
    width: ${(props) => props.width + "%"};
  }
`;

export default LottieAnimation;
