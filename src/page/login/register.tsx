import { Button, Input, message } from "antd";
import { useState } from "react";
import {ApolloQueryResult, gql} from "@apollo/client";
import { client } from "../../client.tsx";
import { v4 as uuidv4 } from 'uuid';
import {useNavigate} from "react-router-dom";
const NEWACCOUNT = gql`
  mutation newAccount($account: String = "", $id: String = "", $name: String = "", $password: String = "") {
  insert_users_one(object: {account: $account, id: $id, name: $name, password: $password}) {
    id
  }
}
`;
const QUERY_IF_USER_NAME_EXIST=gql(`query user_exist($name: String!) {
  users(where: {name: {_eq: $name}}) {
    id
  }
}`)
const QUERY_IF_USER_ACCOUNT_EXIST=gql(`query user_exists($account: String!) {
  users(where: {account: {_eq: $account}}) {
    id
  }
}
`)
interface QueryIfUserExistResponse {
  users: string[];
}
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const navigate=useNavigate()
  const handleRegister = async () => {
    await client.query({
      query:QUERY_IF_USER_NAME_EXIST,
      variables:{name:name}
    }).then(async (res:ApolloQueryResult<QueryIfUserExistResponse>)=>{
      const resId=await client.query<QueryIfUserExistResponse>({
        query:QUERY_IF_USER_ACCOUNT_EXIST,
        variables:{
          account:email
        }
      })
      if(resId.data.users.length){
        void messageApi.open({
          type: 'error',
          content: '该账号已存在',
        });
        return;
      }
      if(res.data.users.length){
        void messageApi.open({
             type: 'error',
             content: '该昵称已存在',
           });
        return;
      }

      const id=uuidv4()
      await client.mutate({
        mutation:NEWACCOUNT,
        variables:{
          account:email,
          password:password,
          id:id,
          name:name
        }
      }).then(()=>{
        void messageApi.open({
          type: 'success',
          content: '注册成功',
        });
      })
      setTimeout(()=>{
        navigate('/login')
      },1000)

    })

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
          className={"text-4xl pt-9 pb-6 text-[#7E7E7E]"}
        >
          注册
        </h2>
        <div className={"py-9"}>
          <Input
            placeholder={"请输入姓名"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="邮箱"
            className={"my-6"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input.Password
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          type="primary"
          className={"h-14 text-2xl font-light"}
          block
          onClick={async ()=>{
            await handleRegister()
          }}
        >
          注册
        </Button>
        <div className={"pt-8"}>
          <div className={"flex justify-between"}>
            <div>
              已有账号?
              <a href="login" className={"text-[#387AFF]"}>
                返回登录
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
