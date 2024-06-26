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
    "query userInfo($id: String!) {\n  users(where: {id: {_eq: $id}}) {\n    avatar\n    Profile\n    name\n  }\n}\n": types.UserInfoDocument,
    "query queryInfo($id: String!) {\n  users(where: {id: {_eq: $id}}) {\n    Profile\n    avatar\n    birthday\n    id\n    name\n    sex\n  }\n}\n": types.QueryInfoDocument,
    "\n  mutation updateUsers($id: String!, $avatar: String!, $Profile: String!, $sex: String!, $birthday: timestamp!) {\n    update_users(where: {id: {_eq: $id}}, _set: {avatar: $avatar, Profile: $Profile, sex: $sex, birthday: $birthday}) {\n      returning {\n        id\n      }\n    }\n  }\n": types.UpdateUsersDocument,
    "query MyQuery($account: String!, $password: String!) {\n  users(where: {account: {_eq: $account}, password: {_eq: $password}}) {\n    id\n  }\n}\n": types.MyQueryDocument,
    "\n  mutation newAccount($account: String = \"\", $id: String = \"\", $name: String = \"\", $password: String = \"\", $time: timestamp = \"\") {\n  insert_users_one(object: {account: $account, id: $id, name: $name, password: $password, time: $time}) {\n    id\n  }\n}\n": types.NewAccountDocument,
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
export function gql(source: "query userInfo($id: String!) {\n  users(where: {id: {_eq: $id}}) {\n    avatar\n    Profile\n    name\n  }\n}\n"): (typeof documents)["query userInfo($id: String!) {\n  users(where: {id: {_eq: $id}}) {\n    avatar\n    Profile\n    name\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query queryInfo($id: String!) {\n  users(where: {id: {_eq: $id}}) {\n    Profile\n    avatar\n    birthday\n    id\n    name\n    sex\n  }\n}\n"): (typeof documents)["query queryInfo($id: String!) {\n  users(where: {id: {_eq: $id}}) {\n    Profile\n    avatar\n    birthday\n    id\n    name\n    sex\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateUsers($id: String!, $avatar: String!, $Profile: String!, $sex: String!, $birthday: timestamp!) {\n    update_users(where: {id: {_eq: $id}}, _set: {avatar: $avatar, Profile: $Profile, sex: $sex, birthday: $birthday}) {\n      returning {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation updateUsers($id: String!, $avatar: String!, $Profile: String!, $sex: String!, $birthday: timestamp!) {\n    update_users(where: {id: {_eq: $id}}, _set: {avatar: $avatar, Profile: $Profile, sex: $sex, birthday: $birthday}) {\n      returning {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query MyQuery($account: String!, $password: String!) {\n  users(where: {account: {_eq: $account}, password: {_eq: $password}}) {\n    id\n  }\n}\n"): (typeof documents)["query MyQuery($account: String!, $password: String!) {\n  users(where: {account: {_eq: $account}, password: {_eq: $password}}) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation newAccount($account: String = \"\", $id: String = \"\", $name: String = \"\", $password: String = \"\", $time: timestamp = \"\") {\n  insert_users_one(object: {account: $account, id: $id, name: $name, password: $password, time: $time}) {\n    id\n  }\n}\n"): (typeof documents)["\n  mutation newAccount($account: String = \"\", $id: String = \"\", $name: String = \"\", $password: String = \"\", $time: timestamp = \"\") {\n  insert_users_one(object: {account: $account, id: $id, name: $name, password: $password, time: $time}) {\n    id\n  }\n}\n"];
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