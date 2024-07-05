// import React, { useEffect, useState } from "react";
// import { getPlayers } from "../api/api";

import GameState from "./GameState";

const SnakePage = () => {
  // const [userName, setUserName] = useState("");
  // const [players, setPlayers] = useState([]);
  // useEffect(() => {
  //   const fetchPlayers = async () => {
  //     try {
  //       const players = await getPlayers();
  //       console.log(players);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchPlayers();
  // }, []);

  return (
    <div>
      <GameState colorSnake="#248ec2" colorFood="#1d355e" backgroundColor="#ebebeb" />
    </div>
  );
};

export default SnakePage;
