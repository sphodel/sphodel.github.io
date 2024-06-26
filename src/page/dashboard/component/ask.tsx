import question from "../../../assets/question.svg";
import develop from "../asserts/develop.svg";
import operation from "../asserts/operation.svg";
import discussion from "../asserts/discussion.svg";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
const Ask = () => {
  const [isDevelopVisible, setIsDevelopVisible] = useState(false);
  const [isOperationVisible,setIsOperationVisible]=useState(false)

  const handleDevelopClick = () => {
    setIsDevelopVisible(!isDevelopVisible);
  };
  const handleOperationClick=()=>{
    setIsOperationVisible(!isOperationVisible)
  }
  const navigate=useNavigate()
  const handleNavigate=(questionCategory:number)=>{
    navigate(`/blog/create/1?questionCategory=${questionCategory}`)
  }
  return (
    <div className={"bg-[#F7F7F7]"}>
      <div className={"pt-11 m-auto pb-8"} style={{ maxWidth: "1140px" }}>
        <div className={"flex mb-5"}>
          <img src={question} alt={""} width={32} height={32} />
          <span className={"text-2xl  pl-2"}>提出问题</span>
        </div>
        <div
          className={
            "mt-20 mb-12 m-auto flex justify-center text-3xl tracking-wider"
          }
        >
          你遇到了什么问题？
        </div>
        <div className={"flex gap-8 justify-center overflow-hidden"}>
          <div className={"relative"}>
            <button
              style={{ width: "276px", height: "395px" }}
              className={
                " bg-white mr-2 px-4 flex items-center flex-col justify-center"
              }
              onClick={handleDevelopClick}
            >
              <img src={develop} alt={""} className={"mb-9"} />
              <span className={"text-xl"}>开发相关问题</span>
            </button>
            <div
              style={{ width: "276px", height: "395px" }}
              className={`bg-white mr-2 px-4 flex flex-col  absolute bottom-0 transition-transform duration-500 ${isDevelopVisible ? "translate-y-0" : "translate-y-full"}`}
            >
              <CloseOutlined
                className={"absolute right-6 top-6"}
                onClick={handleDevelopClick}
              />
              <span
                className={
                  "mt-14 flex justify-center mb-12 text-[#B2B2B2] font-extralight"
                }
              >
                开发相关问题
              </span>
              <button

                className={
                  "h-14  hover:bg-[#FAFAFA] flex items-center justify-center"
                }
                onClick={()=>{
                  handleNavigate(1)
                }}
              >
                API或组件调用问题
              </button>
              <button
                className={
                  "h-14  hover:bg-[#FAFAFA] flex items-center justify-center"
                }
                onClick={()=>{
                  handleNavigate(2)
                }}
              >
                工具使用问题
              </button>
              <button
                className={
                  "h-14  hover:bg-[#FAFAFA] flex items-center justify-center"
                }
                onClick={()=>{
                  handleNavigate(3)
                }}
              >
                其他开发相关问题
              </button>
            </div>
          </div>
          <div className={"relative"}>
            <button
                style={{width: "276px", height: "395px"}}
                className={
                  " bg-white mr-2 px-4 flex items-center flex-col justify-center"
                }
                onClick={handleOperationClick}
            >
              <img src={operation} alt={""} className={"mb-9"}/>
              <span className={"text-xl"}>运营相关问题</span>
            </button>
            <div
                style={{width: "276px", height: "395px"}}
                className={`bg-white mr-2 px-4 flex flex-col  absolute bottom-0 transition-transform duration-500 ${isOperationVisible ? "translate-y-0" : "translate-y-full"}`}
            >
              <CloseOutlined className={"absolute right-6 top-6"} onClick={handleOperationClick}/>
              <span className={"mt-14 flex justify-center mb-12 text-[#B2B2B2] font-extralight"}>运营相关问题</span>
              <button
                  className={"h-14  hover:bg-[#FAFAFA] flex items-center justify-center"} onClick={()=>{
                    handleNavigate(4)
              }}>审核或发布相关问题</button>
              <button className={"h-14  hover:bg-[#FAFAFA] flex items-center justify-center"} onClick={()=>{
                handleNavigate(5)
              }}>其他运营相关问题</button>
            </div>
          </div>
          <button
              style={{width: "276px", height: "395px"}}
              className={
                "bg-white px-4 flex items-center flex-col justify-center"
              }
              onClick={()=>{
                handleNavigate(6)
              }}
          >
            <img src={discussion} alt={""} className={"mb-9"}/>
            <span className={"text-xl"}>开放讨论问题</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Ask;
