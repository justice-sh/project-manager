import LottieAnimation from "./common/lottieAnimation";

import animationData from "../media/pageError.json";

function ErrorPage() {
  return <LottieAnimation animationData={animationData} width={70} loop />;
}

export default ErrorPage;
