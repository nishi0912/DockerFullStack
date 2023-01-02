import { Typography, Row, Col } from "antd";
import { RiHeartFill } from "react-icons/ri";

const Footer = () => {
  const date = new Date();

  return (
    <div className="footer-screen">
      <Row justify="center" align="middle">
        <Col>
          <Typography className="footer-text">Keep Blogged In</Typography>
        </Col>
        <Col>
          <RiHeartFill className="footer-heart-icon" />
        </Col>
        <Col span={24}>
          <Row gutter={[0, 12]} justify={"center"}>
            <Col span={24} />
            <Col>&copy; {date.getFullYear()}</Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
