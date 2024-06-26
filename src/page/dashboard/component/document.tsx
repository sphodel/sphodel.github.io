import { useNavigate, useParams } from "react-router-dom";
import { Input, message } from "antd";
import { ApolloQueryResult, gql } from "@apollo/client";
import  { useEffect, useState } from "react";
import { client } from "../../../client.tsx";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
const QUERY_DOCUMENT = gql(`query queryDocument($id: Int!) {
  posts(where: {id: {_eq: $id}}) {
    title
    summary
    created_at
    content
    user {
      name
      avatar
      Profile
    }
  }
}`);
const INSERT_REPLY =
    gql(`mutation insertReply($content: String = "", $post_id: Int = 10, $user_id: String = "") {
  insert_replies_one(object: {content: $content, post_id: $post_id, user_id: $user_id}) {
    id
  }
}`);
const QUERY_REPLY = gql(`query queryReply($post_id: Int!) {
  replies(where: {post_id: {_eq: $post_id}}) {
    content
    created_at
    user {
      avatar
      name
    }
  }
}
`);
interface User {
  avatar: string;
  name: string;
  Profile: string;
}

interface Post {
  title: string;
  summary: string;
  created_at: string;
  content: string;
  user: User;
}

interface QueryContentData {
  posts: Post[];
}
const Document = () => {
  const { id } = useParams<{ id: number }>();

  const [contents, setContents] = useState<Post[]>([]);
  const [replies, setReplies] = useState([]);
  useEffect(() => {
    const getContent = async () => {
      const res: ApolloQueryResult<QueryContentData> = await client.query({
        query: QUERY_DOCUMENT,
        variables: { id: id },
      });
      return res.data.posts;
    };
    const getReply = async () => {
      const res = await client.query({
        query: QUERY_REPLY,
        variables: { post_id: id },
      });
      setReplies(res.data.replies);
    };
    const fetchData = async () => {
      const data = await getContent();
      setContents(data);
    };
    void getReply();
    void fetchData();
  }, [contents, id]);
  const navigate = useNavigate();
  const { TextArea } = Input;
  const [replyContent, setReplyContent] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const formatRelativeTime = (timestamp: string): string => {
    return formatDistanceToNow(new Date(timestamp), {
      addSuffix: true,
      locale: zhCN,
    });
  };
  const myId = localStorage.getItem("id");
  const handleInsertReply = async () => {
    await client.mutate({
      mutation: INSERT_REPLY,
      variables: { content: replyContent, post_id: id, user_id: myId },
    });
    void messageApi.open({
      type: "success",
      content: "回复成功",
    });
  };
  return (
      <div className={"bg-[#E1E1E1] overflow-hidden h-screen"}>
        {contextHolder}
        {contents.length&& (
            <div>
              <div className={"pt-4 w-11/12 m-auto"}>
                <div className={"float-right w-72 flex flex-col"}>
                  <div className={"mb-4 bg-white text-sm rounded"}>
                    <div className={"p-2 bg-[#F6F6F6]"}>
                      <span className={"text-xs"}>作者</span>
                    </div>
                    <button
                        className={"p-2 flex flex-col"}
                        onClick={() => {
                          navigate("/personal");
                        }}
                    >
                      <div className={"flex items-center gap-4"}>
                        <img
                            src={contents[0].user.avatar}
                            alt={""}
                            width={48}
                            height={48}
                        />
                        <span>{contents[0].user.name}</span>
                      </div>
                      <span className={"pt-3 pb-2"}>积分:0</span>
                      <span>{contents[0].user.Profile}</span>
                    </button>
                  </div>
                  <div className={"bg-white mb-4 rounded"}>
                    <div className={"p-2 bg-[#f6f6f6] text-xs"}>作者其他话题</div>
                    <div className={"pl-2 text-sm gap-2"}>1</div>
                  </div>
                </div>
                <div className={"bg-white mr-80 rounded p-2 flex flex-col pl-3"}>
                  <div className={"border border-transparent border-b-[#f6f6f6]"}>
                <span className={"text-2xl font-bold my-2 pb-4"}>
                  {contents[0].title}
                </span>
                    <br />
                    <span className={"text-[#00000080] text-sm"}>
                  {contents[0].summary}
                </span>
                    <div className={"flex text-xs text-[#838383] gap-4 pb-3"}>
                      <span>{formatRelativeTime(contents[0].created_at)}</span>
                      <span>作者 {contents[0].user.name}</span>
                    </div>
                  </div>
                  <div className={"p-2"}>
                    <div
                        dangerouslySetInnerHTML={{ __html: contents[0].content }}
                    />
                  </div>
                </div>
                <div className={"mt-3 rounded mr-80"}>
                  <div className={"p-2 bg-[#F6F6F6]"}>
                    <span className={"text-sm"}>3回复</span>
                  </div>
                  <div className={"bg-white p-2"}>
                    {replies.map((reply, index) => (
                        <div className={"mb-4"} key={index}>
                          <a href={"/personal/article"} className={"float-left pl-2"}>
                            <img src={reply.user.avatar} alt={""} width={30} height={30} />
                          </a>
                          <div className={"pl-4 flex justify-between"}>
                            <div className={"flex flex-col pl-4"}>
                              <span className={"text-[#666]"}>{reply.user.name}</span>
                              <span>{reply.content}</span>
                            </div>
                            <span className={"text-sm text-[#666]"}>{formatRelativeTime(reply.created_at)}</span>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
                <div className={"mr-80 rounded pt-3"}>
                  <div className={"p-2 bg-[#F6F6F6]"}>
                    <span className={"text-xs"}>添加回复</span>
                  </div>
                  <div className={"p-2 bg-white "}>
                    <TextArea
                        rootClassName={"border-0"}
                        style={{ resize: "none", height: "100px" }}
                        placeholder="内容"
                        onChange={(e) => setReplyContent(e.target.value)}
                    />
                    <div className={"flex justify-end pt-3"}>
                      <button
                          className={
                            "bg-[#07C160] rounded px-5 py-2 w-24 text-sm text-white"
                          }
                          onClick={async () => await handleInsertReply()}
                      >
                        发表
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};
export default Document;