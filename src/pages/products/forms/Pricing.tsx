import { Card, Col, Form, InputNumber, Row, Space, Typography } from "antd";
import { Category, PricingProps } from "../../../types";

const Pricing = ({ selectedCategory }: PricingProps) => {
  const category: Category | null = selectedCategory
    ? JSON.parse(selectedCategory)
    : null;

  if (!category) return;

  return (
    <Card
      title={<Typography.Text>Product price</Typography.Text>}
      bordered={false}
    >
      {Object.entries(category?.priceConfiguration).map(
        ([configKey, configValue]) => {
          return (
            <div key={configKey}>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                <Typography.Text>
                  {`${configKey} (${configValue.priceType})`}
                </Typography.Text>
                <Row gutter={20}>
                  {configValue.availableOptions.map((option: string) => {
                    return (
                      <Col span={8} key={option}>
                        <Form.Item
                          label={option}
                          name={[
                            "priceConfiguration",
                            JSON.stringify({
                              configKey: configKey,
                              priceType: configValue.priceType,
                            }),
                            option,
                          ]}
                        >
                          <InputNumber addonAfter="₹"></InputNumber>
                        </Form.Item>
                      </Col>
                    );
                  })}
                </Row>
              </Space>
            </div>
          );
        }
      )}
    </Card>
  );
};

export default Pricing;
Pricing;
