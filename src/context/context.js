import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  const [requests, setRequests] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });

  const searchGithubUser = async (user) => {
    //toggleError
    toggleError(false, "");
    //Loading
    setIsloading(true);

    const response = await axios
      .get(`${rootUrl}/users/${user}`)
      .catch((err) => console.log(err));

    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;
      //       [Repos](https://api.github.com/users/john-smilga/repos?per_page=100)
      // - [Followers](https://api.github.com/users/john-smilga/followers)
      axios
        .get(`${rootUrl}/users/${login}/repos?per_page=100`)
        .then((response) => {
          setRepos(response.data);
        });

      axios.get(`${followers_url}?per_page=100`).then((response) => {
        setFollowers(response.data);
      });
    } else {
      toggleError(true, "Sorry, The user does not exist!");
    }
    checkRequests();
    setIsloading(false);
  };

  const checkRequests = () => {
    axios
      .get(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let { rate } = data;
        let { remaining } = rate;
        //  remaining = 0;
        setRequests(remaining);
        if (remaining === 0) {
          //throw an error
          toggleError(
            true,
            "Sorry ! You have exceeded your per hour search limit"
          );
        }
      })
      .catch((err) => console.log(err));
  };

  const toggleError = (show, msg) => {
    setError({ show, msg });
  };

  useEffect(checkRequests, []);
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isloading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
