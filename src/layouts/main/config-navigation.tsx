import Iconify from "@/components/iconify";
import { useTranslate } from "@/locales";

// ----------------------------------------------------------------------

export const navConfig = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslate();
  return [
    {
      title: t("header.home"),
      icon: <Iconify icon="solar:home-2-bold-duotone" />,
      path: "/",
    },
    {
      title: t("header.about_us"),
      icon: <Iconify icon="solar:atom-bold-duotone" />,
      path: "/about-us/",
    },
    {
      title: t("header.blog"),
      icon: <Iconify icon="iconoir:post-solid" />,
      path: "/blog/",
    },
    // {
    //   title: t("header.product"),
    //   icon: <Iconify icon="hugeicons:yoga-01" />,
    //   path: "/",
    // },
    // {
    //   title: "Pages",
    //   path: "/pages",
    //   icon: <Iconify icon="solar:file-bold-duotone" />,
    //   children: [
    //     {
    //       subheader: "Other",
    //       items: [
    //         { title: "About us", path: paths.about },
    //         { title: "Contact us", path: paths.contact },
    //         { title: "FAQs", path: paths.faqs },
    //         { title: "Pricing", path: paths.pricing },
    //         { title: "Payment", path: paths.payment },
    //         { title: "Maintenance", path: paths.maintenance },
    //         { title: "Coming Soon", path: paths.comingSoon },
    //       ],
    //     },
    //     {
    //       subheader: "Concepts",
    //       items: [
    //         { title: "Shop", path: paths.product.root },
    //         { title: "Product", path: paths.product.demo.details },
    //         { title: "Checkout", path: paths.product.checkout },
    //         { title: "Posts", path: paths.post.root },
    //         { title: "Post", path: paths.post.demo.details },
    //       ],
    //     },
    //     {
    //       subheader: "Auth Demo",
    //       items: [
    //         { title: "Login", path: paths.authDemo.classic.login },
    //         { title: "Register", path: paths.authDemo.classic.register },
    //         {
    //           title: "Forgot password",
    //           path: paths.authDemo.classic.forgotPassword,
    //         },
    //         { title: "New password", path: paths.authDemo.classic.newPassword },
    //         { title: "Verify", path: paths.authDemo.classic.verify },
    //         { title: "Login (modern)", path: paths.authDemo.modern.login },
    //         { title: "Register (modern)", path: paths.authDemo.modern.register },
    //         {
    //           title: "Forgot password (modern)",
    //           path: paths.authDemo.modern.forgotPassword,
    //         },
    //         {
    //           title: "New password (modern)",
    //           path: paths.authDemo.modern.newPassword,
    //         },
    //         { title: "Verify (modern)", path: paths.authDemo.modern.verify },
    //       ],
    //     },
    //     {
    //       subheader: "Error",
    //       items: [
    //         { title: "Page 403", path: paths.page403 },
    //         { title: "Page 404", path: paths.page404 },
    //         { title: "Page 500", path: paths.page500 },
    //       ],
    //     },
    //     {
    //       subheader: "Dashboard",
    //       items: [{ title: "Dashboard", path: PATH_AFTER_LOGIN }],
    //     },
    //   ],
    // },
    // {
    //   title: "Docs",
    //   icon: <Iconify icon="solar:notebook-bold-duotone" />,
    //   path: paths.docs,
  ];
};
