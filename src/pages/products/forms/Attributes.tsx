import { Card, Col, Form, Radio, Row, Switch, Typography } from "antd";
import { Category, PricingProps } from "../../../types";

const Attributes = ({ selectedCategory }: PricingProps) => {
  const category: Category | null = selectedCategory
    ? JSON.parse(selectedCategory)
    : null;

  if (!category) return;
  return (
    <Card
      title={<Typography.Text>Product price</Typography.Text>}
      bordered={false}
    >
      {category.attributes.map((attribute) => {
        return (
          <div key={attribute.name}>
            {attribute.widgetType === "radio" ? (
              <Form.Item
                label={attribute.name}
                name={["attributes", attribute.name]}
                rules={[
                  { required: true, message: `${attribute.name} is required` },
                ]}
              >
                <Radio.Group>
                  {attribute.availableOptions.map((option) => {
                    return (
                      <Radio.Button value={option} key={option}>
                        {option}
                      </Radio.Button>
                    );
                  })}
                </Radio.Group>
              </Form.Item>
            ) : attribute.widgetType === "switch" ? (
              <Row>
                <Col>
                  <Form.Item
                    label={attribute.name}
                    name={["attributes", attribute.name]}
                    valuePropName="checked"
                    rules={[
                      {
                        required: true,
                        message: `${attribute.name} is required`,
                      },
                    ]}
                    initialValue={true}
                  >
                    <Switch
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    ></Switch>
                  </Form.Item>
                </Col>
              </Row>
            ) : null}
          </div>
        );
      })}
    </Card>
  );
};

export default Attributes;
Attributes;
