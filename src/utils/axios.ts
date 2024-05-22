import axios, { AxiosRequestConfig } from "axios";

import { HOST_API } from "@/config-global";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: "/api/chat",
  kanban: "/api/kanban",
  calendar: "/api/calendar",
  auth: {
    // me: "/api/auth/me",
    // login: "/api/auth/login",
    // register: "/api/auth/register",
    me: "/api/v1/users/me/",
    login: "/api/v1/auth/login/",
    register: "/api/v1/users/",
    activate: "/api/v1/users/activation/",
    google: "/api/v1/auth/google/",
  },
  mail: {
    list: "/api/mail/list",
    details: "/api/mail/details",
    labels: "/api/mail/labels",
  },
  post: {
    list: "/api/v1/blogs/",
    create: "/api/v1/blogs/",
    update: "/api/v1/blogs/",
    delete: "/api/v1/blogs/",
    details: "/api/v1/blogs/",
    latest: "/api/post/latest",
    search: "/api/post/search",
  },
  product: {
    list: "/api/product/list",
    details: "/api/product/details",
    search: "/api/product/search",
  },
};
