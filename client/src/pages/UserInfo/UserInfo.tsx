import React from "react";

const UserInfo = () => {
  // const [cookie, setCookie] = useState<string>("");
  const getCookie = async () => {
    try {
      const response = await fetch(
        "https://aae1-129-122-16-255.ngrok-free.app/api/test",
        {
          credentials: "include",
        }
      );
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
