import { Card, Col, Form, Radio, Row, Switch, Typography } from "antd";
import { Category, PricingProps } from "../../../types";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../../http/api";

const Attributes = ({ selectedCategory }: PricingProps) => {
  const { data } = useQuery({
    queryKey: ["category", selectedCategory],
    queryFn: () => {
      return getCategory(selectedCategory).then((res) => res.data);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (!data?.category) return null;
  const fetchedCategory: Category = data.category;

  return (
    <Card
      title={<Typography.Text>Attributes</Typography.Text>}
      bordered={false}
    >
      {fetchedCategory?.attributes?.map((attribute) => {
        return (
          <div key={attribute.name}>
            {attribute.widgetType === "radio" ? (
              <Form.Item
                label={attribute.name}
                name={["attributes", attribute.name]}
                initialValue={attribute.defaultValue}
                rules={[
                  {
                    required: true,
                    message: `${attribute.name} is required`,
                  },
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
                    name={["attributes", attribute.name]}
                    valuePropName="checked"
                    label={attribute.name}
                    initialValue={attribute.defaultValue}
                  >
                    <Switch checkedChildren="Yes" unCheckedChildren="No" />
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
