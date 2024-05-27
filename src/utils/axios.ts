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
    me: "/api/v1/users/me/",
    login: "/api/v1/auth/login/",
    register: "/api/v1/users/",
    forgetPassword: "/api/v1/users/reset_password/",
    confirm: "/api/v1/users/reset_password_confirm/",
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
    latest: "/api/v1/blogs/",
    search: "/api/v1/blogs/",
  },
  account: {
    list: "/api/v1/users/",
    create: "/api/v1/user/",
    details: "/api/v1/users/",
  },
  profile: {
    list: "/api/v1/user-profiles/",
    details: (id: string) => `/api/v1/user-profiles/${id}/`,
  },
  notification: {
    list: "/api/v1/notification/",
    create: "/api/v1/notification/create/",
    update: (id: string) => `/api/v1/notification/${id}/`,
    delete: (id: string) => `/api/v1/notification/${id}/`,
  },
  pose: {
    list: "/api/v1/poses/",
    create: "/api/v1/poses/",
    update: (id: string) => `/api/v1/poses/${id}/`,
    delete: (id: string) => `/api/v1/poses/${id}/`,
  },
  muscle: {
    list: "/api/v1/muscles/",
    create: "/api/v1/muscles/",
    update: (id: string) => `/api/v1/muscles/${id}/`,
    delete: (id: string) => `/api/v1/muscles/${id}/`,
  },
  media: {
    uploadFile: "/api/v1/media/file/upload",
    uploadImage: "/api/v1/media/upload/image",
  },
};
