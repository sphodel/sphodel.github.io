import avatar from "../../../assets/avatar.png";
import reactLogo from "../../../assets/react.jpg";
import vueLogo from "../../../assets/vueLogo.png";
import node from "../../../assets/Node.js.png";
import question from "../../../assets/question.svg";
import article from "../../../assets/article.svg";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {ApolloQueryResult, gql} from "@apollo/client";
import { client } from "../../../client.tsx";
const NO_REPLIES=gql(`query noQuery {
  posts {
    title
    id
    replies {
      id
    }
  }
}
`)
const user_info = gql(`query userInfo($id: String!) {
  users(where: {id: {_eq: $id}}) {
    avatar
    Profile
    name
  }
}
`);
interface FilterType{
  title:string
  id:number,
  replies:number[]
}
interface FilterType1{
  title:string
  id:number
}
interface FilterType2{
  post:FilterType1[]
}
interface User {
  avatar: string;
  Profile: string;
  name: string;
}
interface Post{
  title:string
  id:number
  replies:Replies

}
interface Replies{
  id:number
}
const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User[] | null>(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state as string;
  if(id!=undefined){
    localStorage.setItem("id", id);
  }
  const myId = localStorage.getItem("id");
  useEffect(() => {
    const fetchNOQuery=async ()=>{
      const res:ApolloQueryResult<{posts:Post}>=await client.query({
        query:NO_REPLIES,
      })
      const resData:FilterType1=res.data.posts.filter((post:FilterType) => post.replies.length === 0);
      setFilteredPosts(resData);
    }
    const fetchUserInfo = async (id: string): Promise<User[] | null> => {
      const res:ApolloQueryResult<{ users: User[] }> = await client.query({
        query: user_info,
        variables: { id: id },
      });
      return res.data.users;
    };

    const fetchAndSetUser = async (myId:string) => {
      const userInfo = await fetchUserInfo(myId);
      setUser(userInfo)
    };
    void fetchNOQuery()
    void fetchAndSetUser(myId);
  }, [myId]);

  return (
    <div className={"flex flex-col"}>
      <div className={"mb-4 bg-white text-sm rounded"}>
        <div className={"p-2 bg-[#f6f6f6]"}>
          <span className={"text-xs"}>个人信息</span>
        </div>
        <button
          className={"p-2 flex flex-col"}
          onClick={() => {
            navigate("/personal");
          }}
        >
          <div className={"flex items-center gap-4"}>
            <img
              src={user&&(user[0].avatar?user[0].avatar:avatar)}
              alt={""}
              width={48}
              height={48}
            />
            <span>{user&&user[0].name}</span>
          </div>
          <span className={"pt-3 pb-2"}>积分:0</span>
          {user && (
              <span>{user[0].Profile || '这个人很懒，没有留下简介'}</span>
          )}
        </button>
      </div>
      <div className={"mb-4 bg-white p-3 rounded"}>
        <button
          className={
            "bg-[#80bd01] p-2 text-white rounded text-sm tracking-widest"
          }
          onClick={showModal}
        >
          发布话题
        </button>
      </div>
      <Modal
        footer={null}
        open={isModalOpen}
        title={
          <div className={"flex justify-center font-medium text-lg"}>
            选择发帖类型
          </div>
        }
        onCancel={handleCancel}
      >
        <Link to={"/ask"}>
          <div className={"flex p-4 hover:bg-[#FAFAFA]"}>
            <img src={question} alt={""} className={"mr-4"} />
            <div className={"flex flex-col"}>
              <span className={"pt-2"}>提出问题</span>
              <span className={"text-[#D8D8D8] text-sm"}>
                接入使用过程中遇到的疑问
              </span>
            </div>
          </div>
        </Link>
        <Link to={"/blog"}>
          <div className={"flex p-4 hover:bg-[#FAFAFA]"}>
            <img src={article} alt={""} className={"mr-4"} />
            <div className={"flex flex-col"}>
              <span className={"pt-2"}>发表文章</span>
              <span className={"text-[#D8D8D8] text-sm"}>
                开发、运营、产品设计相关实战经验及案例分享
              </span>
            </div>
          </div>
        </Link>
      </Modal>
      <div className={"bg-white mb-4 rounded"}>
        <div className={"p-2 bg-[#f6f6f6] text-xs"}>无人回复的话题</div>
        <div className={"pl-2 text-sm gap-2 flex flex-col py-1"}>{filteredPosts.map((filteredPost:FilterType,i)=>(
            <Link key={i} to={`doc/${filteredPost.id}`}>{filteredPost.title}</Link>
        ))}</div>
      </div>
      <div className={"bg-white"}>
        <div className={"p-2 bg-[#f6f6f6] text-xs"}>外部链接</div>
        <div className={"pl-2 text-sm gap-2 flex flex-col justify-center"}>
          <a href={"https://react.dev/"}>
            <img src={reactLogo} alt={""} className={"h-20"} />
          </a>
          <a href={"https://vuejs.org/"}>
            <img src={vueLogo} alt={""} className={"h-16 pl-1"} />
          </a>
          <a href={"https://nodejs.org/zh-cn"}>
            <img src={node} alt={""} className={"h-16"} />
          </a>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
