import {
  Layout,
  Card,
  Space,
  Button,
  Checkbox,
  Form,
  Input,
  Flex,
  Alert,
} from "antd";
import { LockFilled, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginCredentails } from "../../types";
import { login, self } from "../../http/api";
import { useState } from "react";
import { useAuthStore } from "../../store";

const loginUser = async (loginCredentails: LoginCredentails) => {
  const { data } = await login(loginCredentails);
  return data;
};

const getSelf = async () => {
  const { data } = await self();
  return data;
};

const LoginPage = () => {
  const { setUser } = useAuthStore();

  const { data: selfData, refetch } = useQuery({
    queryKey: ["key"],
    queryFn: getSelf,
    enabled: false, // to not render after component render as we want to trigger this after login
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["Login"],
    mutationFn: loginUser,
    onSuccess: async () => {
      const { data } = await refetch();
      setUser(data);
    },
  });

  return (
    <>
      <Layout></Layout>
      <Layout
        style={{ height: "100vh", display: "grid", placeItems: "center" }}
      >
        <Space direction="vertical" align="center" size="large">
          <Layout.Content
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src="/src/assets/Logo.svg"></img>
          </Layout.Content>
          <Card
            bordered={false}
            style={{ width: 300 }}
            title={
              <Space
                style={{
                  width: "100%",
                  fontSize: 16,
                  justifyContent: "center",
                }}
              >
                <LockFilled />
                Sign in
              </Space>
            }
          >
            {isError && (
              <Alert
                style={{ margin: "12px" }}
                type="error"
                message={error.message}
              />
            )}
            <Form
              initialValues={{ remember: true }}
              onFinish={(values) => {
                mutate({ email: values.email, password: values.password });
              }}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  {
                    type: "email",
                    message: "Please enter valid email",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>

              <Flex style={{ justifyContent: "space-between" }}>
                <Form.Item name="remember" valuePropName="checked" label={null}>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="" style={{ paddingTop: "5px" }}>
                  Forgot password
                </a>
              </Flex>

              <Form.Item label={null}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  loading={isPending}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </Layout>
    </>
  );
};

export default LoginPage;
