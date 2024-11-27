import { Card, Col, Row, Input, Select, Button } from "antd";
import { Roles } from "../../constants";
import { PlusOutlined } from "@ant-design/icons";

type UserFilterProp = {
  children: React.ReactNode;
  onFilterChange: (filterName: string, filterValue: string) => void;
};

const UserFilter = ({ onFilterChange, children }: UserFilterProp) => {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col span={16}>
          <Row gutter={20}>
            <Col span={8}>
              <Input.Search
                allowClear={true}
                placeholder="Search"
                onChange={(e) => onFilterChange("searchFilter", e.target.value)}
              ></Input.Search>
            </Col>
            <Col span={8}>
              <Select
                placeholder="Select role"
                allowClear={true}
                style={{ width: "100%" }}
                onChange={(selectedItem) =>
                  onFilterChange("roleFilter", selectedItem)
                }
              >
                <Select.Option value={Roles.Admin}>Admin</Select.Option>
                <Select.Option value={Roles.Manager}>Manager</Select.Option>
                <Select.Option value={Roles.Customer}>Customer</Select.Option>
              </Select>
            </Col>
            <Col span={8}>
              <Select
                placeholder="Select status"
                allowClear={true}
                style={{ width: "100%" }}
                onChange={(selectedItem) =>
                  onFilterChange("statusFilter", selectedItem)
                }
              >
                <Select.Option value="ban">Ban</Select.Option>
                <Select.Option value="active">Active</Select.Option>
              </Select>
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
