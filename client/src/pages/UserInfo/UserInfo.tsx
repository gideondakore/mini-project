import React from "react";

const UserInfo = () => {
  // const [cookie, setCookie] = useState<string>("");
  const getCookie = async () => {
    try {
      const response = await fetch("http:localhost:8000/api/test", {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {}
  };

  return (
    <div>
      <button onClick={getCookie}>Click</button>
      {/* <p>{cookie}</p> */}
    </div>
  );
};

export default UserInfo;
