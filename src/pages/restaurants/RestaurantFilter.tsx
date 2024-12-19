import { Card, Row, Col, Input, Form } from "antd";

type TenantFilterProp = {
  children: React.ReactNode;
};

const RestaurantFilter = ({ children }: TenantFilterProp) => {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col span={16}>
          <Col span={12}>
            <Form.Item name="q">
              <Input.Search
                allowClear={true}
                placeholder="Search"
              ></Input.Search>
            </Form.Item>
          </Col>
        </Col>
        <Col style={{ display: "flex", justifyContent: "end" }} span={8}>
          {children}
        </Col>
      </Row>
    </Card>
  );
};

export default RestaurantFilter;
