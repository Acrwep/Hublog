import React from "react";
import ContentLoader from "react-content-loader";

const AppsandUrlsLoader = () => (
  <ContentLoader
    speed={1}
    width="100%"
    // height="100%"
    viewBox="0 0 300 96"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    {/* Card Title */}
    {/* <rect x="4" y="2" rx="10" ry="10" width="70" height="12" /> */}
    {/* Card content */}
    <rect x="0" y="6" rx="10" ry="10" width="90" height="10" />
    <rect x="0" y="37" rx="10" ry="10" width="195" height="11" />
    {/* Card timing*/}
    <rect x="0" y="72" rx="10" ry="10" width="76" height="10" />

    {/* <rect x="10" y="150" rx="4" ry="4" width="580" height="160" />
    <rect x="420" y="300" rx="5" ry="5" width="80" height="35" />{" "}
    <rect x="510" y="300" rx="5" ry="5" width="80" height="35" />{" "} */}
  </ContentLoader>
);

export default AppsandUrlsLoader;
