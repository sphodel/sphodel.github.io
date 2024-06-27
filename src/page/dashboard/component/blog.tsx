import article from "../../../assets/article.svg";
import { Input, message } from "antd";
import { useState } from "react";
import DraftEditor from "../../../component/Editor/DraftEditor.jsx";
import { gql } from "@apollo/client";
import { client } from "../../../client.tsx";
import { useNavigate } from "react-router-dom";
const INSERT_POST =
  gql(`mutation InsertPost($content: String = "", $classify: String = "", $summary: String = "", $tag: String = "", $title: String = "", $user_id: String = "") {
  insert_posts_one(object: {content: $content, classify: $classify, summary: $summary, tag: $tag, title: $title, user_id: $user_id}) {
    id
  }
}
`);
const INSERT_ANNC =
  gql(`mutation insertAnnc($user_id: String = "", $title: String = "", $content: String = "") {
  insert_annc_one(object: {user_id: $user_id, title: $title, content: $content}) {
    id
  }
}`);
const Blog = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [classify, setClassify] = useState("");
  const { TextArea } = Input;
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const categories = ["技术", "产品", "运营", "其他"];
  const [editorContent, setEditorContent] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };
  const handleClick = (index: number, category: string) => {
    setSelectedCategory(index);
    setClassify(category);
  };
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  const handleInsert = async () => {
    if (title == "") {
      void messageApi.open({
        type: "error",
        content: "未填写标题",
      });
      return;
    }
    if (editorContent == "") {
      void messageApi.open({
        type: "error",
        content: "内容不能为空",
      });
      return;
    }
    if(id=="1"){
      await client.mutate({
        mutation:INSERT_ANNC,
        variables:{user_id:id,content:editorContent,title:title}
      })
      void messageApi.open({
        type: "success",
        content: "发布成功",
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
      return;
    }
    if (summary == "") {
      void messageApi.open({
        type: "error",
        content: "未填写简介",
      });
      return;
    }
    if (classify == "") {
      void messageApi.open({
        type: "error",
        content: "未选择类型",
      });
      return;
    }

    await client.mutate({
      mutation: INSERT_POST,
      variables: {
        content: editorContent,
        classify: classify,
        summary: summary,
        title: title,
        user_id: id,
        tag: "文章",
      },
    });
    void messageApi.open({
      type: "success",
      content: "发布成功",
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <div className={"bg-[#F7F7F7]"}>
      <div className={"pt-11 m-auto pb-8"} style={{ maxWidth: "1140px" }}>
        {contextHolder}
        <div className={"flex mb-6"}>
          <img src={article} alt={""} width={32} height={32} />
          <span className={"text-2xl  pl-2"}>发表文章</span>
        </div>
        <div className={"bg-white p-5 mb-3"}>
          <div className={"flex items-center"}>
            <span className={"w-20"}>文章标题</span>
            <Input
              showCount
              maxLength={60}
              onChange={(e) => setTitle(e.target.value)}
              size={"small"}
              style={{ height: "30px", border: 0 }}
            />
          </div>
        </div>
        <div>
          <DraftEditor onEditorChange={handleEditorChange} />
        </div>
        <div className={"mt-8 p-5 h-48 bg-white"}>
          <div
            className={
              "h-24 flex border border-transparent border-b-[#F7F7F7] pb-5"
            }
          >
            <span className={"w-20"}>文章简介</span>
            <TextArea
              showCount
              maxLength={100}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="请输入文章简介"
              style={{ resize: "none", border: 0 }}
            />
          </div>
          <div className={"py-4 border border-transparent border-b-[#F7F7F7]"}>
            <span className={"w-20 mr-4"}>文章分类</span>
            {categories.map((category, index) => (
              <button
                key={index}
                className={`py-2 px-3 text-xs mr-4 bg-[#f6f6f6] text-[#ccc] rounded hover:bg-[#E7E7E7] cursor-pointer ${selectedCategory === index ? "bg-green-100 text-green-600" : ""}`}
                onClick={() => handleClick(index, category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className={"pt-8 flex justify-end"}>
          <button className={"mr-2 bg-white rounded px-5 py-1 w-24 text-sm"}>
            保存草稿
          </button>
          <button
            className={"bg-[#07C160] rounded px-5 py-2 w-24 text-sm text-white"}
            onClick={async () => await handleInsert()}
          >
            发表
          </button>
        </div>
      </div>
    </div>
  );
};
export default Blog;
