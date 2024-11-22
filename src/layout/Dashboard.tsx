import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";
import { Layout, Menu, theme } from "antd";
import Icon from "@ant-design/icons";
import { useState } from "react";
import Logo from "../components/icons/Logo";
import GiftIcon from "../components/icons/GiftIcon";
import BasketIcon from "../components/icons/BasketIcon";
import { foodIcon } from "../components/icons/FoodIcon";
import UserIcon from "../components/icons/UserIcon";
import Home from "../components/icons/Home";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { user } = useAuthStore();
  const { Header, Content, Footer, Sider } = Layout;
  if (!user) {
    return <Navigate to="/auth/login" replace={true} />;
  }

  const items = [
    {
      key: "/",
      icon: <Icon component={Home}></Icon>,
      label: <NavLink to="/">Home</NavLink>,
    },
    {
      key: "/users",
      icon: <Icon component={UserIcon}></Icon>,
      label: <NavLink to="/user">Users</NavLink>,
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
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: "0 16px" }}>
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
