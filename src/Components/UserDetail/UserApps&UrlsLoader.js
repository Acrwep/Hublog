import React from "react";
import ContentLoader from "react-content-loader";

const UserAppsandUrlsLoader = () => (
  <ContentLoader
    speed={1}
    width="100%"
    // height="100%"
    viewBox="0 0 300 170"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="16" rx="10" ry="10" width="90" height="19" />
    <rect x="0" y="75" rx="10" ry="10" width="220" height="22" />
    <rect x="0" y="140" rx="10" ry="10" width="90" height="19" />
  </ContentLoader>
);

export default UserAppsandUrlsLoader;
