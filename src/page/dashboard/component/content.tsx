import {Link, Outlet} from "react-router-dom";

const Content = () => {
    return (
        <div className="bg-white mr-80 rounded">
            <div className="bg-[#f6f6f6] px-3 py-2 rounded">
                <Link className="text-[#80bd01] p-1 mr-4" to="/dashboard/allContent">全部</Link>
                <Link className="text-[#80bd01] p-1 mr-4" to="/dashboard/article">文章</Link>
                <Link className="text-[#80bd01] p-1" to="/dashboard/questions">问答</Link>
            </div>
            <Outlet />
        </div>
    );
};

export default Content;
