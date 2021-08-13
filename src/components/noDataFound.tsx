import LottieAnimation from "./common/lottieAnimation";

import animationData from "../media/noDataFound.json";

function NoDataFound() {
  return <LottieAnimation animationData={animationData} width={75} />;
}

export default NoDataFound;
