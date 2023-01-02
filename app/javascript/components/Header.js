import React from "react";
import { Row, Col, Typography } from "antd";
// import { history } from "../Utils/history";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Row justify="space-around" className="header-container">
      <Col>
        <Typography className="header-texts">Homepage</Typography>
      </Col>
      <Col style={{ pointer: "cursor" }} onClick={() => navigate("/book")}>
        <Typography className="header-texts">Create</Typography>
      </Col>
      <Col>
        <Typography className="header-texts">Published Books</Typography>
      </Col>
      <Col onClick={() => navigate("/users/sign_in")}>
        <Typography className="header-texts">Login</Typography>
      </Col>
    </Row>
  );
};

export default Header;
