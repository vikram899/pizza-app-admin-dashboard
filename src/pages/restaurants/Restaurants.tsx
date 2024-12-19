import { Space, Breadcrumb, Table, Button, Drawer, theme, Form } from "antd";
import { Link } from "react-router-dom";
import { CreateTenantType, FieldData, Tenant } from "../../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTenant, getAllTenants } from "../../http/api";
import { useMemo, useState } from "react";
import RestaurantFilter from "./RestaurantFilter";
import { PlusOutlined } from "@ant-design/icons";
import RestaurantForm from "./forms/RestaurantForm";
import { PER_PAGE } from "../../constants";
import { debounce } from "lodash";

const Restaurants = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const [queryParams, setQueryParmas] = useState({
    currentPage: 1,
    perPage: PER_PAGE,
  });

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

  const getTenants = async (queryParams: any) => {
    const filteredParams = Object.fromEntries(
      Object.entries(queryParams).filter((item) => !!item[1])
    );

    const queryString = new URLSearchParams(
      filteredParams as unknown as Record<string, string>
    ).toString();

    const tenants = await getAllTenants(queryString);
    return tenants.data.data;
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
    queryKey: ["tenants", queryParams],
    queryFn: () => getTenants(queryParams),
  });
  const [filterForm] = Form.useForm();

  const debounceQUpdate = useMemo(() => {
    return debounce((value: string | undefined) => {
      setQueryParmas((prev) => ({ ...prev, q: value }));
    }, 1000);
  }, []);

  const onFilterChange = async (changedFields: FieldData[]) => {
    const changedFilterFields = changedFields
      .map((item) => ({ [item.name[0]]: item.value }))
      .reduce((acc, item) => ({ ...acc, ...item }), {});
    if ("q" in changedFilterFields) {
      console.log(changedFilterFields.q);
      debounceQUpdate(changedFilterFields.q);
    } else {
      setQueryParmas((prev) => ({ ...prev, ...changedFilterFields }));
    }
  };

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
          <Form form={filterForm} onFieldsChange={onFilterChange}>
            <RestaurantFilter>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setDrawerOpen(true)}
              >
                Add Restaurant
              </Button>
            </RestaurantFilter>
          </Form>
          {isLoading && <div>Loading...</div>}
          {isError && <div>{error.message}</div>}
          <Table
            columns={columns}
            dataSource={tenantData}
            rowKey={"id"}
            pagination={{
              total: tenantData?.total,
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
            }}
          />
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
