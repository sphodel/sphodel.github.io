import { Outlet, useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar.png";

const Information = () => {
  const navigate = useNavigate();
  return (
    <div className={"bg-[#F7F7F7] h-screen"}>
      <div className={"pt-11 m-auto pb-8"} style={{ maxWidth: "1140px" }}>
        <div className={"h-40 bg-white flex items-center mb-6"}>
          <img
            src={avatar}
            alt={""}
            className={"px-6 "}
            width={120}
            height={120}
          />
          <div className={"flex flex-col gap-2"}>
            <span className={"text-xl"}>qym</span>
            <span>简介</span>
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
