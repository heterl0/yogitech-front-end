import { paramCase } from "@/utils/change-case";

// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: "/auth",
  AUTH_DEMO: "/auth-demo",
  DASHBOARD: "/dashboard",
};

// ----------------------------------------------------------------------

export const paths = {
  download: "/download",
  comingSoon: "/coming-soon",
  maintenance: "/maintenance",
  pricing: "/pricing",
  payment: "/payment",
  about: "/about-us",
  contact: "/contact-us",
  faqs: "/#faqs",
  privacyPolicy: "/privacy-policy",
  termsAndConditions: "/terms-and-conditions",
  page403: "/error/403",
  page404: "/error/404",
  page500: "/error/500",
  components: "/components",
  docs: "https://docs.minimals.cc",
  changelog: "https://docs.minimals.cc/changelog",
  zoneUI: "https://mui.com/store/items/zone-landing-page/",
  minimalUI: "https://mui.com/store/items/minimal-dashboard/",
  freeUI: "https://mui.com/store/items/minimal-dashboard-free/",
  figma:
    "https://www.figma.com/file/hjxMnGUJCjY7pX8lQbS7kn/%5BPreview%5D-Minimal-Web.v5.4.0?type=design&node-id=0-1&mode=design&t=2fxnS70DuiTLGzND-0",
  product: {
    root: `/product`,
    checkout: `/product/checkout`,
    details: (id: string) => `/product/${id}`,
  },
  // AUTH
  auth: {
    jwt: {
      forgetPassword: `${ROOTS.AUTH}/jwt/forget-password`,
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    mail: `${ROOTS.DASHBOARD}/mail`,
    chat: `${ROOTS.DASHBOARD}/chat`,
    blank: `${ROOTS.DASHBOARD}/blank`,
    kanban: `${ROOTS.DASHBOARD}/kanban`,
    calendar: `${ROOTS.DASHBOARD}/calendar`,
    fileManager: `${ROOTS.DASHBOARD}/file-manager`,
    permission: `${ROOTS.DASHBOARD}/permission`,
    general: {
      app: `${ROOTS.DASHBOARD}/app`,
      ecommerce: `${ROOTS.DASHBOARD}/ecommerce`,
      analytics: `${ROOTS.DASHBOARD}/analytics`,
      banking: `${ROOTS.DASHBOARD}/banking`,
      booking: `${ROOTS.DASHBOARD}/booking`,
      file: `${ROOTS.DASHBOARD}/file`,
    },
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      list: `${ROOTS.DASHBOARD}/user/list`,
      cards: `${ROOTS.DASHBOARD}/user/cards`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      edit: (id: number) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
    },
    activity: {
      root: `${ROOTS.DASHBOARD}/activity`,
    },
    account: {
      root: `${ROOTS.DASHBOARD}/account`,
      new: `${ROOTS.DASHBOARD}/account/new`,
      edit: (id: number) => `${ROOTS.DASHBOARD}/account/${id}/edit`,
    },
    product: {
      root: `${ROOTS.DASHBOARD}/product`,
      new: `${ROOTS.DASHBOARD}/product/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/product/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/product/${id}/edit`,
    },
    invoice: {
      root: `${ROOTS.DASHBOARD}/invoice`,
      new: `${ROOTS.DASHBOARD}/invoice/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/invoice/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/invoice/${id}/edit`,
    },
    blog: {
      root: `${ROOTS.DASHBOARD}/blog`,
      new: `${ROOTS.DASHBOARD}/blog/new`,
      details: (title: string) => `${ROOTS.DASHBOARD}/blog/${paramCase(title)}`,
      edit: (title: string) =>
        `${ROOTS.DASHBOARD}/blog/${paramCase(title)}/edit`,
      //   demo: {
      //     details: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}`,
      //     edit: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}/edit`,
      //   },
    },
    notification: {
      root: `${ROOTS.DASHBOARD}/notification`,
    },
    order: {
      root: `${ROOTS.DASHBOARD}/order`,
      details: (id: string) => `${ROOTS.DASHBOARD}/order/${id}`,
    },
    exercise: {
      root: `${ROOTS.DASHBOARD}/exercise`,
      new: `${ROOTS.DASHBOARD}/exercise/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/exercise/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/exercise/${id}/edit`,
    },
    pose: {
      root: `${ROOTS.DASHBOARD}/pose`,
      new: `${ROOTS.DASHBOARD}/pose/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/pose/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/pose/${id}/edit`,
    },
    tour: {
      root: `${ROOTS.DASHBOARD}/tour`,
      new: `${ROOTS.DASHBOARD}/tour/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/tour/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/tour/${id}/edit`,
    },
    event: {
      root: `${ROOTS.DASHBOARD}/event`,
      new: `${ROOTS.DASHBOARD}/event/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/event/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/event/${id}/edit`,
    },
    item: (type: string) => `${ROOTS.DASHBOARD}/${type}`,
  },
};
