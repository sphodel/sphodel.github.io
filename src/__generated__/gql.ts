/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query queryAllContent {\n  posts {\n    id\n    title\n    tag\n    user {\n      avatar\n    }\n    created_at\n  }\n}\n": types.QueryAllContentDocument,
    "query queryArticleContent {\n  posts(where: {tag: {_eq: \"文章\"}}) {\n    title\n    user {\n      avatar\n    }\n    created_at\n    tag\n    id\n  }\n}\n": types.QueryArticleContentDocument,
    "query queryAnnc {\n  annc {\n    id\n    title\n  }\n}": types.QueryAnncDocument,
    "query queryAnncContent($id: Int!) {\n  annc(where: {id: {_eq: $id}}) {\n    content\n    title\n  }\n}\n": types.QueryAnncContentDocument,
    "mutation InsertPost($content: String = \"\", $classify: String = \"\", $summary: String = \"\", $tag: String = \"\", $title: String = \"\", $user_id: String = \"\") {\n  insert_posts_one(object: {content: $content, classify: $classify, summary: $summary, tag: $tag, title: $title, user_id: $user_id}) {\n    id\n  }\n}\n": types.InsertPostDocument,
    "mutation insertAnnc($user_id: String = \"\", $title: String = \"\", $content: String = \"\") {\n  insert_annc_one(object: {user_id: $user_id, title: $title, content: $content}) {\n    id\n  }\n}": types.InsertAnncDocument,
    "mutation InsertQuestion($user_id: String = \"\", $title: String = \"\", $summary: String = \"\", $content: String = \"\") {\n  insert_posts_one(object: {user_id: $user_id, title: $title, summary: $summary, content: $content}) {\n    id\n  }\n}\n": types.InsertQuestionDocument,
    "query queryDocument($id: Int!) {\n  posts(where: {id: {_eq: $id}}) {\n    title\n    summary\n    created_at\n    content\n    user {\n      name\n      avatar\n      Profile\n      id\n    }\n  }\n}": types.QueryDocumentDocument,
    "mutation insertReply($content: String = \"\", $post_id: Int = 10, $user_id: String = \"\") {\n  insert_replies_one(object: {content: $content, post_id: $post_id, user_id: $user_id}) {\n    id\n  }\n}": types.InsertReplyDocument,
    "query queryReply($post_id: Int!) {\n  replies(where: {post_id: {_eq: $post_id}}) {\n    content\n    created_at\n    id\n    user {\n      avatar\n      name\n    }\n  }\n}\n": types.QueryReplyDocument,
    "query queryOther($user_id: String!) {\n  posts(where: {user_id: {_eq: $user_id}}) {\n    title\n    id\n  }\n}": types.QueryOtherDocument,
    "\nmutation deleteArticle($id: Int!) {\n  delete_posts(where: {id: {_eq: $id}}) {\n    returning {\n      id\n    }\n  }\n}\n": types.DeleteArticleDocument,
    "\n  mutation deleteReply($id: Int!) {\n    delete_replies(where: { id: { _eq: $id } }) {\n      returning {\n        id\n      }\n    }\n  }\n": types.DeleteReplyDocument,
    "query noQuery {\n  posts {\n    title\n    id\n    replies {\n      id\n    }\n  }\n}\n": types.NoQueryDocument,
    "query userInfo($id: String!) {\n  users(where: {id: {_eq: $id}}) {\n    avatar\n    Profile\n    name\n  }\n}\n": types.UserInfoDocument,
    "query queryArticle {\n  posts(where: {tag: {_eq: \"问答\"}}) {\n    title\n    user {\n      avatar\n    }\n    created_at\n    tag\n    id\n  }\n}\n": types.QueryArticleDocument,
    "query queryInfo($id: String!) {\n  users(where: {id: {_eq: $id}}) {\n    Profile\n    avatar\n    birthday\n    id\n    name\n    sex\n  }\n}\n": types.QueryInfoDocument,
    "\n  mutation updateUsers(\n    $id: String!\n    $avatar: String!\n    $Profile: String!\n    $sex: String!\n  ) {\n    update_users(\n      where: { id: { _eq: $id } }\n      _set: {\n        avatar: $avatar\n        Profile: $Profile\n        sex: $sex\n      }\n    ) {\n      returning {\n        id\n      }\n    }\n  }\n": types.UpdateUsersDocument,
    "query queryUserInfos($id: String!) {\n  users(where: {id: {_eq: $id}}) {\n    name\n    Profile\n    avatar\n  }\n}\n": types.QueryUserInfosDocument,
    "query queryMyArticles($user_id: String!) {\n  posts(where: {user_id: {_eq: $user_id}, tag: {_eq: \"文章\"}}) {\n    title\n  }\n}\n": types.QueryMyArticlesDocument,
    "query MyQuery($account: String!, $password: String!) {\n  users(where: {account: {_eq: $account}, password: {_eq: $password}}) {\n    id\n  }\n}\n": types.MyQueryDocument,
    "\n  mutation newAccount($account: String = \"\", $id: String = \"\", $name: String = \"\", $password: String = \"\") {\n  insert_users_one(object: {account: $account, id: $id, name: $name, password: $password}) {\n    id\n  }\n}\n": types.NewAccountDocument,
    "query user_exist($name: String!) {\n  users(where: {name: {_eq: $name}}) {\n    id\n  }\n}": types.User_ExistDocument,
    "query user_exists($account: String!) {\n  users(where: {account: {_eq: $account}}) {\n    id\n  }\n}\n": types.User_ExistsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query queryAllContent {\n  posts {\n    id\n    title\n    tag\n    user {\n      avatar\n    }\n    created_at\n  }\n}\n"): (typeof documents)["query queryAllContent {\n  posts {\n    id\n    title\n    tag\n    user {\n      avatar\n    }\n    created_at\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query queryArticleContent {\n  posts(where: {tag: {_eq: \"文章\"}}) {\n    title\n    user {\n      avatar\n    }\n    created_at\n    tag\n    id\n  }\n}\n"): (typeof documents)["query queryArticleContent {\n  posts(where: {tag: {_eq: \"文章\"}}) {\n    title\n    user {\n      avatar\n    }\n    created_at\n    tag\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query queryAnnc {\n  annc {\n    id\n    title\n  }\n}"): (typeof documents)["query queryAnnc {\n  annc {\n    id\n    title\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query queryAnncContent($id: Int!) {\n  annc(where: {id: {_eq: $id}}) {\n    content\n    title\n  }\n}\n"): (typeof documents)["query queryAnncContent($id: Int!) {\n  annc(where: {id: {_eq: $id}}) {\n    content\n    title\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation InsertPost($content: String = \"\", $classify: String = \"\", $summary: String = \"\", $tag: String = \"\", $title: String = \"\", $user_id: String = \"\") {\n  insert_posts_one(object: {content: $content, classify: $classify, summary: $summary, tag: $tag, title: $title, user_id: $user_id}) {\n    id\n  }\n}\n"): (typeof documents)["mutation InsertPost($content: String = \"\", $classify: String = \"\", $summary: String = \"\", $tag: String = \"\", $title: String = \"\", $user_id: String = \"\") {\n  insert_posts_one(object: {content: $content, classify: $classify, summary: $summary, tag: $tag, title: $title, user_id: $user_id}) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation insertAnnc($user_id: String = \"\", $title: String = \"\", $content: String = \"\") {\n  insert_annc_one(object: {user_id: $user_id, title: $title, content: $content}) {\n    id\n  }\n}"): (typeof documents)["mutation insertAnnc($user_id: String = \"\", $title: String = \"\", $content: String = \"\") {\n  insert_annc_one(object: {user_id: $user_id, title: $title, content: $content}) {\n    id\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation InsertQuestion($user_id: String = \"\", $title: String = \"\", $summary: String = \"\", $content: String = \"\") {\n  insert_posts_one(object: {user_id: $user_id, title: $title, summary: $summary, content: $content}) {\n    id\n  }\n}\n"): (typeof documents)["mutation InsertQuestion($user_id: String = \"\", $title: String = \"\", $summary: String = \"\", $content: String = \"\") {\n  insert_posts_one(object: {user_id: $user_id, title: $title, summary: $summary, content: $content}) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query queryDocument($id: Int!) {\n  posts(where: {id: {_eq: $id}}) {\n    title\n    summary\n    created_at\n    content\n    user {\n      name\n      avatar\n      Profile\n      id\n    }\n  }\n}"): (typeof documents)["query queryDocument($id: Int!) {\n  posts(where: {id: {_eq: $id}}) {\n    title\n    summary\n    created_at\n    content\n    user {\n      name\n      avatar\n      Profile\n      id\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation insertReply($content: String = \"\", $post_id: Int = 10, $user_id: String = \"\") {\n  insert_replies_one(object: {content: $content, post_id: $post_id, user_id: $user_id}) {\n    id\n  }\n}"): (typeof documents)["mutation insertReply($content: String = \"\", $post_id: Int = 10, $user_id: String = \"\") {\n  insert_replies_one(object: {content: $content, post_id: $post_id, user_id: $user_id}) {\n    id\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query queryReply($post_id: Int!) {\n  replies(where: {post_id: {_eq: $post_id}}) {\n    content\n    created_at\n    id\n    user {\n      avatar\n      name\n    }\n  }\n}\n"): (typeof documents)["query queryReply($post_id: Int!) {\n  replies(where: {post_id: {_eq: $post_id}}) {\n    content\n    created_at\n    id\n    user {\n      avatar\n      name\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query queryOther($user_id: String!) {\n  posts(where: {user_id: {_eq: $user_id}}) {\n    title\n    id\n  }\n}"): (typeof documents)["query queryOther($user_id: String!) {\n  posts(where: {user_id: {_eq: $user_id}}) {\n    title\n    id\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation deleteArticle($id: Int!) {\n  delete_posts(where: {id: {_eq: $id}}) {\n    returning {\n      id\n    }\n  }\n}\n"): (typeof documents)["\nmutation deleteArticle($id: Int!) {\n  delete_posts(where: {id: {_eq: $id}}) {\n    returning {\n      id\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteReply($id: Int!) {\n    delete_replies(where: { id: { _eq: $id } }) {\n      returning {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation deleteReply($id: Int!) {\n    delete_replies(where: { id: { _eq: $id } }) {\n      returning {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query noQuery {\n  posts {\n    title\n    id\n    replies {\n      id\n    }\n  }\n}\n"): (typeof documents)["query noQuery {\n  posts {\n    title\n    id\n    replies {\n      id\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query userInfo($id: String!) {\n  users(where: {id: {_eq: $id}}) {\n    avatar\n    Profile\n    name\n  }\n}\n"): (typeof documents)["query userInfo($id: String!) {\n  users(where: {id: {_eq: $id}}) {\n    avatar\n    Profile\n    name\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query queryArticle {\n  posts(where: {tag: {_eq: \"问答\"}}) {\n    title\n    user {\n      avatar\n    }\n    created_at\n    tag\n    id\n  }\n}\n"): (typeof documents)["query queryArticle {\n  posts(where: {tag: {_eq: \"问答\"}}) {\n    title\n    user {\n      avatar\n    }\n    created_at\n    tag\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query queryInfo($id: String!) {\n  users(where: {id: {_eq: $id}}) {\n    Profile\n    avatar\n    birthday\n    id\n    name\n    sex\n  }\n}\n"): (typeof documents)["query queryInfo($id: String!) {\n  users(where: {id: {_eq: $id}}) {\n    Profile\n    avatar\n    birthday\n    id\n    name\n    sex\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateUsers(\n    $id: String!\n    $avatar: String!\n    $Profile: String!\n    $sex: String!\n  ) {\n    update_users(\n      where: { id: { _eq: $id } }\n      _set: {\n        avatar: $avatar\n        Profile: $Profile\n        sex: $sex\n      }\n    ) {\n      returning {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation updateUsers(\n    $id: String!\n    $avatar: String!\n    $Profile: String!\n    $sex: String!\n  ) {\n    update_users(\n      where: { id: { _eq: $id } }\n      _set: {\n        avatar: $avatar\n        Profile: $Profile\n        sex: $sex\n      }\n    ) {\n      returning {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query queryUserInfos($id: String!) {\n  users(where: {id: {_eq: $id}}) {\n    name\n    Profile\n    avatar\n  }\n}\n"): (typeof documents)["query queryUserInfos($id: String!) {\n  users(where: {id: {_eq: $id}}) {\n    name\n    Profile\n    avatar\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query queryMyArticles($user_id: String!) {\n  posts(where: {user_id: {_eq: $user_id}, tag: {_eq: \"文章\"}}) {\n    title\n  }\n}\n"): (typeof documents)["query queryMyArticles($user_id: String!) {\n  posts(where: {user_id: {_eq: $user_id}, tag: {_eq: \"文章\"}}) {\n    title\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query MyQuery($account: String!, $password: String!) {\n  users(where: {account: {_eq: $account}, password: {_eq: $password}}) {\n    id\n  }\n}\n"): (typeof documents)["query MyQuery($account: String!, $password: String!) {\n  users(where: {account: {_eq: $account}, password: {_eq: $password}}) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation newAccount($account: String = \"\", $id: String = \"\", $name: String = \"\", $password: String = \"\") {\n  insert_users_one(object: {account: $account, id: $id, name: $name, password: $password}) {\n    id\n  }\n}\n"): (typeof documents)["\n  mutation newAccount($account: String = \"\", $id: String = \"\", $name: String = \"\", $password: String = \"\") {\n  insert_users_one(object: {account: $account, id: $id, name: $name, password: $password}) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query user_exist($name: String!) {\n  users(where: {name: {_eq: $name}}) {\n    id\n  }\n}"): (typeof documents)["query user_exist($name: String!) {\n  users(where: {name: {_eq: $name}}) {\n    id\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query user_exists($account: String!) {\n  users(where: {account: {_eq: $account}}) {\n    id\n  }\n}\n"): (typeof documents)["query user_exists($account: String!) {\n  users(where: {account: {_eq: $account}}) {\n    id\n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;