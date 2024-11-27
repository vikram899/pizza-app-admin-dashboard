import { Row, Col, Card, Input, Form } from "antd";

const RestaurantForm = () => {
  return (
    <Row>
      <Col span={24}>
        <Card title="Basic info">
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Name is required" }]}
              >
                <Input size="large"></Input>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: "Address is required" }]}
              >
                <Input size="large"></Input>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default RestaurantForm;
