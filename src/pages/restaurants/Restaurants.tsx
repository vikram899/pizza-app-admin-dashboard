import { Space, Breadcrumb, Table, Button, Drawer, theme, Form } from "antd";
import { Link } from "react-router-dom";
import { CreateTenantType, Tenant } from "../../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTenant, getAllTenants } from "../../http/api";
import { useState } from "react";
import RestaurantFilter from "./RestaurantFilter";
import { PlusOutlined } from "@ant-design/icons";
import RestaurantForm from "./forms/RestaurantForm";

const Restaurants = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Tenant) => {
        return (
          <Link to={`/users/${record.id}`}>
            <Space>{record.name}</Space>
          </Link>
        );
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const getTenants = async () => {
    const { data } = await getAllTenants();
    return data.tenants;
  };

  const addRestaurant = async (creatTenantData: CreateTenantType) => {
    const { data } = await createTenant(creatTenantData);
    return data;
  };

  const { mutate: tenantMutate } = useMutation({
    mutationKey: ["tenant"],
    mutationFn: addRestaurant,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
      setDrawerOpen(false);
      form.resetFields();
      return;
    },
  });

  const onHandleSubmit = async () => {
    await form.validateFields();
    tenantMutate(form.getFieldsValue());
    console.log(form.getFieldsValue());
  };

  const {
    data: tenantData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tenants"],
    queryFn: getTenants,
  });
  return (
    <div>
      <div>
        <Space style={{ width: "100%" }} size={"large"} direction={"vertical"}>
          <Breadcrumb
            separator=">"
            items={[
              {
                title: <Link to="/">Dashboard</Link>,
              },
              {
                title: <Link to="/restaurants">Restaurants</Link>,
              },
            ]}
          ></Breadcrumb>
          <RestaurantFilter
            onFilterChange={(filterName: string, filterValue: string) =>
              console.log(filterName, filterValue)
            }
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setDrawerOpen(true)}
            >
              Add Restaurant
            </Button>
          </RestaurantFilter>
          {isLoading && <div>Loading...</div>}
          {isError && <div>{error.message}</div>}
          <Table columns={columns} dataSource={tenantData} />
          <Drawer
            title="Create tenant"
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
              <RestaurantForm />
            </Form>
          </Drawer>
        </Space>
      </div>
    </div>
  );
};

export default Restaurants;
