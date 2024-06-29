import React from "react";
import loader from "../../assets/loader/loaderanimation.json";
import LottieLoader from "react-lottie-loader";

export default function Loader() {
  return (
    <div>
      <p>Hii</p>
      <LottieLoader animationData={loader} />
    </div>
  );
}
