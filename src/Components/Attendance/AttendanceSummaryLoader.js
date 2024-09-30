import React from "react";
import ContentLoader from "react-content-loader";

const AttendanceSummaryLoader = () => (
  <ContentLoader
    speed={1}
    width="100%"
    // height="100%"
    viewBox="0 0 300 90"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="6" rx="10" ry="10" width="135" height="16" />
    <rect x="0" y="60" rx="10" ry="10" width="165" height="20" />
  </ContentLoader>
);

export default AttendanceSummaryLoader;
