import { Card, Col, Form, Input, Row, Select, Space } from "antd";
import { Roles } from "../../../constants";
import { getAllTenants } from "../../../http/api";
import { useQuery } from "@tanstack/react-query";
import { Tenant } from "../../../types";

const getTenants = async () => {
  const tenants = await getAllTenants();
  return tenants.data.tenants;
};

const UserForm = () => {
  const { data: tenantData } = useQuery({
    queryKey: ["tenants"],
    queryFn: getTenants,
  });

  return (
    <Row>
      <Col span={24}>
        <Space direction="vertical" size="large">
          <Card title="Basic info">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="First name"
                  name="firstName"
                  rules={[
                    { required: true, message: "First name is required" },
                  ]}
                >
                  <Input size="large"></Input>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last name"
                  name="lastName"
                  rules={[{ required: true, message: "Last name is required" }]}
                >
                  <Input size="large"></Input>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Email name is required" },
                    {
                      type: "email",
                      message: "Invalid email",
                    },
                  ]}
                >
                  <Input size="large"></Input>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Security info">
            <Row>
              <Col span={12}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Password name is required" },
                  ]}
                >
                  <Input type="password" size="large"></Input>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Role">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Role"
                  name="role"
                  rules={[{ required: true, message: "Role is required" }]}
                >
                  <Select
                    placeholder="Select role"
                    allowClear={true}
                    style={{ width: "100%" }}
                    size="large"
                  >
                    <Select.Option value={Roles.Admin}>Admin</Select.Option>
                    <Select.Option value={Roles.Manager}>Manager</Select.Option>
                    <Select.Option value={Roles.Customer}>
                      Customer
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Restaurant" name="tenantId">
                  <Select
                    placeholder="Select restaurant"
                    allowClear={true}
                    style={{ width: "100%" }}
                    size="large"
                  >
                    {tenantData &&
                      tenantData.map((tenant: Tenant) => (
                        <Select.Option value={tenant.id}>
                          {tenant.name}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Space>
      </Col>
    </Row>
  );
};

export default UserForm;
