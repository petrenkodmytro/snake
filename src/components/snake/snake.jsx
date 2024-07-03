import React, { useState } from "react";

const initUser = { name: "", score: 0 };

const Snake = () => {
  const [user, setUser] = useState(initUser);
  return <div>Snake</div>;
};

export default Snake;
