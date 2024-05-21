import React, { useEffect, useState } from "react";
// import React from "react";

const UserInfo = () => {
  const [backEndData, setBackEndData] = useState<string[]>([]);

  useEffect(() => {
    fetch("/register")
      .then((response) => response.json())
      .then((data) => {
        setBackEndData(data);
      });
  }, []);

  return <div>{backEndData}</div>;
};

export default UserInfo;
