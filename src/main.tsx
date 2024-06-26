import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./page/dashboard";
import Login from "./page/login";
import Information from "./page/information";
import Layout from "./component/layout.tsx";
import Article from "./page/dashboard/article.tsx";
import AllContent from "./page/dashboard/allcontent.tsx";
import Question from "./page/dashboard/question.tsx";
import Resource from "./page/resource";
import Ask from "./page/dashboard/component/ask.tsx";
import Blog from "./page/dashboard/component/blog.tsx";
import Register from "./page/login/register.tsx";
import Edit from "./page/information/edit.tsx";
import Create from "./page/dashboard/component/create.tsx";
import MyArticle from "./page/information/myArticle.tsx";
import MyQuestion from "./page/information/myQuestion.tsx";
import { ApolloProvider } from "@apollo/client";
import { client } from "./client.tsx";
import Document from "./page/dashboard/component/document.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to={"/dashboard"} replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <Navigate to={"/dashboard/allContent"} replace />,
          },
          {
            path: "article",
            element: <Article />,
          },
          {
            path: "allContent",
            element: <AllContent />,
          },
          {
            path: "questions",
            element: <Question />,
          },
        ],
      },
      {
        path: "resources",
        element: <Resource />,
      },
      {
        path: "personal",
        element: <Information />,
        children: [
          {
            index: true,
            element: <Navigate to={"/personal/article"} replace />,
          },
          {
            path: "article",
            element: <MyArticle />,
          },
          {
            path: "question",
            element: <MyQuestion />,
          },
        ],
      },
      {
        path: "personal/edit",
        element: <Edit />,
      },
      {
        path: "ask",
        element: <Ask />,
      },
      {
        path: "blog/create/1",
        element: <Create />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "/dashboard/doc/:id",
        element: <Document />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
);
