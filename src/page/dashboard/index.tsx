import Sidebar from "./component/sidebar.tsx";
import Content from "./component/content.tsx";
import Admin from "./component/admin.tsx";

const Dashboard = () => {
  return (
    <div className={"h-screen bg-[#E1E1E1]"}>
      <div className={"pt-4 w-11/12 m-auto"}>
        <div className={"float-right w-72"}>
          <Sidebar/>
        </div>
          <Admin/>
        <Content/>
      </div>
    </div>
  );
};
export default Dashboard;
