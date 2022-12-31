import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import UserAPI from "./api/UserAPI";
import CourseCategoriesAPI from "./api/CourseCategoryAPI";
import CourseAPI from "./api/CourseAPI";
import BlogCategoryAPI from "./api/BlogCategoryAPI";
import BlogAPI from "./api/BlogAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const refreshToken = async () => {
    const res = await axios.get("http://localhost:4000/api/refresh_token");
    setToken(res.data.accessToken);
  };

  useEffect(() => {
    refreshToken();
  }, []);

  const state = {
    token: [token, setToken],
    userAPI: UserAPI(token),
    courseCategoryAPI: CourseCategoriesAPI(),
    blogCategoryAPI: BlogCategoryAPI(),
    courseAPI: CourseAPI(),
    blogAPI: BlogAPI(),
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};

DataProvider.propTypes = {
  children: PropTypes.element,
};
