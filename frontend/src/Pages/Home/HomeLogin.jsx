import React from "react";

import "./Login.css";
import "./HeaderHome.css";

import CardHome from "../../Components/Cards/CardHome";
import HeaderPage from "../../Components/Headers/HeaderPage";

function Home() {
  return (
    <div>
      <HeaderPage />
      <h1>Journey</h1>
      <CardHome />
    </div>
  );
}

export default Home;
