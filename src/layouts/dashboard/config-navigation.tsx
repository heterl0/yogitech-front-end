import { useMemo } from "react";

import { paths } from "@/routes/paths";

import { useTranslate } from "@/locales";

// import Label from "@/components/label";
// import Iconify from "@/components/iconify";
import SvgColor from "@/components/svg-color";

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon("ic_job"),
  blog: icon("ic_blog"),
  chat: icon("ic_chat"),
  mail: icon("ic_mail"),
  user: icon("ic_user"),
  userGroup: icon("ic_user_group"),
  file: icon("ic_file"),
  lock: icon("ic_lock"),
  tour: icon("ic_tour"),
  order: icon("ic_order"),
  label: icon("ic_label"),
  blank: icon("ic_blank"),
  kanban: icon("ic_kanban"),
  folder: icon("ic_folder"),
  banking: icon("ic_banking"),
  booking: icon("ic_booking"),
  invoice: icon("ic_invoice"),
  product: icon("ic_product"),
  calendar: icon("ic_calendar"),
  disabled: icon("ic_disabled"),
  external: icon("ic_external"),
  menuItem: icon("ic_menu_item"),
  ecommerce: icon("ic_ecommerce"),
  analytics: icon("ic_analytics"),
  dashboard: icon("ic_dashboard"),
  bill: icon("ic_bill"),
  exercise: icon("ic_exercise"),
  pose: icon("ic_pose"),
  activity: icon("ic_activity"),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t("overview"),
        items: [
          // {
          //   title: t("app"),
          //   path: paths.dashboard.root,
          //   icon: ICONS.dashboard,
          // },
          // {
          //   title: t("ecommerce"),
          //   path: paths.dashboard.general.ecommerce,
          //   icon: ICONS.ecommerce,
          // },
          {
            title: t("analytics"),
            path: paths.dashboard.root,
            icon: ICONS.analytics,
          },
          // {
          //   title: t("banking"),
          //   path: paths.dashboard.general.banking,
          //   icon: ICONS.banking,
          // },
          // {
          //   title: t("booking"),
          //   path: paths.dashboard.general.booking,
          //   icon: ICONS.booking,
          // },
          // {
          //   title: t("file"),
          //   path: paths.dashboard.general.file,
          //   icon: ICONS.file,
          // },
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: t("management"),
        items: [
          // INVOICE
          // {
          //   title: t("invoice"),
          //   path: paths.dashboard.invoice.root,
          //   icon: ICONS.invoice,
          //   children: [
          //     { title: t("list"), path: paths.dashboard.invoice.root },
          //     {
          //       title: t("details"),
          //     },
          //     { title: t("create"), path: paths.dashboard.invoice.new },
          //   ],
          // },

          // Pose
          {
            title: t("pose"),
            path: paths.dashboard.pose.root,
            icon: ICONS.pose,
            children: [
              { title: t("list"), path: paths.dashboard.pose.root },
              { title: t("create"), path: paths.dashboard.pose.new },
            ],
          },

          // Exercise
          {
            title: t("exercise"),
            path: paths.dashboard.exercise.root,
            icon: ICONS.exercise,
            children: [
              { title: t("list"), path: paths.dashboard.exercise.root },
              { title: t("create"), path: paths.dashboard.exercise.new },
            ],
          },

          // Event
          {
            title: t("event"),
            path: paths.dashboard.event.root,
            icon: ICONS.mail,
            children: [
              { title: t("list"), path: paths.dashboard.event.root },
              { title: t("create"), path: paths.dashboard.event.new },
            ],
          },

          // USER
          {
            title: t("user"),
            path: paths.dashboard.user.root,
            icon: ICONS.userGroup,
          },

          // Activity
          {
            title: t("activity"),
            path: paths.dashboard.activity.root,
            icon: ICONS.activity,
          },

          // Notification
          {
            title: t("notification"),
            path: paths.dashboard.notification.root,
            icon: ICONS.calendar,
          },

          // BLOG
          {
            title: t("blog"),
            path: paths.dashboard.blog.root,
            icon: ICONS.blog,
            children: [
              { title: t("list"), path: paths.dashboard.blog.root },
              { title: t("create"), path: paths.dashboard.blog.new },
            ],
          },

          {
            title: t("account"),
            path: paths.dashboard.account.root,
            icon: ICONS.user,
            children: [
              { title: t("list"), path: paths.dashboard.account.root },
              { title: t("create"), path: paths.dashboard.account.new },
            ],
          },
          // TOUR
          // {
          //   title: t("tour"),
          //   path: paths.dashboard.tour.root,
          //   icon: ICONS.tour,
          //   children: [
          //     { title: t("list"), path: paths.dashboard.tour.root },
          //     { title: t("create"), path: paths.dashboard.tour.new },
          //   ],
          // },

          // FILE MANAGER
          // {
          //   title: t("file_manager"),
          //   path: paths.dashboard.fileManager,
          //   icon: ICONS.folder,
          // },

          // MAIL
          // {
          //   title: t("mail"),
          //   path: paths.dashboard.mail,
          //   icon: ICONS.mail,
          //   info: <Label color="error">+32</Label>,
          // },

          // CHAT
          // {
          //   title: t("chat"),
          //   path: paths.dashboard.chat,
          //   icon: ICONS.chat,
          // },

          // CALENDAR
          // {
          //   title: t("calendar"),
          //   path: paths.dashboard.calendar,
          //   icon: ICONS.calendar,
          // },

          // KANBAN
          // {
          //   title: t("kanban"),
          //   path: paths.dashboard.kanban,
          //   icon: ICONS.kanban,
          // },
        ],
      },

      // DEMO MENU STATES
      // {
      //   subheader: t(t("other_cases")),
      //   items: [
      //     {
      //       // default roles : All roles can see this entry.
      //       // roles: ['user'] Only users can see this item.
      //       // roles: ['admin'] Only admin can see this item.
      //       // roles: ['admin', 'manager'] Only admin/manager can see this item.
      //       // Reference from 'src/guards/RoleBasedGuard'.
      //       title: t("item_by_roles"),
      //       path: paths.dashboard.permission,
      //       icon: ICONS.lock,
      //       roles: ["admin", "manager"],
      //       caption: t("only_admin_can_see_this_item"),
      //     },
      //     {
      //       title: t("menu_level"),
      //       path: "#/dashboard/menu_level",
      //       icon: ICONS.menuItem,
      //       children: [
      //         {
      //           title: t("menu_level_1a"),
      //           path: "#/dashboard/menu_level/menu_level_1a",
      //         },
      //         {
      //           title: t("menu_level_1b"),
      //           path: "#/dashboard/menu_level/menu_level_1b",
      //           children: [
      //             {
      //               title: t("menu_level_2a"),
      //               path: "#/dashboard/menu_level/menu_level_1b/menu_level_2a",
      //             },
      //             {
      //               title: t("menu_level_2b"),
      //               path: "#/dashboard/menu_level/menu_level_1b/menu_level_2b",
      //               children: [
      //                 {
      //                   title: t("menu_level_3a"),
      //                   path: "#/dashboard/menu_level/menu_level_1b/menu_level_2b/menu_level_3a",
      //                 },
      //                 {
      //                   title: t("menu_level_3b"),
      //                   path: "#/dashboard/menu_level/menu_level_1b/menu_level_2b/menu_level_3b",
      //                 },
      //               ],
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //     {
      //       title: t("item_disabled"),
      //       path: "#disabled",
      //       icon: ICONS.disabled,
      //       disabled: true,
      //     },
      //     {
      //       title: t("item_label"),
      //       path: "#label",
      //       icon: ICONS.label,
      //       info: (
      //         <Label
      //           color="info"
      //           startIcon={<Iconify icon="solar:bell-bing-bold-duotone" />}
      //         >
      //           NEW
      //         </Label>
      //       ),
      //     },
      //     {
      //       title: t("item_caption"),
      //       path: "#caption",
      //       icon: ICONS.menuItem,
      //       caption:
      //         "Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.",
      //     },
      //     {
      //       title: t("item_external_link"),
      //       path: "https://www.google.com/",
      //       icon: ICONS.external,
      //     },
      //     {
      //       title: t("blank"),
      //       path: paths.dashboard.blank,
      //       icon: ICONS.blank,
      //     },
      //   ],
      // },
    ],
    [t]
  );

  return data;
}
