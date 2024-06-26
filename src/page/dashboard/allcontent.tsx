import { ApolloQueryResult, gql } from "@apollo/client";
import { client } from "../../client.tsx";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
const QUERY_CONTENT = gql(`query queryAllContent {
  posts {
    id
    title
    tag
    user {
      avatar
    }
    created_at
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

const AllContent = () => {
  const [contents, setContents] = useState([]);
  const formatRelativeTime = (timestamp: string): string => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
    return formatDistanceToNow(new Date(timestamp), {
      addSuffix: true,
      locale: zhCN,
    });
  };
  useEffect(() => {
    const getContent = async () => {
      const res: ApolloQueryResult<QueryContentData> = await client.query({
        query: QUERY_CONTENT,
      });
      return res.data.posts;
    };
    const fetchData = async () => {
      const data = await getContent();
      setContents(data);
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
export default AllContent;
