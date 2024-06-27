import "../App.css";
import { useState } from "react";
import logo from "../assets/logo.png";
import {Link, useNavigate} from "react-router-dom";
const Navbar = () => {
  const [text, setText] = useState("");
  const navigate=useNavigate()
  const id=localStorage.getItem('id')
  if(id==null){
    navigate("login")
  }
  return (
    <div className={"h-12 bg-[#444] flex justify-between items-center"}>
      <div className={"flex gap-10 pl-16"}>
        <img src={logo} alt={""} width={28} height={28} className={"cursor-pointer"} onClick={()=>{
          navigate("/")
        }}/>
        <label className="relative block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-2xl py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm h-6 w-60"
            placeholder="Search for anything..."
            type="text"
            name="search"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
      </div>
      <div className={"flex pr-32 gap-5 text-[#ccc] text-sm"}>
        <Link to="/">首页</Link>
        <Link to="/resources">资源</Link>
        <Link to="/personal">账号中心</Link>
        <Link to="/login">退出</Link>
      </div>
    </div>
  );
};
export default Navbar;
