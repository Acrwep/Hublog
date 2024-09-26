import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = () => (
  <ContentLoader
    speed={1}
    width="100%"
    height="100%"
    viewBox="0 0 300 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    {/* Icon Container */}
    <rect x="7" y="0" rx="5" ry="5" width="10" height="10" />
    {/* Notebook Title */}
    <rect x="22" y="0" rx="5" ry="5" width="90" height="9" />
    {/* Heading: "Take your notes" */}
    <rect x="7" y="17" rx="4" ry="4" width="70" height="8" />
    {/* Title Input Field */}
    <rect x="7" y="35" rx="4" ry="4" width="96%" height="160" />

    {/* <rect x="10" y="150" rx="4" ry="4" width="580" height="160" />
    <rect x="420" y="300" rx="5" ry="5" width="80" height="35" />{" "}
    <rect x="510" y="300" rx="5" ry="5" width="80" height="35" />{" "} */}
  </ContentLoader>
);

export default MyLoader;
