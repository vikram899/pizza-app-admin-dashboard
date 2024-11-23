import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Space, Table } from "antd";
import { Link, Navigate } from "react-router-dom";
import { getAllUsers } from "../../http/api";
import { User } from "../../types";
import { useAuthStore } from "../../store";
import { Roles } from "../../constants";

const getUsers = async () => {
  const users = await getAllUsers();
  return users.data;
};

const Users = () => {
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["uses"],
    queryFn: getUsers,
  });

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
        {isLoading && <div>Loading...</div>}
        {isError && <div>{error.message}</div>}
        <Table columns={columns} dataSource={userData} />;
      </Space>
    </div>
  );
};

export default Users;
