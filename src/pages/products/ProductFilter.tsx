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
import { useQuery } from "@tanstack/react-query";
import { getAllTenants, getAllCategories } from "../../http/api";
import { Category, Tenant } from "../../types";

type ProductFilterProp = {
  children: React.ReactNode;
};

const ProductFilter = ({ children }: ProductFilterProp) => {
  const { data: restuarants } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => {
      return getAllTenants("perPage=100&currentPage=1");
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return getAllCategories();
    },
  });

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
              <Form.Item name="categoryId">
                <Select
                  placeholder="Select Category"
                  allowClear={true}
                  style={{ width: "100%" }}
                >
                  {categories?.data.map((category: Category) => {
                    return (
                      <Select.Option key={category._id} value={category._id}>
                        {category.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="tenantId">
                <Select
                  placeholder="Select Restaurant"
                  allowClear={true}
                  style={{ width: "100%" }}
                >
                  {restuarants?.data?.data.map((restaurant: Tenant) => {
                    return (
                      <Select.Option key={restaurant.id} value={restaurant.id}>
                        {restaurant.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Space>
                <Form.Item name="isPublish">
                  <Switch defaultChecked={false} onChange={() => {}} />
                </Form.Item>
                <Typography.Text
                  style={{ marginBottom: "22px", display: "block" }}
                >
                  Show only publish
                </Typography.Text>
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
