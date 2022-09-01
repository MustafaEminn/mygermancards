import { Col, Row } from "antd";

import Navbar from "../navbar/navbar";
import { ILayoutProps } from "../../../constants/components/UI/layout";

const Layout = ({ children }: ILayoutProps) => {
  return (
    <Row>
      <Col span={24}>
        <Navbar />
      </Col>
      <Col span={24}>{children}</Col>
    </Row>
  );
};

export default Layout;
