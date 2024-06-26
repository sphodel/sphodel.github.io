import { ApolloQueryResult, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { client } from "../../../client.tsx";
import { Link } from "react-router-dom";

const QUERY_ANNC = gql(`query queryAnnc {
  annc {
    id
    title
  }
}`);
interface ContentType {
  id: number;
  title: string;
}
const Admin = () => {
  const [contents, setContents] = useState([]);
  useEffect(() => {
    const getContent = async () => {
      const res: ApolloQueryResult<{ annc: ContentType[] }> =
        await client.query({
          query: QUERY_ANNC,
        });
      setContents(res.data.annc);
    };
    void getContent();
  }, []);
  return (
    <div className={"mt-3 rounded mr-80 mb-3"}>
      <div className={"p-2 bg-[#F6F6F6]"}>
        <span className={"font-bold"}>官方公告</span>
      </div>
      <div className={"bg-white p-2 rounded"}>
        {contents.map((content:ContentType, i) => (
          <div className={"flex pl-6 hover:bg-[#F6F6F6] mb-2"} key={i}>
            <Link to={`anc/${content.id}`}>{content.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Admin;
