import { SaveOutlined } from "@ant-design/icons";
import { Form, Input, Button, InputNumber, Typography, Divider } from "antd";
import { useState } from "react";
import { Redirect, useHistory } from "react-router";
import getUserStorage from "../helpers/getUserStorage";
import useHideMenu from "../hook/useHideMenu";

const { Title, Text } = Typography;

const Login = () => {
  useHideMenu(false);
  const history = useHistory();
  const [user] = useState(getUserStorage());
  const onFinish = ({ user, desk }) => {
    localStorage.setItem("user", user);
    localStorage.setItem("desk", desk);
    history.push("/desk");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (user.user && user.desk) {
    return <Redirect to="/desk" />;
  }
  return (
    <>
      <Title level={2}>Login</Title>
      <Text>Please enter your name and desk number</Text>
      <Divider />
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="User"
          name="user"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Desk"
          name="desk"
          rules={[
            {
              required: true,
              message: "Please input you desk number!",
            },
          ]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        ></Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" shape="round" htmlType="submit">
            <SaveOutlined />
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
