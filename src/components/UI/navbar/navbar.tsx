import { Typography } from "antd";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 0 2rem;
`;

const Navbar = () => {
  return (
    <Container>
      <Link to={"/"}>
        <Typography.Title level={1} style={{ margin: 0 }}>
          My German Words
        </Typography.Title>
      </Link>
    </Container>
  );
};

export default Navbar;
