import { useNavigate, useSearchParams } from "react-router-dom";
import question from "../../../assets/question.svg";
import { LeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import {Input, message} from "antd";
import DraftEditor from "../../../component/Editor/DraftEditor.jsx";
import React, {useState} from "react";
import {gql} from "@apollo/client";
import {client} from "../../../client.tsx";
const INSERT_QUESTION=gql(`mutation InsertQuestion($user_id: String = "", $title: String = "", $summary: String = "", $content: String = "") {
  insert_posts_one(object: {user_id: $user_id, title: $title, summary: $summary, content: $content}) {
    id
  }
}
`)
const Create = () => {
  interface contentType {
    title: string;
  }
  const [searchParams] = useSearchParams();
  const [editorContent, setEditorContent] = useState("");
  const [title,setTitle]=useState("")
  const [summary,setSummary]=useState("")
  const questionCategory = searchParams.get("questionCategory");
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const id=localStorage.getItem('id')
  const handleInsert=async ()=>{
    if(title==""){
      void messageApi.open({
        type: 'error',
        content: '未填写标题',
      });
      return;
    }
    if(summary==""){
      void messageApi.open({
        type: 'error',
        content: '未填写简介',
      });
      return;
    }
    if(editorContent==""){
      void messageApi.open({
        type: 'error',
        content: '内容不能为空',
      });
      return;
    }
    await client.mutate({
      mutation:INSERT_QUESTION,
      variables:{
        user_id:id,
        title:title,
        summary:summary,
        content:editorContent,
        tag:"问答"
      }
    })
    void messageApi.open({
      type: 'success',
      content: '发布成功',
    });
    setTimeout(()=>{
      navigate("/")
    },1000)

  }
  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };
  let content: contentType = {
    title: "",
  };
  switch (questionCategory) {
    case "1":
      content = {
        title: "提出一个 API 与组件相关的问题",
      };
      break;
    case "2":
      content = {
        title: "请输入开发者工具相关的问题标题",
      };
      break;
    case "3":
      content = {
        title: "提出一个其他开发相关的问题",
      };
      break;
    case "4":
      content = {
        title: "提出一个提交与审核相关的问题",
      };
      break;
    case "5":
      content = {
        title: "提出一个其他运营相关的问题",
      };
      break;
    case "6":
      content = {
        title: "提出一个开放讨论的问题",
      };
      break;
  }

  return (
    <div className={"bg-[#F7F7F7]"}>
      <div className={"pt-11 m-auto pb-8"} style={{ maxWidth: "1140px" }}>
        {contextHolder}
        <div className={"flex mb-5"}>
          <img src={question} alt={""} width={32} height={32} />
          <span className={"text-2xl  pl-2"}>提出问题</span>
        </div>
        <div className={"flex text-[#BABABA] pb-5"}>
          <LeftOutlined />
          <span
            className={"pl-1 cursor-pointer"}
            onClick={() => {
              navigate(-1);
            }}
          >
            返回问题类型
          </span>
        </div>
        <div className={"pl-5 py-5 bg-white mb-6"}>
          <div
            className={
              "flex pb-6 mb-5 border border-transparent border-b-[#F7F7F7]"
            }
          >
            <div className={"flex w-28 items-center"}>
              <span className={"pr-2"}>问题标题</span>
              <QuestionCircleOutlined className={"text-sm"} />
            </div>
            <Input
              showCount
              placeholder={content.title}
              maxLength={60}
              size={"small"}
              style={{ height: "30px", border: 0 }}
              onChange={(e)=>setTitle(e.target.value)}
            />
          </div>
          <div className={"flex"}>
            <div className={"flex w-28 items-center"}>
              <span className={"pr-2"}>代码片段</span>
              <QuestionCircleOutlined className={"text-sm"} />
            </div>
            <Input
              showCount
              placeholder={"提供能复现问题的简单代码片段描述"}
              maxLength={60}
              size={"small"}
              style={{ height: "30px", border: 0 }}
              onChange={(e)=>setSummary(e.target.value)}
            />
          </div>
        </div>
        <div className={"m-auto"}>
          <DraftEditor onEditorChange={handleEditorChange} />
        </div>
        <div className={"pt-6 flex justify-end"}>
          <button
            className={"bg-[#07C160] rounded px-5 py-2 w-24 text-sm text-white"}
            onClick={async ()=>{await handleInsert()}}
          >
            发表
          </button>
        </div>
      </div>
    </div>
  );
};
export default Create;
