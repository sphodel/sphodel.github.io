import {ApolloQueryResult, gql} from "@apollo/client";
import { useEffect, useState } from "react";
import { client } from "../../client.tsx";
import {Link} from "react-router-dom";

const QUERY_MY_ARTICLES = gql(`query queryMyArticles($user_id: String!) {
  posts(where: {user_id: {_eq: $user_id}, tag: {_eq: "文章"}}) {
    title
    id
  }
}
`);
interface titleType{
    id:number,
    title:string
}
const MyArticle = () => {
  const [titles, setTitles] = useState([]);
  useEffect(() => {
    const id = localStorage.getItem("id");

    const fetchData = async () => {
      await client
        .query({
          query: QUERY_MY_ARTICLES,
          variables: { user_id: id },
        })
        .then((res:ApolloQueryResult<{ posts:titleType[]}>) => {
          setTitles(res.data.posts);
        });
    };
    void fetchData();
  });
  return <div>
      {titles.map((title:titleType,i)=>(
          <Link key={i} className={"p-2 flex flex-col hover:bg-[#F6F6F6]"} to={`/dashboard/doc/${title.id}`}>{title.title}</Link>
      ))}
  </div>;
};
export default MyArticle;
