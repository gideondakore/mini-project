import React from "react";

const UserInfo = () => {
  // const [cookie, setCookie] = useState<string>("");
  const getCookie = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL_HOST_SERVER}/api/test`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Error occur testing api");
    }
  };

  return (
    <div>
      <button onClick={getCookie}>Click</button>
      {/* <p>{cookie}</p> */}
    </div>
  );
};

export default UserInfo;
