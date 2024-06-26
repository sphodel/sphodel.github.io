import { Outlet, useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import {ApolloQueryResult, gql} from "@apollo/client";
import {useEffect, useState} from "react";
import {client} from "../../client.tsx";
const QUERY_USER_INFO=gql(`query queryUserInfos($id: String!) {
  users(where: {id: {_eq: $id}}) {
    name
    Profile
    avatar
  }
}
`)
interface InfoType{
  name:string,
  Profile:string
  avatar:string
}
const Information = () => {
  const navigate = useNavigate();
  const id=localStorage.getItem('id')
  const [userInfo,setUserInfo]=useState<InfoType[]>([])
  useEffect(()=>{
    const fetchData=async ()=>{
      const res:ApolloQueryResult<{ users:InfoType[] }>=await client.query({
        query:QUERY_USER_INFO,
        variables:{id:id}
      })
      setUserInfo(res.data.users)
    }
    void fetchData()
  })
  return (
    <div className={"bg-[#F7F7F7] h-screen"}>
      <div className={"pt-11 m-auto pb-8"} style={{ maxWidth: "1140px" }}>
        {userInfo.length&&
          <div className={"h-40 bg-white flex items-center mb-6"}>
            <img
              src={userInfo[0].avatar||avatar}
              alt={""}
              className={"px-6 "}
              width={120}
              height={120}
            />
            <div className={"flex flex-col gap-2"}>
              <span className={"text-xl"}>{userInfo[0].name}</span>
              <span>{userInfo[0].Profile}</span>
              <button
                className={
                  "mr-2 bg-[#F7F7F7] rounded px-5 py-2 w-24 text-sm hover:bg-[#E7E7E7]"
                }
                onClick={() => {
                  navigate("edit");
                }}
              >
                查看资料
              </button>
            </div>
          </div>
        }
        <div className={"bg-white p-5 h-96"}>
          <button
            className={"text-[#07c160] bg-[#F0FBF6] px-4 py-1 text-sm mr-4"}
            onClick={() => {
              navigate("article");
            }}
          >
            文章 0
          </button>
          <button
            className={"text-[#07c160] bg-[#F0FBF6] px-4 py-1 text-sm"}
            onClick={() => {
              navigate("question");
            }}
          >
            提问 0
          </button>
          <div className={"pt-6"}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Information;
