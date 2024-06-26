import { message, Upload } from "antd";
import { useEffect, useState } from "react";
import { ApolloQueryResult, gql } from "@apollo/client";
import type { GetProp, UploadProps } from "antd";
import avatar from "../../assets/avatar.png";
import { client } from "../../client.tsx";
const QUERY_USER_INFO = gql(`query queryInfo($id: String!) {
  users(where: {id: {_eq: $id}}) {
    Profile
    avatar
    birthday
    id
    name
    sex
  }
}
`);
const UPDATE_USERINFO = gql`
  mutation updateUsers(
    $id: String!
    $avatar: String!
    $Profile: String!
    $sex: String!
  ) {
    update_users(
      where: { id: { _eq: $id } }
      _set: {
        avatar: $avatar
        Profile: $Profile
        sex: $sex
      }
    ) {
      returning {
        id
      }
    }
  }
`;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
interface UserInfoType {
  Profile: string;
  avatar: string;
  id: string;
  name: string;
  sex: string;
}
const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    void message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    void message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const Edit = () => {
  const [showMessage, setShowMessage] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfoType[] | null>(null);
  const [imageUrl, setImageUrl] = useState<string>();
  const [profile, setProfile] = useState("");
  const [sex, setSex] = useState("不想透露");
  const [messageApi, contextHolder] = message.useMessage();
  const handleShowMessage = () => {
    setShowMessage(!showMessage);
  };
  const handleChange: UploadProps["onChange"] = (info) => {
    getBase64(info.file.originFileObj as FileType, (url) => {
      setImageUrl(url);
    });
  };
  const id = localStorage.getItem("id");
  useEffect(() => {
    const getInfo = async () => {
      const res: ApolloQueryResult<{ users: UserInfoType[] }> =
        await client.query({
          query: QUERY_USER_INFO,
          variables: { id: id },
        });
      return res.data.users;
    };
    const fetchData = async () => {
      const userData = await getInfo();
      setUserInfo(userData);
    };
    void fetchData();
  }, [id]);
  const handleUpdateInfo = async () => {
    if (userInfo) {
      if (imageUrl == undefined) {
        setImageUrl(userInfo[0].avatar);
      }
      if(profile==undefined){
        setProfile(userInfo[0].Profile)
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 0));
    await client.mutate({
      mutation: UPDATE_USERINFO,
      variables: {
        id: id,
        Profile: profile||"",
        sex: sex,
        avatar: imageUrl||avatar,
      },
    });
    void messageApi.open({
      type: "success",
      content: "保存成功",
    });
    setShowMessage(!showMessage);
  };
  return (
    <div className={"bg-[#F7F7F7] h-screen overflow-auto"}>
      <div className={"pt-11 m-auto pb-8"} style={{ maxWidth: "1140px" }}>
        {contextHolder}
        <span
          className={
            "bg-white h-12 flex items-center font-bold border border-transparent border-b-[#BABABA] pl-4"
          }
        >
          基本信息
        </span>
        {userInfo && (
          <div>
            <div className={"flex pl-6 py-6 bg-white"}>
              <span className={"pr-6 w-28 flex items-center"}>头像</span>
              {showMessage ? (
                userInfo[0].avatar ? (
                  <img
                    src={userInfo[0].avatar}
                    alt="avatar"
                    width={100}
                    height={100}
                  />
                ) : (
                  <img src={avatar} alt={""} width={100} height={100} />
                )
              ) : (
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {userInfo[0].avatar ? (
                    <img
                      src={userInfo[0].avatar}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <img src={avatar} alt={""} style={{ width: "100%" }} />
                  )}
                </Upload>
              )}
            </div>
            <div className={"w-full bg-white"}>
              <div className={"flex pl-6 py-6"}>
                <span className={"pr-6 w-28"}>用户昵称</span>
                <span>{userInfo[0].name}</span>
              </div>
              <div className={"flex pl-6 py-6"}>
                <span className={"pr-6 w-28"}>用户ID</span>
                <span>{userInfo[0].id}</span>
              </div>
              <div className={"flex pl-6 py-6"}>
                <span className={"pr-6 w-28"}>性别</span>
                {showMessage ? (
                  <span>{userInfo[0].sex || "未知"}</span>
                ) : (
                  <select
                    className={"outline-0 w-28"}
                    onChange={(e) => setSex(e.target.value)}
                    defaultValue={"不想透露"}
                  >
                    <option value={"男"}>男</option>
                    <option value={"女"}>女</option>
                    <option value={"不想透露"}>不想透露</option>
                  </select>
                )}
              </div>
              <div className={"flex pl-6 py-6"}>
                <span className={"pr-6 w-28"}>个人简介</span>
                {showMessage ? (
                  userInfo[0].Profile || "这个人很懒，没有任何简介"
                ) : (
                  <input
                    className={"outline-0 w-48"}
                    placeholder={"这个人很懒，什么也没输入"}
                    onChange={(e) => setProfile(e.target.value)}
                  />
                )}
              </div>

              <div className={"flex justify-end pr-16"}>
                {showMessage ? (
                  <button
                    className={
                      "p-2 bg-blue-500 text-white rounded mb-3 hover:bg-blue-600"
                    }
                    onClick={handleShowMessage}
                  >
                    编辑资料
                  </button>
                ) : (
                  <div className={"flex"}>
                    <button
                      className={
                        "p-2 bg-blue-500 text-white rounded mb-3 hover:bg-blue-600 mr-6"
                      }
                      onClick={handleShowMessage}
                    >
                      取消
                    </button>
                    <button
                      className={
                        "p-2 bg-blue-500 text-white rounded mb-3 hover:bg-blue-600"
                      }
                      onClick={async () => await handleUpdateInfo()}
                    >
                      保存
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Edit;
