import { Input, Button, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApolloQueryResult, gql } from "@apollo/client";
import { client } from "../../client.tsx";
const LoginAuth = gql(`query MyQuery($account: String!, $password: String!) {
  users(where: {account: {_eq: $account}, password: {_eq: $password}}) {
    id
  }
}
`);
interface idType{
    id:string
}
interface userIdType {
  users: idType[];
}
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleLogin = async () => {
    await client
      .query({
        query: LoginAuth,
        variables: {
          account: email,
          password: password,
        },
      })
      .then((res: ApolloQueryResult<userIdType>) => {
        if (res.data.users.length) {
          const data = { email: email, password: password };
          localStorage.setItem("account", JSON.stringify(data));
          void messageApi.open({
            type: "success",
            content: "登录成功",
          });
          navigate("/dashboard/allContent",{state:res.data.users[0].id});
          return;
        }
        void messageApi.open({
          type: "error",
          content: "账号不存在",
        });
        return;
      });
  };
  return (
    <div
      className={`h-screen w-screen flex items-center justify-center bg-[#F9FAFB]`}
    >
      {contextHolder}
      <div
        style={{ width: "565px", height: "488px" }}
        className={`flex flex-col px-16 bg-white`}
      >
        <h2
          style={{ textAlign: "center" }}
          className={"text-4xl py-12 text-[#7E7E7E]"}
        >
          登录
        </h2>
        <Input
          placeholder="邮箱"
          className={"mb-6"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input.Password
          className={"mb-6"}
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="primary"
          htmlType="submit"
          className={"h-14 text-2xl font-light"}
          block
          onClick={async () => {
            await handleLogin();
          }}
        >
          登录
        </Button>
        <div className={"pt-8"}>
          <div className={"flex justify-between"}>
            <div>
              未有账号?
              <a href="register" className={"text-[#387AFF]"}>
                立即注册
              </a>
            </div>
            <a href="#">登录遇到问题？</a>
          </div>
          <div style={{ marginTop: 20 }} className={"flex justify-center"}>
            登陆即代表同意《<a href="#">服务协议</a>》及《
            <a href="#">用户隐私条款</a>》
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
