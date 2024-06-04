/* eslint-disable @next/next/no-img-element */
"use client";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

import { SeoIllustration } from "@/assets/illustrations";
import { _appAuthors, _appRelated, _appInvoices, _appInstalled } from "@/_mock";

import { useSettingsContext } from "@/components/settings";

import AppWidget from "../app-widget";
import AppWelcome from "../app-welcome";
import AppNewInvoice from "../app-new-invoice";
import AppTopAuthors from "../app-top-authors";
import AppTopRelated from "../app-top-related";
import AppAreaInstalled from "../app-area-installed";
import AppWidgetSummary from "../app-widget-summary";
import AppCurrentDownload from "../app-current-download";
import AppTopInstalledCountries from "../app-top-installed-countries";
import { useAuthContext } from "@/auth/hooks";
import {
  useEventGrowth,
  useGetOverview,
  useGetRecentActivity,
  useUserGrowth,
} from "@/api/dashboard";
import { useMemo } from "react";
import { paths } from "@/routes/paths";
import AppFeaturedBlog from "../app-featured-blog";
import { useGetPosts } from "@/api/blog";
import AnalyticsWidgetSummary from "../../analytics/analytics-widget-summary";
import AppUserEventGrow from "../app-user-event-growth";
import { getMonthLabel } from "@/types/dashboard";
import AppRecentTimeline from "../app-recent-timeline";

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const { user } = useAuthContext();

  const { recentItems } = useGetRecentActivity();
  const { posts } = useGetPosts();
  const { overview } = useGetOverview();
  const { userGrowth } = useUserGrowth();
  const { eventGrowth } = useEventGrowth();
  const firstItem = useMemo(() => recentItems[0], [recentItems]);

  const theme = useTheme();

  const settings = useSettingsContext();

  const userGrowthDataChart = useMemo(() => {
    if (!userGrowth) return { labels: [], series: [] };
    return {
      labels: Array.from({ length: 12 }, (_, i) => i + 1).map((i) =>
        getMonthLabel(i)
      ),
      series: Array.from({ length: 12 }, (_, i) => i + 1).map((i) =>
        userGrowth.labels.includes(i)
          ? userGrowth.values[userGrowth.labels.indexOf(i)]
          : 0
      ),
    };
  }, [userGrowth]);

  const eventGrowthDataChart = useMemo(() => {
    if (!eventGrowth) return { labels: [], series: [] };
    return {
      labels: Array.from({ length: 12 }, (_, i) => i + 1).map((i) =>
        getMonthLabel(i)
      ),
      series: Array.from({ length: 12 }, (_, i) => i + 1).map((i) =>
        eventGrowth.labels.includes(i)
          ? eventGrowth.values[eventGrowth.labels.indexOf(i)]
          : 0
      ),
    };
  }, [eventGrowth]);

  return (
    <Container maxWidth={settings.themeStretch ? false : "xl"}>
      <Grid container spacing={3}>
        <Grid xs={12} md={posts.length === 0 ? 12 : 8}>
          {firstItem && (
            <AppWelcome
              title={`Welcome back 👋 \n ${user?.username}`}
              description={`Here’s what’s happening with your projects today. A new ${firstItem.type} has been added!`}
              img={<SeoIllustration />}
              action={
                <Button
                  variant="contained"
                  color="primary"
                  href={paths.dashboard.item(firstItem.type)}
                >
                  Go Now
                </Button>
              }
            />
          )}
        </Grid>

        {posts.length > 0 && (
          <Grid xs={12} md={4}>
            <AppFeaturedBlog
              list={posts.splice(posts.length < 4 ? 0 : posts.length - 4)}
            />
          </Grid>
        )}
        {overview && (
          <>
            <Grid xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                title="Upcoming Event"
                total={overview.upcoming_events}
                icon={
                  <img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />
                }
              />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                title="Total Users"
                total={overview.total_users}
                color="info"
                icon={
                  <img
                    alt="icon"
                    src="/assets/icons/glass/ic_glass_users.png"
                  />
                }
              />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                title="Total Poses"
                total={overview.total_poses}
                color="warning"
                icon={
                  <img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />
                }
              />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                title="Total Exercises"
                total={overview.total_exercises}
                color="error"
                icon={
                  <img
                    alt="icon"
                    src="/assets/icons/glass/ic_glass_message.png"
                  />
                }
              />
            </Grid>
          </>
        )}

        {userGrowthDataChart.labels.length > 0 && (
          <Grid xs={12} md={6} lg={8}>
            <AppUserEventGrow
              title="Percent Growth in Year"
              subheader="Details of User and Event Growth in Year"
              chart={{
                labels: userGrowthDataChart.labels,
                series: [
                  {
                    name: "New Users",
                    type: "column",
                    fill: "solid",
                    data: userGrowthDataChart.series,
                  },
                  // {
                  //   name: "Team B",
                  //   type: "area",
                  //   fill: "gradient",
                  //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                  // },
                  {
                    name: "Event Growth",
                    type: "line",
                    fill: "solid",
                    data: eventGrowthDataChart.series,
                  },
                ],
              }}
            />
          </Grid>
        )}

        <Grid xs={12} md={4}>
          {recentItems && (
            <AppRecentTimeline list={recentItems} title="Recent Activity" />
          )}
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Active Users"
            percent={2.6}
            total={18765}
            chart={{
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Installed"
            percent={0.2}
            total={4876}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Downloads"
            percent={-0.1}
            total={678}
            chart={{
              colors: [theme.palette.warning.light, theme.palette.warning.main],
              series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentDownload
            title="Current Download"
            chart={{
              series: [
                { label: "Mac", value: 12244 },
                { label: "Window", value: 53345 },
                { label: "iOS", value: 44313 },
                { label: "Android", value: 78343 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppAreaInstalled
            title="Area Installed"
            subheader="(+43%) than last year"
            chart={{
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              series: [
                {
                  year: "2019",
                  data: [
                    {
                      name: "Asia",
                      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
                    },
                    {
                      name: "America",
                      data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
                    },
                  ],
                },
                {
                  year: "2020",
                  data: [
                    {
                      name: "Asia",
                      data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
                    },
                    {
                      name: "America",
                      data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} lg={8}>
          <AppNewInvoice
            title="New Invoice"
            tableData={_appInvoices}
            tableLabels={[
              { id: "id", label: "Invoice ID" },
              { id: "category", label: "Category" },
              { id: "price", label: "Price" },
              { id: "status", label: "Status" },
              { id: "" },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTopRelated title="Top Related Applications" list={_appRelated} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTopInstalledCountries
            title="Top Installed Countries"
            list={_appInstalled}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTopAuthors title="Top Authors" list={_appAuthors} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <Stack spacing={3}>
            <AppWidget
              title="Conversion"
              total={38566}
              icon="solar:user-rounded-bold"
              chart={{
                series: 48,
              }}
            />

            <AppWidget
              title="Applications"
              total={55566}
              icon="fluent:mail-24-filled"
              color="info"
              chart={{
                series: 75,
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
