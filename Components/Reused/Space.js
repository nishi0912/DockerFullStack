import { Row, Col } from "antd";

const Space = ({ spacing }) => {
  return (
    <Col span={24}>
      <Row gutter={[0, spacing]}>
        <Col span={24} />
        <Col style={{ color: "transparent" }}>.</Col>
      </Row>
    </Col>
  );
};

export default Space;
