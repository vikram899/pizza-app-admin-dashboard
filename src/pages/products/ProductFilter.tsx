import {
  Card,
  Row,
  Col,
  Input,
  Select,
  Form,
  Switch,
  Typography,
  Space,
} from "antd";
import { Roles } from "../../constants";

type ProductFilterProp = {
  children: React.ReactNode;
};

const ProductFilter = ({ children }: ProductFilterProp) => {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col span={16}>
          <Row gutter={20}>
            <Col span={6}>
              <Form.Item name="q">
                <Input.Search
                  allowClear={true}
                  placeholder="Search"
                ></Input.Search>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="category">
                <Select
                  placeholder="Select Category"
                  allowClear={true}
                  style={{ width: "100%" }}
                >
                  <Select.Option value={Roles.Admin}>Admin</Select.Option>
                  <Select.Option value={Roles.Manager}>Manager</Select.Option>
                  <Select.Option value={Roles.Customer}>Customer</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="tenant">
                <Select
                  placeholder="Select Restaurant"
                  allowClear={true}
                  style={{ width: "100%" }}
                >
                  <Select.Option value={Roles.Admin}>Admin</Select.Option>
                  <Select.Option value={Roles.Manager}>Manager</Select.Option>
                  <Select.Option value={Roles.Customer}>Customer</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Space>
                <Switch defaultChecked onChange={() => {}} />
                <Typography.Text>Show only publish</Typography.Text>
              </Space>
            </Col>
          </Row>
        </Col>
        <Col style={{ display: "flex", justifyContent: "end" }} span={8}>
          {children}
        </Col>
      </Row>
    </Card>
  );
};

export default ProductFilter;
