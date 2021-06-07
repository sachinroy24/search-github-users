import React from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import loadingImage from "../images/preloader.gif";
import { GithubContext } from "../context/context";
const Dashboard = () => {
  const { isloading } = React.useContext(GithubContext);

  if (isloading) {
    return (
      <main>
        <Navbar></Navbar>
        <Search />
        <img src={loadingImage} className="loading-img"></img>
      </main>
    );
  }

  return (
    <main>
      <Navbar></Navbar>
      <Search></Search>
      <Info></Info>
      <User></User>
      <Repos></Repos>
    </main>
  );
};

export default Dashboard;
