import {
  Row,
  Col,
  Space,
  Card,
  Input,
  Select,
  Form,
  Typography,
  Switch,
} from "antd";

import { Category, Tenant } from "../../../types";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories, getAllTenants } from "../../../http/api";
import Pricing from "./Pricing";
import Attributes from "./Attributes";
import { FormInstance } from "antd/es/form";
import ProductImage from "./ProductImage";

const ProductForm = ({ form }: { form: FormInstance }) => {
  const selectedCategory = Form.useWatch("categoryId");

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return getAllCategories();
    },
  });

  const { data: restaurants } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => {
      return getAllTenants("perPage=100&currentPage=1");
    },
  });

  return (
    <Row>
      <Col span={24}>
        <Space direction="vertical" size="large">
          <Card title="Product info">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Product name"
                  name="name"
                  rules={[
                    { required: true, message: "Product name is required" },
                  ]}
                >
                  <Input size="large"></Input>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Category"
                  name="categoryId"
                  rules={[{ required: true, message: "Category is required" }]}
                >
                  <Select
                    id="selectBoxInuserForm"
                    placeholder="Select category"
                    allowClear={true}
                    style={{ width: "100%" }}
                    size="large"
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
              <Col span={24}>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    { required: true, message: "Description is required" },
                  ]}
                >
                  <Input.TextArea
                    rows={2}
                    maxLength={100}
                    size="large"
                    style={{ resize: "none" }}
                  ></Input.TextArea>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Upload Image">
            <Row gutter={20}>
              <Col span={12}>
                <ProductImage initialImage={form.getFieldValue("image")} />
              </Col>
            </Row>
          </Card>
          <Card title="Tenant info">
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item label="Restaurant" name="tenantId">
                  <Select
                    placeholder="Select restaurant"
                    allowClear={true}
                    style={{ width: "100%" }}
                    size="large"
                  >
                    {restaurants &&
                      restaurants?.data?.data?.map((tenant: Tenant) => (
                        <Select.Option value={tenant.id} key={tenant.id}>
                          {tenant.name}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          {selectedCategory && <Pricing selectedCategory={selectedCategory} />}
          {selectedCategory && (
            <Attributes selectedCategory={selectedCategory} />
          )}
          <Card title="Other properties">
            <Row gutter={24}>
              <Col span={24}>
                <Space>
                  <Form.Item name="isPublish">
                    <Switch
                      defaultChecked={false}
                      onChange={() => {}}
                      checkedChildren="yes"
                      unCheckedChildren="no"
                    />
                  </Form.Item>
                  <Typography.Text
                    style={{ marginBottom: "22px", display: "block" }}
                  >
                    Publish
                  </Typography.Text>
                </Space>
              </Col>
            </Row>
          </Card>
        </Space>
      </Col>
    </Row>
  );
};

export default ProductForm;
