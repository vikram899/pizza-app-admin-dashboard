import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";
import {
  Avatar,
  Badge,
  Dropdown,
  Flex,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";
import Icon, { BellFilled } from "@ant-design/icons";
import { useState } from "react";
import Logo from "../components/icons/Logo";
import GiftIcon from "../components/icons/GiftIcon";
import BasketIcon from "../components/icons/BasketIcon";
import { foodIcon } from "../components/icons/FoodIcon";
import UserIcon from "../components/icons/UserIcon";
import Home from "../components/icons/Home";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../http/api";
import { Roles } from "../constants";
import menu from "antd/es/menu";

const logoutUser = async () => {
  await logout();
};

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout: logoutStore } = useAuthStore();

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutUser,
    onSuccess: async () => {
      logoutStore();
      return;
    },
  });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { Header, Content, Footer, Sider } = Layout;
  if (!user) {
    return <Navigate to="/auth/login" replace={true} />;
  }

  const getMenuItems = (role: string) => {
    const baseItems = [
      {
        key: "/",
        icon: <Icon component={Home}></Icon>,
        label: <NavLink to="/">Home</NavLink>,
      },
      {
        key: "/restaurants",
        icon: <Icon component={foodIcon}></Icon>,
        label: <NavLink to="/restaurants">Restaurants</NavLink>,
      },
      {
        key: "/products",
        icon: <Icon component={BasketIcon}></Icon>,
        label: <NavLink to="/products">Products</NavLink>,
      },
      {
        key: "/promos",
        icon: <Icon component={GiftIcon}></Icon>,
        label: <NavLink to="/promos">Promos</NavLink>,
      },
    ];

    if (role === Roles.Admin) {
      const menu = [...baseItems];
      menu.splice(1, 0, {
        key: "/users",
        icon: <Icon component={UserIcon}></Icon>,
        label: <NavLink to="/users">Users</NavLink>,
      });
      return menu;
    }
    return baseItems;
  };

  const items = getMenuItems(user.role);

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo">
            <Logo />
          </div>
          <Menu
            theme="light"
            defaultSelectedKeys={["/"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              paddingLeft: "16px",
              paddingRight: "16px",
              background: colorBgContainer,
            }}
          >
            <Flex gap="middle" align="start" justify="space-between">
              <Badge
                text={
                  user.role === Roles.Admin ? "Hello, Admin" : user.tenant?.name
                }
                status="success"
              />
              <Space size={16}>
                <Badge dot={true}>
                  <BellFilled />
                </Badge>
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "logout",
                        label: "logout",
                        onClick: () => logoutMutate(),
                      },
                    ],
                  }}
                  placement="bottomRight"
                >
                  <Avatar
                    style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                  >
                    A
                  </Avatar>
                </Dropdown>
              </Space>
            </Flex>
          </Header>
          <Content style={{ margin: "24px 16px" }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Pizza shop ©{new Date().getFullYear()} Created by Vikram Deshmukh
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;
