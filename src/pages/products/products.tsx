import { Breadcrumb, Button, Space, Form } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import ProductFilter from "./ProductFilter";

const Products = () => {
  const [filterForm] = Form.useForm();

  return (
    <>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Breadcrumb
          separator=">"
          items={[
            {
              title: <Link to="/">Dashboard</Link>,
            },
            {
              title: <Link to="/products">Products</Link>,
            },
          ]}
        ></Breadcrumb>

        <Form form={filterForm} onFieldsChange={() => {}}>
          <ProductFilter>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => {}}>
              Add Product
            </Button>
          </ProductFilter>
        </Form>
      </Space>
    </>
  );
};

export default Products;
