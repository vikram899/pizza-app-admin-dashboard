import { Card, Row, Col, Input } from "antd";

type TenantFilterProp = {
  children: React.ReactNode;
  onFilterChange: (filterName: string, filterValue: string) => void;
};

const RestaurantFilter = ({ children, onFilterChange }: TenantFilterProp) => {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col span={16}>
          <Col span={12}>
            <Input.Search
              allowClear={true}
              placeholder="Search"
              onChange={(e) => onFilterChange("searchFilter", e.target.value)}
            ></Input.Search>
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
