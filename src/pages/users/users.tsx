import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Button, Drawer, Space, Table, theme, Form } from "antd";
import { Link, Navigate } from "react-router-dom";
import { createUser, getAllUsers } from "../../http/api";
import { CreateUserType, User } from "../../types";
import { useAuthStore } from "../../store";
import { Roles } from "../../constants";
import UserFilter from "./UserFilter";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import UserForm from "./forms/UserForm";

const getUsers = async () => {
  const users = await getAllUsers();
  return users.data;
};

const Users = () => {
  const queryClient = useQueryClient();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form] = Form.useForm();

  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const {
    token: { colorBgLayout },
  } = theme.useToken();
  const { user } = useAuthStore();

  if (user?.role !== Roles.Admin) {
    return <Navigate to="/" replace={true}></Navigate>;
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text: string, record: User) => {
        return (
          <Link to={`/users/${record.id}`}>
            <Space>
              {record.firstName}
              {record.lastName}
            </Space>
          </Link>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Tenant",
      key: "tenant",
      render: (record: User) => {
        return record.tenant ? record.tenant.name : "No Tenant";
      },
    },
  ];

  const addUser = async (creatUserData: CreateUserType) => {
    const { data } = await createUser(creatUserData);
    return data;
  };

  const { mutate: userMutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: addUser,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setDrawerOpen(false);
      form.resetFields();
      return;
    },
  });

  const onHandleSubmit = async () => {
    await form.validateFields();
    userMutate(form.getFieldsValue());
  };

  return (
    <div>
      <Space style={{ width: "100%" }} size={"large"} direction={"vertical"}>
        <Breadcrumb
          separator=">"
          items={[
            {
              title: <Link to="/">Dashboard</Link>,
            },
            {
              title: <Link to="/users">Users</Link>,
            },
          ]}
        ></Breadcrumb>
        <UserFilter
          onFilterChange={(filterName: string, filterValue: string) =>
            console.log(filterName, filterValue)
          }
        >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setDrawerOpen(true)}
          >
            Add User
          </Button>
        </UserFilter>
        {isLoading && <div>Loading...</div>}
        {isError && <div>{error.message}</div>}
        <Table columns={columns} dataSource={userData} rowKey={"id"} />;
        <Drawer
          title="Create user"
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
            <UserForm />
          </Form>
        </Drawer>
      </Space>
    </div>
  );
};

export default Users;
