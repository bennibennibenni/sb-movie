import React from "react";

import "./layout.styles.css";

const Layout = ({ children }) => {
  return <div className="content-container">{children}</div>;
};

export default Layout;
