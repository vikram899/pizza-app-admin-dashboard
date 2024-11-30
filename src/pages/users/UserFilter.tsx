import { Card, Col, Row, Input, Select, Form } from "antd";
import { Roles } from "../../constants";

type UserFilterProp = {
  children: React.ReactNode;
};

const UserFilter = ({ children }: UserFilterProp) => {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col span={16}>
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item name="q">
                <Input.Search
                  allowClear={true}
                  placeholder="Search"
                ></Input.Search>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="role">
                <Select
                  placeholder="Select role"
                  allowClear={true}
                  style={{ width: "100%" }}
                >
                  <Select.Option value={Roles.Admin}>Admin</Select.Option>
                  <Select.Option value={Roles.Manager}>Manager</Select.Option>
                  <Select.Option value={Roles.Customer}>Customer</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              {/* <Select
                placeholder="Select status"
                allowClear={true}
                style={{ width: "100%" }}
                onChange={(selectedItem) =>
                  onFilterChange("statusFilter", selectedItem)
                }
              >
                <Select.Option value="ban">Ban</Select.Option>
                <Select.Option value="active">Active</Select.Option>
              </Select> */}
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

export default UserFilter;
