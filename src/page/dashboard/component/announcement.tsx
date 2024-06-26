import { useParams } from "react-router-dom";
import { ApolloQueryResult, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { client } from "../../../client.tsx";
const QUERY_ANNC_CONTENT = gql(`query queryAnncContent($id: Int!) {
  annc(where: {id: {_eq: $id}}) {
    content
    title
  }
}
`);
interface dataType {
  content: string;
  title: string;
}
const Announcement = () => {
  const { id } = useParams<{ id: number }>();
  const [content, setContent] = useState<dataType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res: ApolloQueryResult<{ annc: dataType[] }> = await client.query({
        query: QUERY_ANNC_CONTENT,
        variables: { id: 1 },
      });
      setContent(res.data.annc);
    };
    void fetchData();
  }, [id]);
  return (
    <div className={"bg-[#E1E1E1] overflow-hidden h-screen"}>
      <div className={"pt-4 w-11/12 m-auto flex items-center flex-col"}>
        {content.length && (
          <div className={"flex flex-col items-center"}>
            <h1 className={"text-2xl"}>{content[0].title}</h1>
              <div className={"pt-12"}>
                  <div
                      dangerouslySetInnerHTML={{__html: content[0].content}}
                  />
              </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Announcement;
