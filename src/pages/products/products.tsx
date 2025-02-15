import {
  Breadcrumb,
  Button,
  Space,
  Form,
  Table,
  Image,
  Typography,
  Tag,
  Spin,
  Drawer,
  theme,
} from "antd";
import { Link } from "react-router-dom";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import ProductFilter from "./ProductFilter";
import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { PER_PAGE } from "../../constants";
import { createProduct, getAllProducts } from "../../http/api";
import { Category, FieldData, Product } from "../../types";
import { debounce } from "lodash";
import ProductForm from "./forms/ProductForm";
import { makeFormData } from "./forms/helper";

const columns = [
  {
    title: "Product Name",
    dataIndex: "name",
    key: "name",
    render: (_text: string, record: Product) => {
      return (
        <div>
          <Space>
            <Image width={60} src={record.image} preview={false}></Image>
            <Typography.Text>{record.name}</Typography.Text>
          </Space>
        </div>
      );
    },
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Status",
    dataIndex: "isPublish",
    key: "isPublish",
    render: (_text: string, record: Product) => {
      return (
        <>
          {record.isPublish ? (
            <Tag color="green">Published</Tag>
          ) : (
            <Tag color="red">Draft</Tag>
          )}
        </>
      );
    },
  },
];

const Products = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();
  const [queryParams, setQueryParmas] = useState({
    currentPage: 1,
    perPage: PER_PAGE,
    //Pass tenantId
  });
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const getProducts = async (queryParams: any) => {
    const filteredParams = Object.fromEntries(
      Object.entries(queryParams).filter((item) => !!item[1])
    );

    const queryString = new URLSearchParams(
      filteredParams as unknown as Record<string, string>
    ).toString();

    const products = await getAllProducts(queryString);
    return products?.data;
  };

  const {
    data: ProductsData,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => getProducts(queryParams),
    placeholderData: keepPreviousData,
  });

  const debounceQUpdate = useMemo(() => {
    return debounce((value: string | undefined) => {
      setQueryParmas((prev) => ({ ...prev, q: value, currentPage: 1 }));
    }, 200);
  }, []);

  const onFilterChange = async (changedFields: FieldData[]) => {
    const changedFilterFields = changedFields
      .map((item) => ({ [item.name[0]]: item.value }))
      .reduce((acc, item) => ({ ...acc, ...item }), {});
    if ("q" in changedFilterFields) {
      debounceQUpdate(changedFilterFields.q);
    } else {
      setQueryParmas((prev) => ({
        ...prev,
        ...changedFilterFields,
        currentPage: 1,
      }));
    }
  };

  const queryClient = useQueryClient();
  const { mutate: productMutate, isPending: isCreateLoading } = useMutation({
    mutationKey: ["product"],
    mutationFn: async (data: FormData) =>
      createProduct(data).then((res) => res.data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      form.resetFields();
      setDrawerOpen(false);
      return;
    },
  });

  const onHandleSubmit = async () => {
    await form.validateFields();

    const priceConfiguration = form.getFieldValue("priceConfiguration");
    console.log(priceConfiguration);
    const pricing = Object.entries(priceConfiguration).reduce(
      (acc, [key, value]) => {
        const parsedKey = JSON.parse(key);
        return {
          ...acc,
          [parsedKey.configurationKey]: {
            priceType: parsedKey.priceType,
            availableOptions: value,
          },
        };
      },
      {}
    );

    const categoryId = form.getFieldValue("categoryId");

    const attributes = Object.entries(form.getFieldValue("attributes")).map(
      ([key, value]) => {
        return {
          name: key,
          value: value,
        };
      }
    );

    const postData = {
      ...form.getFieldsValue(),
      tenantId: form.getFieldValue("tenantId"),
      isPublish: form.getFieldValue("isPublish") ? true : false,
      image: form.getFieldValue("image"),
      categoryId,
      priceConfiguration: pricing,
      attributes,
    };

    console.log(postData);

    const formData = makeFormData(postData);
    await productMutate(formData);
  };

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
        {isFetching && (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        )}
        {isError && (
          <Typography.Text type="danger">{error.message}</Typography.Text>
        )}

        <Form form={filterForm} onFieldsChange={onFilterChange}>
          <ProductFilter>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setDrawerOpen(true);
              }}
            >
              Add Product
            </Button>
          </ProductFilter>
        </Form>

        <Table
          columns={columns}
          dataSource={ProductsData?.data}
          rowKey={"_id"}
          pagination={{
            total: ProductsData?.total,
            pageSize: queryParams.perPage,
            current: queryParams.currentPage,
            onChange: (page) => {
              setQueryParmas((prev) => {
                return {
                  ...prev,
                  currentPage: page,
                };
              });
            },
            showTotal: (total: number, range: number[]) => {
              return `Showing ${range[0]}-${range[1]} of ${total} items`;
            },
          }}
        />

        <Drawer
          title={"Add Product"}
          width={720}
          destroyOnClose={true}
          onClose={() => {
            setDrawerOpen(false);
            form.resetFields();
          }}
          open={drawerOpen}
          extra={
            <Space>
              <Button
                onClick={() => {
                  setDrawerOpen(false);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
              <Button type="primary" onClick={onHandleSubmit}>
                Submit
              </Button>
            </Space>
          }
          styles={{
            body: {
              background: colorBgLayout,
            },
          }}
        >
          <Form layout="vertical" form={form}>
            <ProductForm form={form} />
          </Form>
        </Drawer>
      </Space>
    </>
  );
};

export default Products;
