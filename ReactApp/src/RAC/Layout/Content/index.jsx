import React from "react";

// styles
import "./styles.scss";

// components
import { Layout } from "antd";

const { Content } = Layout;

function Contents({ children }) {
  return <Content className="app-content">{children}</Content>;
}
export default Contents;