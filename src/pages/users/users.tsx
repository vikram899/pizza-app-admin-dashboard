import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Breadcrumb,
  Button,
  Drawer,
  Space,
  Table,
  theme,
  Form,
  Spin,
  Typography,
} from "antd";
import { Link, Navigate } from "react-router-dom";
import { createUser, getAllUsers, updateUser } from "../../http/api";
import { CreateUserType, FieldData, User } from "../../types";
import { useAuthStore } from "../../store";
import { PER_PAGE, Roles } from "../../constants";
import UserFilter from "./UserFilter";
import { useMemo, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import UserForm from "./forms/UserForm";
import { debounce } from "lodash";

const getUsers = async (queryParams: any) => {
  const filteredParams = Object.fromEntries(
    Object.entries(queryParams).filter((item) => !!item[1])
  );

  const queryString = new URLSearchParams(
    filteredParams as unknown as Record<string, string>
  ).toString();

  const users = await getAllUsers(queryString);
  return users?.data;
};

const Users = () => {
  const queryClient = useQueryClient();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editSelected, setEditSelected] = useState(false);
  const [editableUser, setEditableUser] = useState(0);
  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();
  const [queryParams, setQueryParmas] = useState({
    currentPage: 1,
    perPage: PER_PAGE,
  });

  const {
    data: userData,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["users", queryParams],
    queryFn: () => getUsers(queryParams),
    placeholderData: keepPreviousData,
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
    {
      title: "Actions",
      render: (record: User) => {
        return (
          <Space>
            <Button
              type="link"
              onClick={() => {
                setEditSelected(true);
                setDrawerOpen(true);
                setEditableUser(record.id);
                form.setFieldsValue({
                  ...record,
                  tenantId: record.tenant?.id,
                });
              }}
            >
              Edit
            </Button>
          </Space>
        );
      },
    },
  ];

  const addUser = async (creatUserData: CreateUserType) => {
    const { data } = await createUser(creatUserData);
    return data;
  };
  const updateUserFn = async ({
    updateUserData,
    userId,
  }: {
    updateUserData: CreateUserType;
    userId: number;
  }) => {
    try {
      await updateUser(updateUserData, userId);
      //return data;
    } catch (error) {
      throw error;
    }
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
  const { mutate: userUpdateMutate } = useMutation({
    mutationKey: ["user-update"],
    mutationFn: updateUserFn,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setDrawerOpen(false);
      form.resetFields();
      return;
    },
  });

  const onHandleSubmit = async () => {
    if (editSelected) {
      await form.validateFields();
      userUpdateMutate({
        updateUserData: form.getFieldsValue(),
        userId: editableUser,
      });
    } else {
      await form.validateFields();
      userMutate(form.getFieldsValue());
    }
    setEditSelected(false);
    form.resetFields();
    setDrawerOpen(false);
  };

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
        <Form form={filterForm} onFieldsChange={onFilterChange}>
          <UserFilter>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setDrawerOpen(true)}
            >
              Add User
            </Button>
          </UserFilter>
        </Form>
        {isFetching && (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        )}
        {isError && (
          <Typography.Text type="danger">{error.message}</Typography.Text>
        )}
        <Table
          columns={columns}
          dataSource={userData?.data}
          rowKey={"id"}
          pagination={{
            total: userData?.total,
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
        ;
        <Drawer
          title={editSelected ? "Edit user" : "Create user"}
          width={720}
          destroyOnClose={true}
          onClose={() => {
            setEditSelected(false);
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
            <UserForm isEditSelected={editSelected} />
          </Form>
        </Drawer>
      </Space>
    </div>
  );
};

export default Users;
