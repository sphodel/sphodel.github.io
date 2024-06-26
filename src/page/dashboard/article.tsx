import { ApolloQueryResult, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { client } from "../../client.tsx";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
const QUERY_ARTICLE = gql(`query queryArticleContent {
  posts(where: {tag: {_eq: "文章"}}) {
    title
    user {
      avatar
    }
    created_at
    tag
    id
  }
}
`);
interface User {
  avatar: string;
}

interface Post {
  id:number;
  title: string;
  tag: string;
  created_at: string;
  user: User;
}

interface QueryContentData {
  posts: Post[];
}
const Article = () => {
  const [contents, setContents] = useState([]);
  const formatRelativeTime = (timestamp: string): string => {
    return formatDistanceToNow(new Date(timestamp), {
      addSuffix: true,
      locale: zhCN,
    });
  };
  useEffect(() => {
    const getContent = async () => {
      const res: ApolloQueryResult<QueryContentData> = await client.query({
        query: QUERY_ARTICLE,
      });
      return res.data.posts;
    };
    const fetchData = async () => {
      const data = await getContent();
      if(data){
        setContents(data);
      }

    };
    void fetchData();
  }, [contents]);
  return (
    <div className="p-3">
      {contents.map((content:Post, index) => (
        <a
          className="flex items-center justify-between p-2 border-b border-gray-200"
          href={`doc/${content.id}`}
          key={index}
        >
          <div className="flex items-center">
            <img
              src={content.user.avatar}
              alt="User avatar"
              className="h-8 w-8"
            />
            <div className="ml-4">
              <span className="bg-gray-200 text-gray-600 text-xs rounded px-2 py-1">
                {content.tag}
              </span>
              <span className="text-gray-800 text-sm ml-2">
                {content.title}
              </span>
            </div>
          </div>
          <span className="text-xs text-gray-600">
            {formatRelativeTime(content.created_at)}
          </span>
        </a>
      ))}
    </div>
  );
};
export default Article;
